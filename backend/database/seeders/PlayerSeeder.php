<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Player;
use App\Models\Club;

class PlayerSeeder extends Seeder
{
    public function run()
    {
        // Ensure clubs exist first
        if (Club::count() === 0) {
            $this->call(ClubSeeder::class);
        }

        // Create 50 random players
        Player::factory(50)->create();
    }
}
