import { useState } from "react";
import Navbar from "./Navbar.jsx";
import PlayerSearch from "./PlayerSearch.jsx";
import Standings from "./Standings.jsx";
import PlayerCard from "./PlayerCard.jsx";
import PlayerFormChart from "./PlayerFormChart.jsx";

export default function Analytics() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 text-white">
      {/* Navbar */}
      <Navbar currentPage="analytics" />

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
        </h1>

        {/* Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 grid grid-cols-1 gap-8">
            {/* Player Search Card */}
            <div className="bg-purple-800 rounded-2xl shadow-lg border border-purple-600 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-100">
                Search Players
              </h2>
              <PlayerSearch setSelectedPlayer={setSelectedPlayer} />
            </div>

            {/* Player / Team Stats */}
            <div className="bg-purple-800 rounded-2xl shadow-lg border border-purple-600 p-6 min-h-[300px]">
              {selectedPlayer ? (
                <div className="flex gap-6">
                  {/* Player Card */}
                  <div className="w-1/3">
                    <PlayerCard player={selectedPlayer} />
                  </div>

                  {/* Graph for Player Form */}
                  <div className="w-2/3 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedPlayer.first_name} {selectedPlayer.second_name} - Form
                    </h3>
                    <PlayerFormChart player={selectedPlayer} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-purple-200">
                  Select a player to view stats and form chart
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-purple-800 rounded-2xl shadow-lg border border-purple-600 p-6 sticky top-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-100">
                Premier League Standings
              </h2>
              <Standings />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
