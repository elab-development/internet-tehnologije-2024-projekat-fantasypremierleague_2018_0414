import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

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





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}





export default App;
