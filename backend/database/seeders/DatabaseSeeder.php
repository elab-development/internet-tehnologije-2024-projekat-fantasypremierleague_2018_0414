<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        //  Create users first
        \App\Models\User::factory(5)->create();

        $this->call(ClubSeeder::class);

        $this->call(PlayerSeeder::class);

        $this->call(TeamSeeder::class);

        $this->call(PlayerTeamSeeder::class);
    }
}
