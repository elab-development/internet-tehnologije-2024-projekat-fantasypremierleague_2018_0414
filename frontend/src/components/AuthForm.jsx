import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ 
  mode = 'login', 
  onSubmit,
  redirectPath = '/home',
  showStats = true 
}) {
  const navigate = useNavigate();
  
  const getInitialFormData = () => {
    const baseFields = { email: '', password: '' };
    if (mode === 'register') {
      return {
        ...baseFields,
        confirmPassword: '',
        firstName: '',
        lastName: ''
      };
    }
    return baseFields;
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const requiredFields = mode === 'login' 
    ? ['email', 'password'] 
    : ['email', 'password', 'confirmPassword', 'firstName', 'lastName'];

  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    alert('Please fill in all fields.');
    return;
  }

  if (mode === 'register' && formData.password !== formData.confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  let submitData = formData;
  if (mode === 'register') {
    submitData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    };
  }

  if (onSubmit) {
    onSubmit(submitData, navigate);
  } else {
    console.log(`${mode} attempt:`, submitData);
    navigate(redirectPath);
  }
};

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here.');
  };

  const handleToggleMode = () => {
    const newPath = mode === 'login' ? '/register' : '/login';
    navigate(newPath);
  };

  const config = {
    login: {
      title: 'Welcome Back!',
      subtitle: 'Sign in to access your dashboard',
      submitText: 'Login ',
      toggleText: "Don't have an account?",
      toggleLinkText: 'Sign up for free'
    },
    register: {
      title: 'Join FFAnalytics',
      subtitle: 'Create your account to get started',
      submitText: 'Create Account',
      toggleText: 'Already have an account?',
      toggleLinkText: 'Sign in here'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-3xl">
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="relative w-10 h-10 bg-amber-800 rounded-full">
            <div className="absolute top-1/2 left-1/5 right-1/5 h-0.5 bg-white transform -translate-y-1/2"></div>
            <div className="absolute top-3/10 bottom-3/10 left-1/2 w-0.5 bg-white transform -translate-x-1/2"></div>
          </div>
          <h1 className="text-4xl font-bold text-purple-900">FFAnalytics</h1>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{config[mode].title}</h2>
        <p className="text-gray-600 mb-6 text-base">{config[mode].subtitle}</p>
        
        {(mode === 'login' && showStats) && (
          <div className="flex justify-around mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
            <div className="text-center">
              <div className="text-xl font-bold text-purple-900">98%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-900">50K+</div>
              <div className="text-xs text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-900">Real-time</div>
              <div className="text-xs text-gray-600">Data</div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="text-left">
                <label htmlFor="firstName" className="block mb-2 text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100 bg-white/90"
                  required
                />
              </div>
              <div className="text-left">
                <label htmlFor="lastName" className="block mb-2 text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100 bg-white/90"
                  required
                />
              </div>
            </div>
          )}

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
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100 bg-white/90"
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
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100 bg-white/90"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="text-left">
              <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100 bg-white/90"
                required
              />
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full p-4 bg-gradient-to-r from-purple-900 to-purple-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30 active:translate-y-0 mt-3"
          >
            {config[mode].submitText}
          </button>
        </div>
        
        {mode === 'login' && (
          <div className="mt-5">
            <button
              onClick={handleForgotPassword}
              className="text-purple-700 text-sm hover:underline bg-none border-none cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>
        )}
        
        <div className="mt-8 pt-5 border-t border-gray-200 text-gray-600">
          {config[mode].toggleText}{' '}
          <button
            onClick={handleToggleMode}
            className="text-purple-700 font-semibold hover:underline bg-none border-none cursor-pointer"
          >
            {config[mode].toggleLinkText}
          </button>
        </div>
      </div>
    </div>
  );
}