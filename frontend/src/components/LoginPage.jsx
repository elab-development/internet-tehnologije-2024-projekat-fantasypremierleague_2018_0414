import AuthForm from './AuthForm';
import axios from 'axios';

function LoginPage() {
  const handleLogin = async (formData, navigate) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}

export default LoginPage;