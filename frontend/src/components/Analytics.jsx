// Analytics.jsx
import PlayerSearch from './PlayerSearch.jsx';

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fantasy Football Analytics</h1>

      {/* Other analytics charts, stats, etc. go here */}

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Player Search</h2>
        <PlayerSearch />
      </section>
    </div>
  );
}