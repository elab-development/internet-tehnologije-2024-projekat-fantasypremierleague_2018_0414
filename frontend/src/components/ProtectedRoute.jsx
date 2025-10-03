// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, requiredRole = null, redirectTo = '/login' }) {
  const { user, loading, hasRole, isAuthenticated } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if specific role is required
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}