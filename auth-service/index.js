const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const SECRET = process.env.JWT_SECRET || 'mysecret';

// For demo: one hardcoded user
const users = [{ username: 'john', password: 'password123', email: 'john@example.com', role: 'user' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required.' });
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required.' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = app;

if (require.main === module) {
  app.listen(4001, () => console.log('Auth service running on 4001'));
}
