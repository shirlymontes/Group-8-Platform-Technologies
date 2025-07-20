import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [profile, setProfile] = useState(undefined);
  const [report, setReport] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fetch user profile
    fetch('http://localhost:5000/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setProfile(data.profile);
      } else {
        setProfile(false);
      }
    })
    .catch(() => setProfile(false));

    // Fetch financial report
    fetch('http://localhost:5000/api/reports/financial', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setReport(data.report);
      } else {
        setReport(false);
      }
    })
    .catch(() => setReport(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '16px 32px',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              boxShadow: '0 6px 20px rgba(66, 153, 225, 0.3)'
            }}>
              💼
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0',
                letterSpacing: '-0.5px'
              }}>
                FinMark
              </h1>
              <p style={{
                fontSize: '13px',
                color: '#718096',
                margin: '0',
                fontWeight: '500'
              }}>
                Financial Technology Platform
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            <div style={{
              display: 'flex',
              gap: '24px'
            }}>
              <a href="#" style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                padding: '8px 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}>
                Dashboard
              </a>
              <a href="#" style={{
                color: '#718096',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '15px',
                padding: '8px 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}>
                Reports
              </a>
              <a href="#" style={{
                color: '#718096',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '15px',
                padding: '8px 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}>
                Analytics
              </a>
            </div>

            {/* User Profile Dropdown */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(66, 153, 225, 0.08)',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(66, 153, 225, 0.15)',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: 'white',
                fontWeight: '600'
              }}>
                {profile?.username ? profile.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2d3748'
                }}>
                  {profile?.username || 'User'}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#718096'
                }}>
                  {profile?.email || 'Loading...'}
                </div>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#718096',
                marginLeft: '8px'
              }}>
                ▼
              </div>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} style={{
              background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(229, 62, 62, 0.3)',
              transition: 'all 0.2s ease'
            }}>
              Logout
            </button>
          </nav>
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
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: 'white',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}>
                🏦
              </div>
              <div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: '#2d3748',
                  margin: '0 0 8px 0',
                  letterSpacing: '-1px'
                }}>
                  Welcome to FinMark Banking
                </h1>
                <p style={{
                  fontSize: '18px',
                  color: '#718096',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  Your comprehensive financial management platform
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '32px'
            }}>
              {[
                { icon: '💳', title: 'Transfer Funds', desc: 'Send money instantly' },
                { icon: '📊', title: 'View Reports', desc: 'Financial analytics' },
                { icon: '💰', title: 'Account Balance', desc: 'Check your balance' },
                { icon: '🔒', title: 'Security', desc: 'Manage your security' }
              ].map((action, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{action.icon}</div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#2d3748',
                    marginBottom: '4px'
                  }}>
                    {action.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#718096'
                  }}>
                    {action.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Summary Bar */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '24px 32px',
          marginBottom: '40px',
          boxShadow: '0 12px 28px rgba(72, 187, 120, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.06) 0%, rgba(56, 161, 105, 0.06) 100%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(72, 187, 120, 0.3)'
                }}>
                  👤
                </div>
                <div>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#2d3748',
                    margin: '0 0 2px 0'
                  }}>
                    Account Overview
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#718096',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    Personal Banking Information
                  </p>
                </div>
              </div>
              
              {/* Account Status */}
              <div style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)'
              }}>
                <span>✓</span>
                <span>Active Account</span>
              </div>
            </div>

            {profile && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {/* Username */}
                <div style={{
                  background: 'rgba(66, 153, 225, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(66, 153, 225, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#4a5568',
                      marginBottom: '2px'
                    }}>
                      Username
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      {profile.username}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{
                  background: 'rgba(102, 126, 234, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(102, 126, 234, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white'
                  }}>
                    📧
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#4a5568',
                      marginBottom: '2px'
                    }}>
                      Email
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      {profile.email}
                    </div>
                  </div>
                </div>

                {/* Account Role */}
                <div style={{
                  background: 'rgba(72, 187, 120, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(72, 187, 120, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white'
                  }}>
                    🔐
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#4a5568',
                      marginBottom: '2px'
                    }}>
                      Account Type
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2d3748',
                      textTransform: 'capitalize'
                    }}>
                      {profile.role || 'User'}
                    </div>
                  </div>
                </div>

                {/* User ID */}
                <div style={{
                  background: 'rgba(237, 137, 54, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(237, 137, 54, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white'
                  }}>
                    🆔
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#4a5568',
                      marginBottom: '2px'
                    }}>
                      Account ID
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2d3748',
                      fontFamily: "'SF Mono', Monaco, monospace"
                    }}>
                      #{profile.id}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview - Full Width */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 20px 40px rgba(66, 153, 225, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-15%',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.06) 0%, rgba(49, 130, 206, 0.06) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
                boxShadow: '0 8px 24px rgba(66, 153, 225, 0.3)'
              }}>
                📊
              </div>
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#2d3748',
                  margin: '0 0 4px 0'
                }}>
                  Financial Overview
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#718096',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  Account Summary & Analytics
                </p>
              </div>
            </div>

            {report === undefined && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: '#718096',
                fontSize: '18px',
                justifyContent: 'center',
                minHeight: '200px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid #e2e8f0',
                  borderTop: '3px solid #4299e1',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Loading financial data...
              </div>
            )}

            {report === false && (
              <div style={{
                background: '#fed7d7',
                color: '#c53030',
                padding: '24px',
                borderRadius: '16px',
                fontSize: '18px',
                border: '1px solid #feb2b2',
                textAlign: 'center'
              }}>
                ⚠️ Failed to load financial report data
              </div>
            )}

            {report && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {/* Account Balance */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(72, 187, 120, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(72, 187, 120, 0.3)'
                      }}>
                        💰
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#4a5568',
                          marginBottom: '2px'
                        }}>
                          Account Balance
                        </div>
                        <div style={{
                          fontSize: '26px',
                          fontWeight: '700',
                          color: '#2d3748'
                        }}>
                          ${report.balance?.toLocaleString() || '0'}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#718096',
                      background: 'rgba(72, 187, 120, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      Primary Account
                    </div>
                  </div>
                </div>

                {/* Monthly Income */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(49, 130, 206, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(66, 153, 225, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(49, 130, 206, 0.1) 100%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(66, 153, 225, 0.3)'
                      }}>
                        📈
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#4a5568',
                          marginBottom: '2px'
                        }}>
                          Monthly Income
                        </div>
                        <div style={{
                          fontSize: '26px',
                          fontWeight: '700',
                          color: '#2d3748'
                        }}>
                          ${report.income?.toLocaleString() || '0'}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#718096',
                      background: 'rgba(66, 153, 225, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      This Month
                    </div>
                  </div>
                </div>

                {/* Monthly Expenses */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, rgba(221, 107, 32, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(237, 137, 54, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, rgba(221, 107, 32, 0.1) 100%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(237, 137, 54, 0.3)'
                      }}>
                        📉
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#4a5568',
                          marginBottom: '2px'
                        }}>
                          Monthly Expenses
                        </div>
                        <div style={{
                          fontSize: '26px',
                          fontWeight: '700',
                          color: '#2d3748'
                        }}>
                          ${report.expenses?.toLocaleString() || '0'}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#718096',
                      background: 'rgba(237, 137, 54, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      This Month
                    </div>
                  </div>
                </div>

                {/* Credit Score */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                      }}>
                        ⭐
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#4a5568',
                          marginBottom: '2px'
                        }}>
                          Credit Score
                        </div>
                        <div style={{
                          fontSize: '26px',
                          fontWeight: '700',
                          color: '#2d3748'
                        }}>
                          {report.creditScore || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#718096',
                      background: 'rgba(102, 126, 234, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      {report.creditScore >= 750 ? 'Excellent' : 
                       report.creditScore >= 700 ? 'Good' : 
                       report.creditScore >= 650 ? 'Fair' : 'Poor'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '48px 32px 32px',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '32px'
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: 'white'
                }}>
                  💼
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0
                }}>
                  FinMark
                </h3>
              </div>
              <p style={{
                color: '#a0aec0',
                lineHeight: '1.6',
                margin: '0 0 16px 0',
                fontSize: '14px'
              }}>
                Your trusted financial technology platform providing comprehensive banking and investment solutions.
              </p>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                {['📧', '📱', '🌐'].map((icon, index) => (
                  <div key={index} style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(66, 153, 225, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                Services
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Online Banking', 'Investment Portfolio', 'Financial Reports', 'Credit Analysis', 'Loan Management'].map((service, index) => (
                  <li key={index} style={{
                    marginBottom: '8px'
                  }}>
                    <a href="#" style={{
                      color: '#a0aec0',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s ease'
                    }}>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                Support
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Help Center', 'Contact Us', 'Security', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '8px'
                  }}>
                    <a href="#" style={{
                      color: '#a0aec0',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s ease'
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                Contact Information
              </h4>
              <div style={{
                color: '#a0aec0',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  📍 123 Financial District, Banking Tower
                </div>
                <div style={{ marginBottom: '8px' }}>
                  📞 +1 (555) 123-4567
                </div>
                <div style={{ marginBottom: '8px' }}>
                  📧 support@finmark.com
                </div>
                <div>
                  🕒 24/7 Customer Support
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{
              color: '#a0aec0',
              fontSize: '14px',
              margin: 0
            }}>
              © 2024 FinMark Financial Technology Platform. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}>
              <span style={{
                color: '#a0aec0',
                fontSize: '12px'
              }}>
                🔒 Bank-Grade Security
              </span>
              <span style={{
                color: '#a0aec0',
                fontSize: '12px'
              }}>
                🛡️ FDIC Insured
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
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
