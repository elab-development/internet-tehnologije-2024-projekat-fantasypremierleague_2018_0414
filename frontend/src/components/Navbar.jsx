import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  LogIn,
  UserPlus,
  BarChart3,
  Home,
  User,
  LogOut,
} from "lucide-react";
import axios from "axios";

const Navbar = ({ currentPage = "home", isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setIsAuth(false);
      navigate("/login");
    }
  };

  const handleNavigation = (page) => {
    navigate(page === "home" ? "/" : `/${page}`);
  };

  // Common button style
  const buttonClass = "flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-white hover:text-purple-200 hover:bg-purple-800/30";

  return (
    <nav className="relative z-10 px-6 py-6 bg-gradient-to-r from-purple-700 to-purple-500 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => handleNavigation("home")}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            FantasyPro
          </span>
        </div>

        {/* Main navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavigation("home")}
            className={`${buttonClass} ${currentPage === "home" ? "bg-purple-800/20 text-purple-200" : ""}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigation("analytics")}
            className={`${buttonClass} ${currentPage === "analytics" ? "bg-purple-800/20 text-purple-200" : ""}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => handleNavigation("dashboard")}
            className={`${buttonClass} ${currentPage === "dashboard" ? "bg-purple-800/20 text-purple-200" : ""}`}
          >
            <User className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Authentication buttons */}
        <div className="flex items-center space-x-4">
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`${buttonClass}`}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:block">Login</span>
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`${buttonClass} bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500`}
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:block">Register</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className={`${buttonClass} bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;