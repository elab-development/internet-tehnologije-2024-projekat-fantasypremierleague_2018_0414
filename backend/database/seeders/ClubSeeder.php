<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    public function run()
    {
        // Create 20 Premier League clubs for testing
        Club::factory(20)->create();
    }
}
