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

    // === Frontend Validation for Milestone 2 ===
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    // === End Frontend Validation ===

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

      // Show backend validation errors (from new backend code)
      if (err.response?.data?.error) {
        setError(err.response.data.error);
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '60px 50px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        {/* Logo/Brand Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            F
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2d3748',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            FinMark
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: '0',
            fontWeight: '400'
          }}>
            Financial Technology Platform
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Sign In to Your Account
          </h2>

          {error && (
            <div style={{
              background: '#fed7d7',
              color: '#c53030',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid #feb2b2',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}

          {/* Demo credentials info */}
          <div style={{
            background: '#e6fffa',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '12px',
            fontSize: '14px',
            border: '1px solid #81e6d9',
            textAlign: 'left'
          }}>
            <div style={{
              fontWeight: '600',
              color: '#234e52',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '20px',
                height: '20px',
                background: '#38b2ac',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px'
              }}>
                ℹ
              </span>
              Demo Credentials
            </div>
            <div style={{ color: '#2d5a27', lineHeight: '1.6' }}>
              <strong>Username:</strong> <code style={{ background: '#f0fff4', padding: '2px 6px', borderRadius: '4px' }}>john</code> or <code style={{ background: '#f0fff4', padding: '2px 6px', borderRadius: '4px' }}>admin</code><br />
              <strong>Password:</strong> <code style={{ background: '#f0fff4', padding: '2px 6px', borderRadius: '4px' }}>password</code>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: isLoading ? '#f7fafc' : 'white',
                color: '#2d3748',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: isLoading ? '#f7fafc' : 'white',
                color: '#2d3748',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              background: isLoading 
                ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isLoading 
                ? 'none' 
                : '0 10px 25px rgba(102, 126, 234, 0.3)',
              transform: isLoading ? 'none' : 'translateY(0)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0',
          fontSize: '14px',
          color: '#718096'
        }}>
          <p style={{ margin: '0' }}>
            Secure access to your financial dashboard
          </p>
        </div>
      </div>

      {/* Add CSS animation for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
