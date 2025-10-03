<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TableController;

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('players', [PlayerController::class, 'index']);
Route::get('analytics/pl-standings', [TableController::class, 'plStandings']);



// Protected Routes (Require Sanctum Auth)
Route::middleware('auth:sanctum')->group(function () {
    // Get authenticated user
    Route::get('user', [AuthController::class, 'user']);
    
    // Logout
    Route::post('logout', [AuthController::class, 'logout']);
    
    // User's team management
    Route::apiResource('teams', TeamController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

    // Add/remove players from a team
    Route::post('teams/{team}/add-player', [TeamController::class, 'addPlayer']);
    Route::delete('teams/{team}/remove-player/{player}', [TeamController::class, 'removePlayer']);
    Route::put('teams/{team}/sync-players', [TeamController::class, 'syncPlayers']);
    
    // Admin only routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('users', [AuthController::class, 'getAllUsers']);
    });
});