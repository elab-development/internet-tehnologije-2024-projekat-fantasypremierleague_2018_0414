<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{   
    use HasFactory; 
    protected $fillable = ['name', 'city']; 
    
    public function players()
    {
        return $this->hasMany(Player::class);
    }
}