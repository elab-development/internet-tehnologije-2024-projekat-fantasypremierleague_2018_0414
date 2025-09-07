import { useEffect, useState } from "react";
import axios from "axios";

export default function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/analytics/pl-standings");
        const table = res.data.standings || [];  
        setStandings(table);
      } catch (err) {
        console.error("Error fetching standings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return <p>Loading Premier League standings...</p>;

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-purple-700">
          <tr>
            <th className="p-2 text-purple-200">Pos</th>
            <th className="p-2 text-purple-200">Team</th>
            <th className="p-2 text-purple-200">Pts</th>
            <th className="p-2 text-purple-200">W</th>
            <th className="p-2 text-purple-200">D</th>
            <th className="p-2 text-purple-200">L</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id} className="hover:bg-purple-600 transition">
              <td className="p-2 border-t border-purple-600">{team.position}</td>
              <td className="p-2 border-t border-purple-600 flex items-center gap-2">
                <img src={team.team.crest} alt={team.team.name} className="w-5 h-5"/>
                {team.team.name}
              </td>
              <td className="p-2 border-t border-purple-600">{team.points}</td>
              <td className="p-2 border-t border-purple-600">{team.won}</td>
              <td className="p-2 border-t border-purple-600">{team.draw}</td>
              <td className="p-2 border-t border-purple-600">{team.lost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
