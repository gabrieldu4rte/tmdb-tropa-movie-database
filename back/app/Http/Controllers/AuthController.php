<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
          'name'                  => 'required|string|max:255',
          'email'                 => 'required|email|unique:users,email',
          'password'              => 'required|string|confirmed|min:6',
          'troop_password'        => 'required|string',
        ]);

        if ($data['troop_password'] !== config('app.troop_password')) {
            return response()->json([
                'error' => 'Senha da tropa incorreta, BOSTA!'
            ], 403);
        }

        $user = User::create([
          'name'     => $data['name'],
          'email'    => $data['email'],
          'password' => Hash::make($data['password']),
        ]);

        return response()->json($user, 201);
    }
}
