<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Teams",
 *     description="API endpoints for managing teams"
 * )
 */
class TeamController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/teams",
     *     operationId="getTeams",
     *     tags={"Teams"},
     *     summary="Get all teams for logged-in user",
     *     description="Returns a list of all teams belonging to the authenticated user",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of teams retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Dream Team"),
     *                 @OA\Property(property="budget", type="integer", example=100),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time"),
     *                 @OA\Property(
     *                     property="players",
     *                     type="array",
     *                     @OA\Items(type="object")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $teams = Team::where('user_id', $request->user()->id)
            ->with('players')
            ->get();
        return response()->json($teams, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/teams",
     *     operationId="createTeam",
     *     tags={"Teams"},
     *     summary="Create a new team",
     *     description="Create a new team for the authenticated user",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="My Dream Team", description="Team name (must be unique)"),
     *             @OA\Property(property="budget", type="integer", example=100, description="Team budget (optional, defaults to 100)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Team created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="name", type="string", example="My Dream Team"),
     *             @OA\Property(property="budget", type="integer", example=100),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="created_at", type="string", format="date-time"),
     *             @OA\Property(property="updated_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:teams,name',
            'budget' => 'nullable|integer|min:0',
        ]);

        $team = Team::create([
            'name' => $validated['name'],
            'budget' => $validated['budget'] ?? 100,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($team, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/teams/{id}",
     *     operationId="getTeam",
     *     tags={"Teams"},
     *     summary="Get a specific team",
     *     description="Retrieve details of a specific team by ID (must belong to authenticated user)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="name", type="string", example="Dream Team"),
     *             @OA\Property(property="budget", type="integer", example=100),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="created_at", type="string", format="date-time"),
     *             @OA\Property(property="updated_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Team not found")
     *         )
     *     )
     * )
     */
    public function show($id)
    {
        $team = Team::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        return response()->json($team, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/teams/{id}",
     *     operationId="updateTeam",
     *     tags={"Teams"},
     *     summary="Update a team",
     *     description="Update team details (name and/or budget)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Updated Team Name", description="Team name (optional)"),
     *             @OA\Property(property="budget", type="integer", example=150, description="Team budget (optional)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="name", type="string", example="Updated Team Name"),
     *             @OA\Property(property="budget", type="integer", example=150),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="created_at", type="string", format="date-time"),
     *             @OA\Property(property="updated_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/teams/{id}",
     *     operationId="deleteTeam",
     *     tags={"Teams"},
     *     summary="Delete a team",
     *     description="Delete a team and all its associations",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Team deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found"
     *     )
     * )
     */
    public function destroy($id)
    {
        $team = Team::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        $team->delete();

        return response()->json(['message' => 'Team deleted'], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/teams/{team}/add-player",
     *     operationId="addPlayerToTeam",
     *     tags={"Teams"},
     *     summary="Add a player to a team",
     *     description="Add a single player to the team",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="team",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"player_id"},
     *             @OA\Property(property="player_id", type="integer", example=5, description="Player ID to add")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Player added successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Player added"),
     *             @OA\Property(
     *                 property="team",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="players", type="array", @OA\Items(type="object"))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Player already in team",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Player already in team")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team or player not found"
     *     )
     * )
     */
    public function addPlayer(Request $request, Team $team)
    {
        if ($team->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'player_id' => 'required|exists:players,id',
        ]);

        if ($team->players()->where('player_id', $validated['player_id'])->exists()) {
            return response()->json(['error' => 'Player already in team'], 400);
        }

        $team->players()->attach($validated['player_id']);

        return response()->json([
            'message' => 'Player added',
            'team' => $team->load('players')
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/teams/{team}/players/{playerId}",
     *     operationId="removePlayerFromTeam",
     *     tags={"Teams"},
     *     summary="Remove a player from a team",
     *     description="Remove a single player from the team",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="team",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="playerId",
     *         in="path",
     *         required=true,
     *         description="Player ID to remove",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Player removed successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Player removed"),
     *             @OA\Property(
     *                 property="team",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="players", type="array", @OA\Items(type="object"))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found"
     *     )
     * )
     */
    public function removePlayer(Team $team, $playerId)
    {
        if ($team->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $team->players()->detach($playerId);

        return response()->json([
            'message' => 'Player removed',
            'team' => $team->load('players')
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/teams/{team}/sync-players",
     *     operationId="syncTeamPlayers",
     *     tags={"Teams"},
     *     summary="Sync team players",
     *     description="Replace all team players with a new list of 11 players",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="team",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"player_ids"},
     *             @OA\Property(
     *                 property="player_ids",
     *                 type="array",
     *                 minItems=11,
     *                 maxItems=11,
     *                 @OA\Items(type="integer"),
     *                 example={1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11},
     *                 description="Exactly 11 player IDs"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team players synced successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Team updated successfully"),
     *             @OA\Property(
     *                 property="team",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="budget", type="integer"),
     *                 @OA\Property(
     *                     property="players",
     *                     type="array",
     *                     minItems=11,
     *                     @OA\Items(type="object")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error - must provide exactly 11 players"
     *     )
     * )
     */
    public function syncPlayers(Request $request, Team $team)
    {
        if ($team->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'player_ids' => 'required|array|size:11',
            'player_ids.*' => 'required|exists:players,id',
        ]);

        $team->players()->sync($validated['player_ids']);

        return response()->json([
            'message' => 'Team updated successfully',
            'team' => $team->load('players')
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/teams/{team}/players",
     *     operationId="getTeamPlayers",
     *     tags={"Teams"},
     *     summary="Get all players of a team",
     *     description="Retrieve all players in a specific team (public endpoint)",
     *     @OA\Parameter(
     *         name="team",
     *         in="path",
     *         required=true,
     *         description="Team ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of players retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="position", type="string", example="Forward"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found"
     *     )
     * )
     */
    public function players(Team $team)
    {
        $players = $team->players;
        return response()->json($players, 200);
    }
}