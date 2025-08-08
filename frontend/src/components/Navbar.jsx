import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, LogIn, UserPlus, BarChart3, Home, User } from 'lucide-react';

const Navbar = ({ currentPage = "home" }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleNavigation = (page) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <nav className="relative z-10 px-6 py-6 bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => handleNavigation('home')}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            FantasyPro
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleNavigation('home')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'home' 
                ? 'text-purple-400 bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('analytics')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'analytics' 
                ? 'text-purple-400 bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button 
            onClick={() => handleNavigation('dashboard')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'dashboard' 
                ? 'text-purple-400 bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLogin}
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:block">Login</span>
          </button>
          <button 
            onClick={handleRegister}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 px-4 sm:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:block">Register</span>
          </button>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;