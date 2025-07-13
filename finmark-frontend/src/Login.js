import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Send username and password to backend
      const res = await axios.post('http://localhost:5000/auth/login', { 
        username, 
        password 
      });
      
      console.log('Login response:', res.data); // Debug log
      setToken(res.data.token);
      setError('');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      
      // Handle different error scenarios
      if (err.response?.status === 400) {
        setError('Invalid username or password. Please try again.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please make sure the server is running.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "0 auto", padding: 20, border: "1px solid #eee", borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {error && <div style={{color:'red', marginBottom:10, fontSize: '14px'}}>{error}</div>}
      
      {/* Demo credentials info */}
      <div style={{ 
        background: '#f0f8ff', 
        padding: '10px', 
        marginBottom: '15px', 
        borderRadius: '5px', 
        fontSize: '12px',
        border: '1px solid #cce7ff'
      }}>
        <strong>Demo Credentials:</strong><br/>
        Username: <code>john</code> or <code>admin</code><br/>
        Password: <code>password</code>
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          disabled={isLoading}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={isLoading}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          width: "100%", 
          padding: 8, 
          background: isLoading ? "#ccc" : "#0074D9", 
          color: "#fff", 
          border: "none", 
          borderRadius: 5,
          cursor: isLoading ? "not-allowed" : "pointer"
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
