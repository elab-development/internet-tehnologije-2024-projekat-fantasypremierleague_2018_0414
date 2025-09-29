import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';

const players = [
  { id: 1, name: "Erling Haaland", team: "Manchester City", position: "Forward", predictedPoints: 9.2, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223094.png" },
  { id: 2, name: "Mohamed Salah", team: "Liverpool", position: "Midfielder", predictedPoints: 8.7, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/118748.png" },
  { id: 3, name: "Bukayo Saka", team: "Arsenal", position: "Midfielder", predictedPoints: 7.4, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223340.png" }
];

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Navbar currentPage="home" isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<HomePage players={players} />} />
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/analytics" element={<Analytics players={players} />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
