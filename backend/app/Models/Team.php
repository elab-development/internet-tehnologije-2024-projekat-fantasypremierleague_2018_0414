<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['user_id', 'budget', 'name'];

  
    public function players()
    {
        return $this->belongsToMany(Player::class, 'player_team');
    }
}
