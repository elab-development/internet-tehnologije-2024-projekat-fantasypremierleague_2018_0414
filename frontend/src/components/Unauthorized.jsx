// src/components/Unauthorized.jsx
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#e74c3c' }}>403</h1>
      <h2 style={{ marginTop: '10px' }}>Unauthorized Access</h2>
      <p style={{ color: '#666', marginTop: '10px' }}>
        You don't have permission to access this page.
      </p>
      <Link 
        to="/" 
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default Unauthorized;