<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\Team;
class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = DB::table('teams')->get();
        return response()->json($teams, 200);
    }



    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|unique:teams,name',
            'budget' => 'nullable|integer|min:0',
            'user_id' => 'required|exists:users,id',
        ]);

        try {
            $team = Team::create($validated);
            return response()->json($team, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create team', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        return response()->json($team, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        // Validate input
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:teams,name,' . $id,
            'budget' => 'sometimes|integer|min:0',
        ]);

        try {
            $team->update($validated);
            return response()->json($team, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update team', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        try {
            $team->delete();
            return response()->json(['message' => 'Team deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete team', 'message' => $e->getMessage()], 500);
        }
    }
}
