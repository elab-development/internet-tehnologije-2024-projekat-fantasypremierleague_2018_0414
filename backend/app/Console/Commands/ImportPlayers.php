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
                    'first_name'     => $data['first_name'],
                    'second_name'    => $data['second_name'],
                    'position' => $data['player_position'],
                    'club_id'  => $club->id,
                    'price'    => $data['player_cost'],
                    'goals' => $data['goals_scored'],
                    'assists' => $data['assists'],
                    'total_points' => $data['total_points'],
                    'expected_goals' => $data['expected_goals'],
                    'expected_assists' => $data['expected_assists'],
                    'gw1_points' => $data['gw1_points'],
                    'gw2_points' => $data['gw2_points'],
                    'gw3_points' => $data['gw3_points'],
                    'gw4_points' => $data['gw4_points'],
                    'gw5_points' => $data['gw5_points'],

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
