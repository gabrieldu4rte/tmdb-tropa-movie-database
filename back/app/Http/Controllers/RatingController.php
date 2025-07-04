<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Rating;

class RatingController extends Controller
{
    public function store(Request $request, $tmdbId)
    {
        $data = $request->validate([
            'score' => 'required|integer|min:0|max:10',
        ]);

        $userId = $request->user()->getAuthIdentifier();

        $rating = Rating::updateOrCreate(
            [
                'user_id'  => $userId,
                'movie_id' => (int)$tmdbId,
            ],
            ['score' => $data['score']]
        );

        $rating->load('user:id,name');

        $all     = Rating::where('movie_id', (int)$tmdbId)->get();
        $average = $all->count()
                 ? round($all->sum('score') / $all->count(), 2)
                 : 0;

        return response()->json([
            'rating'  => [
                'score'      => $rating->score,
                'created_at' => $rating->created_at,
                'user'       => [
                    'id'   => $rating->user->id,
                    'name' => $rating->user->name,
                ],
            ],
            'average' => $average,
        ]);
    }

    public function index($tmdbId)
    {
        $ratings = Rating::where('movie_id', (int)$tmdbId)
                         ->with('user:id,name')
                         ->orderBy('created_at', 'desc')
                         ->get();

        $count   = $ratings->count();
        $average = $count ? round($ratings->sum('score') / $count, 2) : 0;

        $resp = Http::get("https://api.themoviedb.org/3/movie/{$tmdbId}", [
            'api_key' => config('services.tmdb.key'),
        ]);

        if ($resp->ok()) {
            $m = $resp->json();
            $movie = [
                'tmdb_id' => $m['id'],
                'title'   => $m['title'],
                'poster'  => $m['poster_path']
                              ? "https://image.tmdb.org/t/p/w500{$m['poster_path']}"
                              : null,
            ];
        } else {
            $movie = [
                'tmdb_id' => $tmdbId,
                'title'   => '—',
                'poster'  => null,
            ];
        }

        $ratingsOut = $ratings->map(function($r) {
            return [
                'score'      => $r->score,
                'created_at' => $r->created_at,
                'user'       => [
                    'id'   => $r->user->id,
                    'name' => $r->user->name,
                ],
            ];
        });

        return response()->json([
            'movie'   => $movie,
            'ratings' => $ratingsOut,
            'average' => $average,
        ]);
    }
}
