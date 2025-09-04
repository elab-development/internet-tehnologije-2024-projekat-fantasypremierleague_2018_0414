// src/components/PlayerSearchComponent.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerSearch() {
  // --- States for filters ---
  const [name, setName] = useState("");         // search by player name
  const [position, setPosition] = useState(""); // search by position
  const [team, setTeam] = useState("");         // search by team
  const [page, setPage] = useState(1);          // pagination
  const [players, setPlayers] = useState([]);   // list of players
  const [meta, setMeta] = useState({});         // pagination info

  // Fetch players whenever filters or page change 
  useEffect(() => {
    fetchPlayers();
  }, [name, position, team, page]);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/players", {
        params: { name, position, team, page },
      });
      setPlayers(res.data.data);
      setMeta(res.data.meta);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Player Search</h2>

      {/* --- Filters --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Name filter */}
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => {
            setPage(1); // reset page to 1 when searching
            setName(e.target.value);
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        {/* Position filter */}
        <select
          value={position}
          onChange={(e) => {
            setPage(1);
            setPosition(e.target.value);
          }}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">All Positions</option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>

        {/* Team filter */}
        <input
          type="text"
          placeholder="Search by team..."
          value={team}
          onChange={(e) => {
            setPage(1);
            setTeam(e.target.value);
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* --- Player Table --- */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Team</th>
            <th className="border p-2">Position</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.team}</td>
                <td className="border p-2">{p.position}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No players found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* --- Pagination Controls --- */}
      <div className="flex gap-2 mt-4 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {meta.current_page ?? 1} of {meta.last_page ?? 1}
        </span>
        <button
          disabled={page === meta.last_page}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
