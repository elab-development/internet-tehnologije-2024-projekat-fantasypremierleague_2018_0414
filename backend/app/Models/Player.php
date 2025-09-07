<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Player extends Model
{
    use HasFactory; 

   
           



    protected $fillable = [
        'first_name',
        'second_name', 
        'position', 
        'club_id', 
        'price',
        'total_points',
        'assists',
        'goals',
        'expected_goals',
        'expected_assists',
        'gw1_points',
        'gw2_points',
        'gw3_points',
        'gw4_points',
        'gw5_points'
    ];







    

    // Each player belongs to a single club
    public function club()
    {
        return $this->belongsTo(Club::class, 'club_id');
    }

    // Keep this if you actually have many-to-many teams too
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'player_team');
    }
}
