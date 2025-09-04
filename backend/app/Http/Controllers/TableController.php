<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;


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

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch standings'], 500);
        }

        $standings = $response->json();

        if (isset($standings['standings'][0]['table'])) {
            $plTable = $standings['standings'][0]['table'];
        } else {
            return response()->json(['error' => 'Standings data not found'], 404);
        }

        return response()->json($plTable);
    }
}
