import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token } = response.data;

      // Store token
      localStorage.setItem('token', token);

      // Update App state state
      setIsAuth(true);

      // Redirect to dashboard after login
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}

export default LoginPage;
