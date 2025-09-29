<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Show only the logged-in user's team(s)
    public function index(Request $request)
    {
        $teams = Team::where('user_id', $request->user()->id)->get();
        return response()->json($teams, 200);
    }

    // Create a new team for the logged-in users
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:teams,name',
            'budget' => 'nullable|integer|min:0',
        ]);

        $team = Team::create([
            'name' => $validated['name'],
            'budget' => $validated['budget'] ?? 100, // default budget
            'user_id' => $request->user()->id, // ✅ logged-in user
        ]);

        return response()->json($team, 201);
    }

    public function show($id)
    {
        $team = Team::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        return response()->json($team, 200);
    }

    public function update(Request $request, $id)
    {
        $team = Team::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:teams,name,' . $id,
            'budget' => 'sometimes|integer|min:0',
        ]);

        $team->update($validated);

        return response()->json($team, 200);
    }

    public function destroy($id)
    {
        $team = Team::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        $team->delete();

        return response()->json(['message' => 'Team deleted'], 200);
    }



    // Add a player to a team
    public function addPlayer(Request $request, Team $team)
    {
        // Check authorization
        if ($team->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'player_id' => 'required|exists:players,id',
        ]);

        // Check if player already exists in team (optional)
        if ($team->players()->where('player_id', $validated['player_id'])->exists()) {
            return response()->json(['error' => 'Player already in team'], 400);
        }

        $team->players()->attach($validated['player_id']);

        return response()->json([
            'message' => 'Player added',
            'team' => $team->load('players')
        ], 200);
    }

    // Remove a player from a team
    public function removePlayer(Team $team, $playerId)
    {
        // Check authorization
        if ($team->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $team->players()->detach($playerId);

        return response()->json([
            'message' => 'Player removed',
            'team' => $team->load('players')
        ], 200);
    }

}
