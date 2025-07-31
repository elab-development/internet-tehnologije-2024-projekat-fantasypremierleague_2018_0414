<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;

Route::middleware('api')->group(function () {
    // Resource ruta (REST konvencija)
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('players', PlayerController::class);
    Route::get('teams/{team}/players', [TeamController::class, 'players']);

    Route::post('teams/{team}/add-player', [TeamController::class, 'addPlayer']);

    Route::delete('teams/{team}/remove-player/{player}', [TeamController::class, 'removePlayer']);

});
