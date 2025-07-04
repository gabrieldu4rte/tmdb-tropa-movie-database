<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Movie extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'movies';

    protected $fillable = [
        'tmdb_id',
        'title',
        'poster',
        'overview',
        'user_id'
    ];
}
