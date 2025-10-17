import React,{ useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email,
      });

      setStatus('Reset link sent! Please check your email.');
    } catch (error) {
      console.error(error);
      setStatus('Could not send reset link. Check email or try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">Forgot Password</h2>
        <p className="text-gray-600 mb-4">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Send Reset Link
          </button>
        </form>
        {status && <p className="text-sm text-green-600 mt-4">{status}</p>}
      </div>
    </div>
  );
}
