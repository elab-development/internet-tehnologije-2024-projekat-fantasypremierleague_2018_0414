import AuthForm from './AuthForm';
import axios from 'axios';

function RegisterPage() {
  const handleRegister = async (formData, navigate) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}

export default RegisterPage;