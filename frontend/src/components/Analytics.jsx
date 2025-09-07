import Navbar from "./Navbar.jsx";
import PlayerSearch from "./PlayerSearch.jsx";
import Standings from "./Standings.jsx";

export default function Analytics() {
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
              </h2>
              <PlayerSearch />
            </div>

            {/* Placeholder for Charts / Stats */}
            <div className="bg-purple-800 rounded-2xl shadow-lg border border-purple-600 p-6 h-64 flex items-center justify-center text-purple-200">
              Player / Team Stats Chart (coming soon)
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
