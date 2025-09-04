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

    if ($request->has('name')) {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    if ($request->has('position')) {
        $query->where('position', $request->position);
    }

    if ($request->has('club')) {  // filter by club name
        $clubName = $request->club;
        $query->whereHas('club', function($q) use ($clubName) {
            $q->where('name', 'like', '%' . $clubName . '%');
        });
    }

    $perPage = $request->get('per_page', 10);

    // eager load club info for the response
    $players = $query->with('club')->paginate($perPage)->withPath('/api/players');

    return response()->json($players);
}


}
