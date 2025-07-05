<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\RatingController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth.basic')->group(function(){
    Route::get( 'search',         [MovieController::class, 'searchTmdb']);
    Route::post('{tmdbId}/watch', [MovieController::class, 'addToWatched']);
    Route::get( 'watched',        [MovieController::class, 'watched']);
    Route::get('rated', [MovieController::class,'rated']);
    Route::post('{tmdbId}/rating',  [RatingController::class, 'store']);
    Route::get( '{tmdbId}/ratings', [RatingController::class, 'index']);
});
