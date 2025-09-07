<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Player;
use App\Models\Club;

class ImportPlayers extends Command
{
    // Command signature and description
    protected $signature = 'import:players {file}';
    protected $description = 'Delete mock players and import players from CSV with club_id mapping';

    public function handle()
    {
        $filePath = $this->argument('file');

        // Check if CSV exists
        if (!file_exists($filePath)) {
            $this->error("File not found: $filePath");
            return 1;
        }

        // Step 1: Delete all existing players safely
        $this->info("Deleting all existing players...");
        Player::query()->delete(); // safer than truncate with foreign keys
        $this->info("Players table cleared.");

        // Step 2: Open CSV and import
        if (($handle = fopen($filePath, 'r')) !== false) {
            $header = fgetcsv($handle, 1000, ','); // first row = headers
            $bar = $this->output->createProgressBar();

            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $data = array_combine($header, $row);

                // Step 3: Find the club by team_name
                $club = Club::where('name', $data['team_name'])->first();

                if (!$club) {
                    $this->warn("Club not found for player: " . $data['first_name'] . " (" . $data['team_name'] . ")");
                    continue; // skip players with missing club
                }

                // Step 4: Insert the player
                Player::create([
                    'first_name' => $data['first_name'],
                    'second_name' => $data['second_name'],
                    'position' => $data['player_position'],
                    'club_id' => $club->id,
                    'price' => $data['player_cost'] ,
                    'goals' => $data['goals_scored'] ?? 0,
                    'assists' => $data['assists'] ?? 0,
                    'total_points' => $data['total_points'] ?? 0,
                    'expected_goals' => $data['expected_goals'] ?? 0.0,
                    'expected_assists' => $data['expected_assists'] ?? 0.0,
                    'gw1_points' => $data['gw1_points'] !== '' ? $data['gw1_points'] : 0.0,
                    'gw2_points' => $data['gw2_points'] !== '' ? $data['gw2_points'] : 0.0,
                    'gw3_points' => $data['gw3_points'] !== '' ? $data['gw3_points'] : 0.0,
                    'gw4_points' => $data['gw4_points'] !== '' ? $data['gw4_points'] : 0.0,
                    'gw5_points' => $data['gw5_points'] !== '' ? $data['gw5_points'] : 0.0,
                ]);



                $bar->advance();
            }

            fclose($handle);
            $bar->finish();
        }

        $this->info("\nImport completed successfully!");
        return 0;
    }
}
