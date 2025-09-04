import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerSearch() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({});

  useEffect(() => {
    fetchPlayers();
  }, [page, search]);

  const fetchPlayers = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/players", {
      params: { page, search }
    });
    setPlayers(res.data.data);
    setMeta(res.data.meta);
  };

  return (
    <div className="p-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => {
          setPage(1); // reset to page 1 when searching
          setSearch(e.target.value);
        }}
        className="border p-2 rounded"
      />

      {/* Table */}
      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Team</th>
            <th className="border p-2">Position</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.team}</td>
              <td className="border p-2">{p.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {meta.current_page} of {meta.last_page}
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
