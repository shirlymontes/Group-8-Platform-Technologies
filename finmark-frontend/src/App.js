import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      activeTab === "register" ? "/api/register" : "/api/login";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setResponse(data.message || "Something went wrong");
    } catch (error) {
      setResponse("Server error");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <img
          src="https://lh5.googleusercontent.com/fn_LrznLLKJsnYjkCglPjr-GbtbiVZGQz14zRTVdZflcAd2ozxRZ63AZgrti8jPkX3aS36IFshMGVi4Ym6qq7kSO3SLtIAw22yKNO5YXlU3WS62e14M0G_f63unXpP7FMafWNIeFCOs=w16383"
          alt="FinMark Logo"
          className="logo"
        />
        <h1>FinMark Corporation</h1>
        <div className="tabs">
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <h2>{activeTab === "register" ? "Create Account" : "Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {activeTab === "register" ? "Register" : "Login"}
        </button>
        <p className="response-message">{response}</p>
      </form>
    </div>
  );
}

export default App;
