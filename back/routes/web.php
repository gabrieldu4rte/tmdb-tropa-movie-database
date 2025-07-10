<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'TMDB Tropa Movie Database API',
        'version' => '1.0.0',
        'status' => 'online'
    ]);
});
