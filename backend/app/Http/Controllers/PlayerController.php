<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:100',
            'club_id' => 'nullable|integer|exists:clubs,id',
            'price' => 'required|integer|min:0',
        ]);

        $player = Player::create($validated);

        return response()->json($player, 201); // Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $player = Player::find($id);

        if (!$player) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        return response()->json($player, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $player = Player::find($id);

        if (!$player) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|nullable|string|max:100',
            'club_id' => 'sometimes|nullable|integer|exists:clubs,id',
            'price' => 'sometimes|required|integer|min:0',
        ]);

        $player->update($validated);

        return response()->json($player, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $player = Player::find($id);

        if (!$player) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        $player->delete();

        return response()->json(['message' => 'Player deleted successfully'], 200);
    }


    public function index(Request $request)
    {
        $query = Player::query();

        // Search by first_name or second_name
        if ($request->has('name') && $request->name !== '') {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->name . '%')
                    ->orWhere('second_name', 'like', '%' . $request->name . '%');
            });
        }

        // Filter by position (GKP, DEF, MID, FWD)
        if ($request->has('position') && $request->position !== '') {
            $query->where('position', $request->position);
        }

        // Filter by club name
        if ($request->has('club') && $request->club !== '') {
            $clubName = $request->club;
            $query->whereHas('club', function ($q) use ($clubName) {
                $q->where('name', 'like', '%' . $clubName . '%');
            });
        }

        // If 'all' param is set, return all players without pagination
        if ($request->has('all')) {
            $players = $query->with('club')->get();
            return response()->json(['data' => $players]);
        }

        $perPage = $request->get('per_page', 10);

        // Eager load club info
        $players = $query->with('club')->paginate($perPage)->withPath('/api/players');

        return response()->json($players);
    }

}
