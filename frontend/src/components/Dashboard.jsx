import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";
import PlayerSearch from "./PlayerSearch";
import Navbar from "./Navbar.jsx";

const API_BASE = "http://localhost:8000/api";

const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  
  // Team creation/editing state
  const [teamName, setTeamName] = useState("");
  const [budget, setBudget] = useState("100");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showNameModal, setShowNameModal] = useState(false);

  // Fetch the user's team
  const fetchTeam = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${API_BASE}/teams`, config);
      const userTeam = res.data[0] || null;
      setTeam(userTeam);
      if (userTeam && userTeam.players) {
        setSelectedPlayers(userTeam.players);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  // Fetch all available players
  const fetchPlayers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/players?all=true`);
      console.log("Players API response:", res.data);
      
      // Check if data is in res.data.data or just res.data
      const players = res.data.data || res.data;
      console.log("Players array:", players);
      
      setAvailablePlayers(players);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
  }, [fetchTeam, fetchPlayers]);

  // Add player to selected
  const addPlayerToTeam = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
  };

  // Remove player from selected
  const removePlayerFromTeam = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };

  // Check if formation is valid
  const getFormationStatus = () => {
    const positionCounts = {
      GKP: 0,
      DEF: 0,
      MID: 0,
      FWD: 0,
    };
    
    if (selectedPlayers && Array.isArray(selectedPlayers)) {
      selectedPlayers.forEach(p => {
        if (positionCounts[p.position] !== undefined) {
          positionCounts[p.position]++;
        }
      });
    }

    const isValid = 
      positionCounts.GKP === 1 &&
      positionCounts.DEF === 4 &&
      positionCounts.MID === 4 &&
      positionCounts.FWD === 2;

    return {
      isValid,
      current: positionCounts,
      needed: {
        GKP: 1 - positionCounts.GKP,
        DEF: 4 - positionCounts.DEF,
        MID: 4 - positionCounts.MID,
        FWD: 2 - positionCounts.FWD,
      }
    };
  };

  const formationStatus = getFormationStatus();

  // Start creating team
  const handleStartCreateTeam = () => {
    setShowNameModal(true);
  };

  // After entering name/budget, start player selection
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim()) return alert("Team name required!");
    setShowNameModal(false);
    setIsCreatingTeam(true);
    setSelectedPlayers([]);
  };

  // Save team (create or update)
  const handleSaveTeam = async () => {
    if (!formationStatus.isValid) {
      return alert("You need exactly 1 GK, 4 DEF, 4 MID, 2 FWD!");
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const playerIds = selectedPlayers.map(p => p.id);

      if (team) {
        // Update existing team using sync
        await axios.put(
          `${API_BASE}/teams/${team.id}/sync-players`,
          { player_ids: playerIds },
          config
        );
        
        setIsEditingTeam(false);
        alert("Team updated successfully!");
      } else {
        // Create new team
        const teamRes = await axios.post(
          `${API_BASE}/teams`,
          { name: teamName, budget: parseInt(budget) },
          config
        );
        
        const newTeam = teamRes.data;
        
        // Sync players with new team
        await axios.put(
          `${API_BASE}/teams/${newTeam.id}/sync-players`,
          { player_ids: playerIds },
          config
        );
        
        setIsCreatingTeam(false);
        alert("Team created successfully!");
      }
      
      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to save team: " + (err.response?.data?.error || err.message));
    }
  };

  // Cancel team creation/editing
  const handleCancel = () => {
    setIsCreatingTeam(false);
    setIsEditingTeam(false);
    setSelectedPlayers(team?.players || []);
    setTeamName("");
    setBudget("100");
  };

  // Start editing existing team
  const handleEditTeam = () => {
    setIsEditingTeam(true);
    setSelectedPlayers(team.players || []);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <Navbar />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-300 mb-4"></div>
            <p className="text-purple-200 text-xl">Loading your team...</p>
          </div>
        </div>
      </div>
    );
  }

  // Group players by position for pitch
  const positions = {
    GKP: [],
    DEF: [],
    MID: [],
    FWD: [],
  };
  
  if (selectedPlayers && Array.isArray(selectedPlayers)) {
    selectedPlayers.forEach((player) => {
      if (positions[player.position]) {
        positions[player.position].push(player);
      }
    });
  }

  // Filter available players (exclude selected)
  const availableToAdd = availablePlayers.filter(
    p => !selectedPlayers.some(sp => sp.id === p.id)
  );

  // Show create/edit interface
  if (isCreatingTeam || isEditingTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <Navbar />
        <div className="p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl shadow-2xl p-6 border-2 border-purple-400">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {isCreatingTeam ? `Create Team: ${teamName}` : `Edit Team: ${team.name}`}
                  </h1>
                  <p className="text-purple-200 text-lg">
                    Players Selected: <span className="font-bold text-white">{selectedPlayers.length}/11</span>
                    {!formationStatus.isValid && (
                      <span className="ml-4 text-yellow-300">
                        Need: {formationStatus.needed.GKP > 0 && `${formationStatus.needed.GKP} GK `}
                        {formationStatus.needed.DEF > 0 && `${formationStatus.needed.DEF} DEF `}
                        {formationStatus.needed.MID > 0 && `${formationStatus.needed.MID} MID `}
                        {formationStatus.needed.FWD > 0 && `${formationStatus.needed.FWD} FWD`}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTeam}
                    disabled={!formationStatus.isValid}
                    className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all ${
                      formationStatus.isValid
                        ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Save Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Football Pitch */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
                  Your Squad (1-4-4-2)
                </h2>
                <div className="flex flex-col gap-8">
                  {/* Goalkeeper */}
                  <div className="flex justify-center gap-4">
                    {positions.GKP.map((player) => (
                      <div key={player.id} className="relative">
                        <PlayerCard player={player} />
                        <button
                          onClick={() => removePlayerFromTeam(player.id)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors shadow-lg z-10"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {positions.GKP.length === 0 && (
                      <div className="text-white text-center bg-white bg-opacity-10 rounded-lg px-8 py-6 backdrop-blur-sm">
                        <p className="text-lg font-semibold">Goalkeeper (0/1)</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Defenders */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.DEF.map((player) => (
                      <div key={player.id} className="relative">
                        <PlayerCard player={player} />
                        <button
                          onClick={() => removePlayerFromTeam(player.id)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors shadow-lg z-10"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {[...Array(4 - positions.DEF.length)].map((_, i) => (
                      <div key={`def-empty-${i}`} className="text-white text-center bg-white bg-opacity-10 rounded-lg px-8 py-6 backdrop-blur-sm">
                        <p className="text-sm font-semibold">Defender</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Midfielders */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.MID.map((player) => (
                      <div key={player.id} className="relative">
                        <PlayerCard player={player} />
                        <button
                          onClick={() => removePlayerFromTeam(player.id)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors shadow-lg z-10"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {[...Array(4 - positions.MID.length)].map((_, i) => (
                      <div key={`mid-empty-${i}`} className="text-white text-center bg-white bg-opacity-10 rounded-lg px-8 py-6 backdrop-blur-sm">
                        <p className="text-sm font-semibold">Midfielder</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Forwards */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.FWD.map((player) => (
                      <div key={player.id} className="relative">
                        <PlayerCard player={player} />
                        <button
                          onClick={() => removePlayerFromTeam(player.id)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors shadow-lg z-10"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {[...Array(2 - positions.FWD.length)].map((_, i) => (
                      <div key={`fwd-empty-${i}`} className="text-white text-center bg-white bg-opacity-10 rounded-lg px-8 py-6 backdrop-blur-sm">
                        <p className="text-sm font-semibold">Forward</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Players */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-purple-800 rounded-2xl p-6 shadow-2xl border-2 border-purple-400">
              <h2 className="text-3xl font-bold text-white mb-6">Available Players - Click to Add</h2>
              <PlayerSearch setSelectedPlayer={addPlayerToTeam} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main view - Team exists and not editing
  if (team && !isEditingTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <Navbar />
        <div className="p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl shadow-2xl p-6 border-2 border-purple-400">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{team.name}</h1>
                  <p className="text-purple-200 text-lg">
                    Budget: <span className="font-bold text-white">${team.budget}M</span> | 
                    <span className="ml-2">Players: <span className="font-bold text-white">{team.players?.length || 0}</span></span>
                  </p>
                </div>
                <button
                  onClick={handleEditTeam}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  Edit Team
                </button>
              </div>
            </div>
          </div>

          {/* Football Pitch */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
                  Your Squad
                </h2>
                <div className="flex flex-col gap-8">
                  <div className="flex justify-center gap-4">
                    {positions.GKP.map(player => <PlayerCard key={player.id} player={player} />)}
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.DEF.map(player => <PlayerCard key={player.id} player={player} />)}
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.MID.map(player => <PlayerCard key={player.id} player={player} />)}
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {positions.FWD.map(player => <PlayerCard key={player.id} player={player} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No team - show create option
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navbar />
      <div className="p-6 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="max-w-2xl text-center">
          <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-2xl p-12 shadow-2xl border-2 border-purple-400">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Team Yet</h2>
            <p className="text-purple-200 mb-6 text-lg">Create your fantasy football team and start building your dream squad!</p>
            <button
              onClick={handleStartCreateTeam}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Create Your Team
            </button>
          </div>
        </div>

        {/* Name Modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-purple-400">
              <h2 className="text-3xl font-bold text-white mb-6">Create Team</h2>
              <form onSubmit={handleNameSubmit}>
                <div className="mb-4">
                  <label className="block text-purple-200 mb-2 font-semibold">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="px-4 py-3 rounded-lg w-full text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-200 mb-2 font-semibold">Budget (millions)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="100"
                    className="px-4 py-3 rounded-lg w-full text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNameModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;