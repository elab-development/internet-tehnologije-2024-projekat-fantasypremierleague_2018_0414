<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Team;
use App\Models\User;


namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Team;
use App\Models\User;

class TeamFactory extends Factory
{
    protected $model = Team::class;

    public function definition()
    {
        $teamNames = [
            'Red Dragons', 'Flying Eagles', 'Golden Lions', 'Thunder Wolves',
            'Iron Titans', 'Mighty Sharks', 'Shadow Panthers', 'Crimson Knights'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($teamNames), // <- no more ->team()
            'user_id' => User::inRandomOrder()->first()->id,
            'budget' => 500,
        ];
    }
}
