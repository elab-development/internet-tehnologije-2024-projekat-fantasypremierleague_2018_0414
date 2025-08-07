import './App.css';
import PlayerCard from './components/PlayerCard';
 const  players = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    predictedPoints: 9.2,
    photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223094.png"
  },
  {
    id: 2,
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Midfielder",
    predictedPoints: 8.7,
    photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/118748.png"
  },
  {
    id: 3,
    name: "Bukayo Saka",
    team: "Arsenal",
    position: "Midfielder",
    predictedPoints: 7.4,
    photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223340.png"
  }
];

console.log ("Players data:", players);



function App() {
  console.log("Players data:", players);
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-center">
        {players.map(player => (
          <PlayerCard
            key={player.id}
            name={player.name}
            photo={player.photo}
            position={player.position}
            points={player.predictedPoints}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
