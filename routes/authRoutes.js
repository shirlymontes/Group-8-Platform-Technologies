const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router(); 

// Demo users - in production, this would be in a database
const users = [
  { 
    email: "john@example.com", 
    username: "john", 
    password: "$2b$10$0ChLJ3F/ZeUQQg5kUoWgLef3oErJysAsNYg0Qs3CXQc4cIbF7wGIy", // password
    role: "user"
  },
  { 
    email: "admin@example.com", 
    username: "admin", 
    password: "$2b$10$0ChLJ3F/ZeUQQg5kUoWgLef3oErJysAsNYg0Qs3CXQc4cIbF7wGIy", // password
    role: "admin"
  }
]; 

// REGISTER
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists by email or username
    const existingUser = users.find((u) => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ 
      email: email || `${username}@example.com`, 
      username: username || email.split('@')[0], 
      password: hashedPassword 
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Find user by email or username
    const user = users.find((u) => 
      u.email === (email || username) || 
      u.username === (username || email)
    );
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        email: user.email, 
        username: user.username,
        role: user.role
      }, 
      process.env.JWT_SECRET || 'fallback-secret', 
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: {
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", (req, res) => {
  res.json(users.map((u) => ({ email: u.email, username: u.username }))); // hides password
});

// Test endpoint to verify backend is working
router.get("/test", (req, res) => {
  res.json({ 
    message: "Auth service is working!", 
    availableUsers: users.map(u => ({ username: u.username, email: u.email })),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;