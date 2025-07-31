<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['name', 'position', 'club_id', 'price'];

    
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'player_team');
    }
}
