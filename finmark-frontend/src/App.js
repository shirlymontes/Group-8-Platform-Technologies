import React, { useState, useEffect } from 'react';
import Login from './Login';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(undefined); // use undefined for "not loaded"
  const [report, setReport] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      setProfile(undefined); // reset to loading
      setReport(undefined);  // reset to loading

      // Fetch user profile
      axios.get('http://localhost:5000/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setProfile(res.data);
          setUser(res.data);
        })
        .catch(() => setProfile(false));

      // Fetch report
      axios.get('http://localhost:5000/report/report')
        .then(res => setReport(res.data))
        .catch(() => setReport(false));
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setProfile(undefined);
    setReport(undefined);
    setUser(null);
  };

  if (!token) return <Login setToken={setToken} />;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header/Navigation */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '0 32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo and Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
            }}>
              F
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2d3748',
                margin: '0',
                letterSpacing: '-0.5px'
              }}>
                FinMark
              </h1>
              <p style={{
                fontSize: '12px',
                color: '#718096',
                margin: '0',
                fontWeight: '500'
              }}>
                Financial Dashboard
              </p>
            </div>
          </div>

          {/* User Info and Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2d3748',
                margin: '0'
              }}>
                Welcome, {user?.username || 'User'}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#718096',
                margin: '0'
              }}>
                {user?.role === 'admin' ? 'Administrator' : 'User Account'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(229, 62, 62, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.3)';
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 32px'
      }}>
        {/* Welcome Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#2d3748',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to FinMark
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#718096',
            margin: '0',
            fontWeight: '400'
          }}>
            Your comprehensive financial technology platform
          </p>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px'
        }}>
          {/* User Profile Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: 'white'
              }}>
                👤
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2d3748',
                margin: '0'
              }}>
                User Profile
              </h2>
            </div>

            {profile === undefined && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#718096',
                fontSize: '16px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #e2e8f0',
                  borderTop: '2px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Loading profile...
              </div>
            )}

            {profile === false && (
              <div style={{
                background: '#fed7d7',
                color: '#c53030',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                border: '1px solid #feb2b2'
              }}>
                ⚠️ Failed to load profile data
              </div>
            )}

            {profile && (
              <div style={{
                background: '#f7fafc',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <pre style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#2d3748',
                  margin: '0',
                  fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                  background: 'transparent',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(profile, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Financial Report Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: 'white'
              }}>
                📊
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2d3748',
                margin: '0'
              }}>
                Financial Report
              </h2>
            </div>

            {report === undefined && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#718096',
                fontSize: '16px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #e2e8f0',
                  borderTop: '2px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Loading report...
              </div>
            )}

            {report === false && (
              <div style={{
                background: '#fed7d7',
                color: '#c53030',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                border: '1px solid #feb2b2'
              }}>
                ⚠️ Failed to load report data
              </div>
            )}

            {report && (
              <div style={{
                background: '#f7fafc',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <pre style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#2d3748',
                  margin: '0',
                  fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                  background: 'transparent',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(report, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '24px 32px',
        textAlign: 'center',
        color: '#718096',
        fontSize: '14px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ margin: '0' }}>
            © 2025 FinMark - Financial Technology Platform | Group 8 | MO-IT151 Platform Technologies
          </p>
        </div>
      </footer>

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

export default App;
