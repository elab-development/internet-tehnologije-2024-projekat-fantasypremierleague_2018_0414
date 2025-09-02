<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Player extends Model
{
    use HasFactory; 
    protected $fillable = ['name', 'position', 'club_id', 'price'];

    
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'player_team');
    }

    public function index(Request $request)
{
    $query = Player::query();

    if ($request->has('name')) {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    if ($request->has('position')) {
        $query->where('position', $request->position);
    }

    if ($request->has('team')) {
        $query->where('team', 'like', '%' . $request->team . '%');
    }

    $perPage = $request->get('per_page', 10); // default 10
    $players = $query->paginate($perPage);

    return response()->json($players);
}

}
