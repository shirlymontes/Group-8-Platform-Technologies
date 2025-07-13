const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = process.env.JWT_SECRET || 'fallback-secret'; // Match auth service secret

app.use(express.json());

app.get('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], SECRET);
    res.json({ 
      username: decoded.username, 
      email: decoded.email,
      role: decoded.role || 'user' // Default role if not present
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = app;

// Only run if called directly (not needed if only used as a router)
if (require.main === module) {
  app.listen(4002, () => console.log('User service running on 4002'));
}
