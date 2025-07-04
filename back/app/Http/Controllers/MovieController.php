<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Movie;
use App\Models\Rating;

class MovieController extends Controller
{
    public function addToWatched(Request $request, $tmdbId)
    {
        $response = Http::get("https://api.themoviedb.org/3/movie/{$tmdbId}", [
            'api_key' => config('services.tmdb.key'),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Filme não encontrado na TMDB'], 404);
        }

        $data = $response->json();

        $movie = Movie::updateOrCreate(
            [
                'tmdb_id' => $data['id'],
                'user_id' => $request->user()->getAuthIdentifier(),
            ],
            [
                'title'    => $data['title'],
                'poster'   => $data['poster_path']
                             ? "https://image.tmdb.org/t/p/w500{$data['poster_path']}"
                             : null,
                'overview' => $data['overview'] ?? '',
            ]
        );

        return response()->json($movie);
    }

    public function watched(Request $request)
    {
        $userId = $request->user()->getAuthIdentifier();
        $movies = Movie::where('user_id', $userId)->get();

        return response()->json($movies);
    }

    public function searchTmdb(Request $request)
    {
        $request->validate([ 'query' => 'required|string' ]);

        $response = Http::get('https://api.themoviedb.org/3/search/movie', [
            'api_key' => config('services.tmdb.key'),
            'query'   => $request->query('query'),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Erro ao buscar filmes na TMDB'], 500);
        }

        return response()->json($response->json()['results']);
    }

    public function rated()
    {
        $allRatings = Rating::all();


        $groups = [];
        foreach ($allRatings as $r) {
            $mid = $r->movie_id;
            if (! isset($groups[$mid])) {
                $groups[$mid] = ['sum' => 0, 'count' => 0];
            }
            $groups[$mid]['sum']   += $r->score;
            $groups[$mid]['count'] += 1; 
        }


        $out = [];
        foreach ($groups as $tmdbId => $data) {
            $average = round($data['sum'] / $data['count'], 2);

            $resp = Http::get("https://api.themoviedb.org/3/movie/{$tmdbId}", [
                'api_key' => config('services.tmdb.key'),
            ]);

            if ($resp->ok()) {
                $m = $resp->json();
                $title  = $m['title'];
                $poster = $m['poster_path']
                          ? "https://image.tmdb.org/t/p/w500{$m['poster_path']}"
                          : null;
            } else {
                $title  = '—';
                $poster = null;
            }

            $out[] = [
                'tmdb_id' => $tmdbId,
                'title'   => $title,
                'poster'  => $poster,
                'average' => $average,
                'count'   => $data['count'],
            ];
        }

        return response()->json($out);
    }


}
