// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Unauthorized from './components/Unauthorized';
import ForgotPasswordPage from './components/ForgotPasswordPage'; // or './pages/ForgotPasswordPage'
import ResetPasswordPage from './components/ResetPasswordPage';
console.log(AuthProvider);

const players = [
  { id: 1, name: "Erling Haaland", team: "Manchester City", position: "Forward", predictedPoints: 9.2, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223094.png" },
  { id: 2, name: "Mohamed Salah", team: "Liverpool", position: "Midfielder", predictedPoints: 8.7, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/118748.png" },
  { id: 3, name: "Bukayo Saka", team: "Arsenal", position: "Midfielder", predictedPoints: 7.4, photo: "https://resources.premierleague.com/premierleague25/photos/players/110x140/223340.png" }
];

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar currentPage="home" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage players={players} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/analytics" element={<Analytics players={players} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;