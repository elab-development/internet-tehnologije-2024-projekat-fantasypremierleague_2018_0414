import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";

const API_BASE = "http://localhost:8000/api";

const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch the user's team
  const fetchTeam = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/teams`, config);
      setTeam(res.data[0] || null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [token]);

  // Fetch all available players for adding
  const fetchPlayers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/players`);
      setAvailablePlayers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
  }, [fetchTeam, fetchPlayers]);

  // Add a player
   // Add a player
  const addPlayer = async (playerId) => {
    try {
      console.log("Adding player:", playerId, "to team:", team.id);
      console.log("Request payload:", { player_id: playerId });
      const response = await axios.post(
        `${API_BASE}/teams/${team.id}/add-player`,
        { player_id: playerId },
        config
      );
      console.log("Success:", response.data);
      fetchTeam();
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      alert(`Failed to add player: ${err.response?.data?.message || err.response?.data?.detail || err.message}`);
    }
  };

  // Remove a player
  const removePlayer = async (playerId) => {
    try {
      await axios.delete(
        `${API_BASE}/teams/${team.id}/remove-player/${playerId}`,
        config
      );
      fetchTeam();
    } catch (err) {
      console.error(err);
    }
  };

  // Create a team
  const [teamName, setTeamName] = useState("");
  const [budget, setBudget] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return alert("Team name required!");
    try {
      await axios.post(
        `${API_BASE}/teams`,
        { name: teamName, budget: budget ? parseInt(budget) : undefined },
        config
      );
      setTeamName("");
      setBudget("");
      fetchTeam();
    } catch (err) {
      alert("Failed to create team.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-purple-300 text-center mt-10">Loading...</div>;

  if (!team)
    return (
      <div className="max-w-md mx-auto mt-10 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Your Team</h2>
        <form onSubmit={handleCreateTeam}>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="px-3 py-2 rounded w-full mb-4 text-black"
          />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget (optional)"
            className="px-3 py-2 rounded w-full mb-4 text-black"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full font-semibold"
          >
            Create Team
          </button>
        </form>
      </div>
    );

  // Group players by position for pitch layout
  const positions = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Forward: [],
  };
  team.players?.forEach((player) => {
    if (positions[player.position]) {
      positions[player.position].push(player);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">{team.name}'s Team</h1>

      {/* Football Pitch */}
      <div className="bg-gradient-to-br from-purple-800 via-purple-700 to-purple-600 rounded-lg p-8 mb-8 mx-auto max-w-4xl shadow-lg border-8 border-purple-900">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Football Pitch</h2>
        <div className="flex flex-col gap-8">
          {/* Goalkeeper */}
          <div className="flex justify-center">
            {positions.Goalkeeper.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {/* Defenders */}
          <div className="flex justify-around">
            {positions.Defender.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {/* Midfielders */}
          <div className="flex justify-around">
            {positions.Midfielder.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {/* Forwards */}
          <div className="flex justify-center gap-8">
            {positions.Forward.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>

      {/* Add players */}
      <div className="bg-purple-800 rounded-lg p-6 max-w-4xl mx-auto shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Add Players</h2>
        <div className="grid grid-cols-4 gap-4">
          {availablePlayers
            .filter((p) => !team.players?.some((tp) => tp.id === p.id))
            .map((player) => (
              <div key={player.id} className="flex flex-col items-center">
                <PlayerCard player={player} />
                <button
                  className="mt-2 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  onClick={() => addPlayer(player.id)}
                >
                  Add
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Remove players */}
      <div className="bg-purple-800 rounded-lg p-6 max-w-4xl mx-auto mt-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Remove Players
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {team.players?.map((player) => (
            <div key={player.id} className="flex flex-col items-center">
              <PlayerCard player={player} />
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => removePlayer(player.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;