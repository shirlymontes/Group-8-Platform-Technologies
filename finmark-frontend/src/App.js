import React, { useState, useEffect } from 'react';
import Login from './Login';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(undefined); // use undefined for "not loaded"
  const [report, setReport] = useState(undefined);

  useEffect(() => {
    if (token) {
      setProfile(undefined); // reset to loading
      setReport(undefined);  // reset to loading

      // Fetch user profile
      axios.get('http://localhost:5000/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setProfile(res.data))
        .catch(() => setProfile(false));

      // Fetch report
      axios.get('http://localhost:5000/report/report')
        .then(res => setReport(res.data))
        .catch(() => setReport(false));
    }
  }, [token]);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to FinMark</h1>
      
      <h2>User Profile</h2>
      {profile === undefined && <div>Loading profile...</div>}
      {profile === false && <div style={{ color: "red" }}>Failed to load profile data.</div>}
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}

      <h2>Financial Report</h2>
      {report === undefined && <div>Loading report...</div>}
      {report === false && <div style={{ color: "red" }}>Failed to load report data.</div>}
      {report && <pre>{JSON.stringify(report, null, 2)}</pre>}
    </div>
  );
}

export default App;
