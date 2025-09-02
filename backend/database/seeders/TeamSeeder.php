<?php



namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    public function run()
    {
        // Create 5 random fantasy teams
        Team::factory(5)->create();
    }
}
