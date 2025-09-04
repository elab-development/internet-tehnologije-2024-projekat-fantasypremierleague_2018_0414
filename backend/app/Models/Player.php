<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Player extends Model
{
    use HasFactory; 
    protected $fillable = ['name', 'position', 'club_id', 'price'];

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
