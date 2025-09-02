<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class TableController extends Controller
{
    public function index()
    {
        // Call the Football-Data API
        $response = Http::withHeaders([
            'X-Auth-Token' => env('FOOTBALL_API_TOKEN')
        ])->get('https://api.football-data.org/v4/competitions/PL/standings');

        // Handle API errors
        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch standings'], 500);
        }

        $standings = $response->json();

        // Extract only the main league table
        if (isset($standings['standings'][0]['table'])) {
            $plTable = $standings['standings'][0]['table'];
        } else {
            return response()->json(['error' => 'Standings data not found'], 404);
        }

        return response()->json($plTable);
    }
}
