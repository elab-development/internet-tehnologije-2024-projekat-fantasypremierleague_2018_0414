<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\AuthController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('teams/{team}/players', [TeamController::class, 'players']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('players', PlayerController::class);

    Route::post('teams/{team}/add-player', [TeamController::class, 'addPlayer']);
    Route::delete('teams/{team}/remove-player/{player}', [TeamController::class, 'removePlayer']);

    Route::post('logout', [AuthController::class, 'logout']);
});
