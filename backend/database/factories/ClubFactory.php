<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Club;

class ClubFactory extends Factory
{
    protected $model = Club::class;

    public function definition()
    {
        $clubs = [
            'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton & Hove Albion',
            'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham',
            'Liverpool', 'Luton Town', 'Manchester City', 'Manchester United', 'Newcastle United',
            'Nottingham Forest', 'Sheffield United', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton Wanderers'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($clubs),
            'city' => $this->faker->city()
        ];
    }
}
