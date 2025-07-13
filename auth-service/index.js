const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const SECRET = process.env.JWT_SECRET || 'mysecret';

// For demo: one hardcoded user
const users = [{ username: 'john', password: 'password123', role: 'user' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// For later use in the API Gateway
module.exports = app;

// Only run if called directly
if (require.main === module) {
  app.listen(4001, () => console.log('Auth service running on 4001'));
}
