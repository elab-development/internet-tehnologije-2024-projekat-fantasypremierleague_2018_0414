import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    
    // implement login logic
    navigate('/');
    
  };

  const handleForgotPassword = () => {
  };

  const handleSignUp = () => {
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-3xl">
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="relative w-10 h-10 bg-amber-800 rounded-full">
            <div className="absolute top-1/2 left-1/5 right-1/5 h-0.5 bg-white transform -translate-y-1/2"></div>
            <div className="absolute top-3/10 bottom-3/10 left-1/2 w-0.5 bg-white transform -translate-x-1/2"></div>
          </div>
          <h1 className="text-4xl font-bold text-blue-900">FFAnalytics</h1>
        </div>
        
        <p className="text-gray-600 mb-6 text-lg">Advanced Fantasy Football Insights</p>
        
        <div className="flex justify-around mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-900">98%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-900">50K+</div>
            <div className="text-xs text-gray-600">Users</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-900">Real-time</div>
            <div className="text-xs text-gray-600">Data</div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-left">
            <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white/90"
              required
            />
          </div>
          
          <div className="text-left">
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white/90"
              required
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0 mt-3"
          >
            Login
          </button>
        </div>
        
        <div className="mt-5">
          <button
            onClick={handleForgotPassword}
            className="text-blue-700 text-sm hover:underline bg-none border-none cursor-pointer"
          >
            Forgot your password?
          </button>
        </div>
        
        <div className="mt-8 pt-5 border-t border-gray-200 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleSignUp}
            className="text-blue-700 font-semibold hover:underline bg-none border-none cursor-pointer"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}