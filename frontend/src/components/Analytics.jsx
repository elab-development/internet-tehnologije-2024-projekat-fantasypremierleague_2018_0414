// Analytics.jsx
import Navbar from './Navbar.jsx';
import PlayerSearch from './PlayerSearch.jsx';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 text-white">
      {/* Navbar at the top */}
      <Navbar currentPage="analytics" />

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
          Fantasy Football Analytics
        </h1>

        {/* Other analytics charts, stats, etc. go here */}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">
            Player Search
          </h2>
          <PlayerSearch />
        </section>
      </main>
    </div>
  );
}
