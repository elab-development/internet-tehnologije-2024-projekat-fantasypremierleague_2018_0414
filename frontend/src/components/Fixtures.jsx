import { useEffect, useState } from "react";
import axios from "axios";

export default function UpcomingFixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await axios.get("https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED", {
          headers: { "X-Auth-Token": "YOUR_API_KEY" } // API key required
        });
        setFixtures(res.data.matches);
      } catch (err) {
        console.error("Error fetching fixtures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) return <p>Loading upcoming fixtures...</p>;

  return (
    <div className="p-4 bg-purple-800 rounded-xl shadow-lg border border-purple-600">
      <h2 className="text-xl font-semibold mb-4 text-purple-100">Upcoming Premier League Fixtures</h2>
      <table className="w-full text-left border-collapse">
        <thead className="bg-purple-700">
          <tr>
            <th className="p-2 text-purple-200">Date</th>
            <th className="p-2 text-purple-200">Home</th>
            <th className="p-2 text-purple-200">Away</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((f) => (
            <tr key={f.id} className="hover:bg-purple-600 transition">
              <td className="p-2 border-t border-purple-600">{new Date(f.utcDate).toLocaleString()}</td>
              <td className="p-2 border-t border-purple-600">{f.homeTeam.name}</td>
              <td className="p-2 border-t border-purple-600">{f.awayTeam.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
