<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Rating extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'ratings';

    protected $fillable = [
        'user_id',
        'movie_id',
        'score',
    ];

    protected $casts = [
        'score'    => 'integer',
        'movie_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
