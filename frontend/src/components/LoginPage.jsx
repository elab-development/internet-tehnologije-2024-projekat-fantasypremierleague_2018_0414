// src/components/LoginPage.jsx
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      // Use the login function from AuthContext
      const result = await login(formData);

      if (result.success) {
        // Redirect to homepage after successful login
        navigate('/home');
      } else {
        // Show error message
        alert('Login failed: ' + result.error);
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}

export default LoginPage;