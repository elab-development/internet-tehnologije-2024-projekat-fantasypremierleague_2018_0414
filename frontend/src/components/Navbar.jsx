// src/components/Navbar.jsx
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
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ currentPage = "home" }) => {
  const navigate = useNavigate();
  const { user, logout, hasRole, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
          {/* Public pages - visible to everyone */}
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

          {/* Dashboard - only for logged in users */}
          {isAuthenticated() && (
            <button
              onClick={() => handleNavigation("dashboard")}
              className={`${buttonClass} ${currentPage === "dashboard" ? "bg-purple-800/20 text-purple-200" : ""}`}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          )}

          {/* Admin Panel - only for admins */}
          {hasRole('admin') && (
            <button
              onClick={() => handleNavigation("admin")}
              className={`${buttonClass} ${currentPage === "admin" ? "bg-purple-800/20 text-purple-200" : ""}`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          )}
        </div>

        {/* Authentication buttons */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated() ? (
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
            <div className="flex items-center space-x-4">
              {/* User greeting with admin badge */}
              <span className="text-white text-sm hidden sm:flex items-center space-x-2">
                <span>Welcome, {user?.name || 'User'}</span>
                {hasRole('admin') && (
                  <span className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full font-semibold">
                    Admin
                  </span>
                )}
              </span>
              
              <button
                onClick={handleLogout}
                className={`${buttonClass} bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;