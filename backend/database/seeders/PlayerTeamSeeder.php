<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\Player;

class PlayerTeamSeeder extends Seeder
{
    public function run()
    {
        $teams = Team::all();
        $players = Player::all();

        foreach ($teams as $team) {
            // Attach 15 random players to each fantasy team
            $team->players()->attach(
                $players->random(15)->pluck('id')->toArray()
            );
        }
    }
}
