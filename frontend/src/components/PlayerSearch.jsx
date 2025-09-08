import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerSearch({ setSelectedPlayer }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [club, setClub] = useState("");
  const [page, setPage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });

  useEffect(() => {
    fetchPlayers();
  }, [name, position, club, page]);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/players", {
        params: { name, position, club, page },
      });
      setPlayers(res.data.data || []);
      setMeta({
        current_page: res.data.current_page || 1,
        last_page: res.data.last_page || 1,
      });
    } catch (error) {
      console.error("Error fetching players:", error);
      setPlayers([]);
      setMeta({ current_page: 1, last_page: 1 });
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => { setPage(1); setName(e.target.value); }}
          className="bg-purple-700 text-white placeholder-purple-300 border border-purple-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-1/3"
        />
        <select
          value={position}
          onChange={(e) => { setPage(1); setPosition(e.target.value); }}
          className="bg-purple-700 text-white border border-purple-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-1/3"
        >
          <option value="">All Positions</option>
          <option value="GKP">Goalkeeper</option>
          <option value="DEF">Defender</option>
          <option value="MID">Midfielder</option>
          <option value="FWD">Forward</option>
        </select>
        <input
          type="text"
          placeholder="Search by club..."
          value={club}
          onChange={(e) => { setPage(1); setClub(e.target.value); }}
          className="bg-purple-700 text-white placeholder-purple-300 border border-purple-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-1/3"
        />
      </div>

      {/* Players Table */}
      <div className="overflow-x-auto rounded-lg border border-purple-600">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-700">
            <tr>
              <th className="p-3 text-purple-200">Name</th>
              <th className="p-3 text-purple-200">Club</th>
              <th className="p-3 text-purple-200">Position</th>
            </tr>
          </thead>
          <tbody>
            {players.length > 0 ? (
              players.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-purple-600 cursor-pointer transition"
                  onClick={() => setSelectedPlayer(p)}
                >
                  <td className="p-3 border-t border-purple-600">{p.first_name} {p.second_name}</td>
                  <td className="p-3 border-t border-purple-600">{p.club?.name ?? "N/A"}</td>
                  <td className="p-3 border-t border-purple-600">{p.position}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-purple-300">
                  No players found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-3 mt-6 items-center justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>
        <span className="text-purple-200">
          Page {meta.current_page} of {meta.last_page}
        </span>
        <button
          disabled={page === meta.last_page}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
