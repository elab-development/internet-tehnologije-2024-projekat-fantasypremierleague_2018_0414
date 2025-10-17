<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TableController;

// -----------------------------------
// Public routes
// -----------------------------------

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Forgot Password - PUBLIC
Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Reset link sent to your email.'])
        : response()->json(['message' => __($status)], 400);
});

// Reset Password - PUBLIC
Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->save();
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Password has been reset.'])
        : response()->json(['message' => __($status)], 400);
});

// Other public endpoints
Route::get('players', [PlayerController::class, 'index']);
Route::get('analytics/pl-standings', [TableController::class, 'plStandings']);


// -----------------------------------
// Protected routes (Require Sanctum)
// -----------------------------------
Route::middleware('auth:sanctum')->group(function () {
    // Get authenticated user
    Route::get('user', [AuthController::class, 'user']);
    
    // Logout
    Route::post('logout', [AuthController::class, 'logout']);
    
    // User's team management
    Route::apiResource('teams', TeamController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

    // Add/remove players from a team
    Route::put('teams/{team}/sync-players', [TeamController::class, 'syncPlayers']);
    
    // Admin only routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('users', [AuthController::class, 'getAllUsers']);
    });
});
