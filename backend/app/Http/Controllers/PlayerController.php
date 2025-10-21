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

    /**
 * @OA\Get(
 *     path="/api/players",
 *     summary="Get list of players",
 *     description="Returns a list of players with optional filters by name, position, or club. Supports pagination or returning all players.",
 *     tags={"Players"},
 *
 *     @OA\Parameter(
 *         name="name",
 *         in="query",
 *         description="Filter players by first or second name",
 *         required=false,
 *         @OA\Schema(type="string", example="Haaland")
 *     ),
 *     @OA\Parameter(
 *         name="position",
 *         in="query",
 *         description="Filter players by position (GKP, DEF, MID, FWD)",
 *         required=false,
 *         @OA\Schema(type="string", example="FWD")
 *     ),
 *     @OA\Parameter(
 *         name="club",
 *         in="query",
 *         description="Filter players by club name",
 *         required=false,
 *         @OA\Schema(type="string", example="Manchester City")
 *     ),
 *     @OA\Parameter(
 *         name="all",
 *         in="query",
 *         description="If set, returns all players without pagination",
 *         required=false,
 *         @OA\Schema(type="boolean", example=true)
 *     ),
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of players per page (default 10)",
 *         required=false,
 *         @OA\Schema(type="integer", example=10)
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="List of players",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="first_name", type="string", example="Erling"),
 *                     @OA\Property(property="second_name", type="string", example="Haaland"),
 *                     @OA\Property(property="position", type="string", example="FWD"),
 *                     @OA\Property(property="club_id", type="integer", example=1),
 *                     @OA\Property(property="price", type="integer", example=12000000),
 *                     @OA\Property(property="total_points", type="integer", example=50),
 *                     @OA\Property(property="assists", type="integer", example=10),
 *                     @OA\Property(property="goals", type="integer", example=20),
 *                     @OA\Property(property="expected_goals", type="number", format="float", example=18.5),
 *                     @OA\Property(property="expected_assists", type="number", format="float", example=9.2),
 *                     @OA\Property(property="gw1_points", type="integer", example=6),
 *                     @OA\Property(property="gw2_points", type="integer", example=10),
 *                     @OA\Property(property="gw3_points", type="integer", example=4),
 *                     @OA\Property(property="gw4_points", type="integer", example=8),
 *                     @OA\Property(property="gw5_points", type="integer", example=2),
 *                     @OA\Property(
 *                         property="club",
 *                         type="object",
 *                         description="Associated club",
 *                         @OA\Property(property="id", type="integer", example=1),
 *                         @OA\Property(property="name", type="string", example="Manchester City")
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="No players found"
 *     )
 * )
 */







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

        if ($players->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => 'Nema pronađenih igrača.'
            ]);
        }



        return response()->json($players);
    }

}
