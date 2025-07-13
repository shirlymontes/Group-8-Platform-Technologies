const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the route modules instead of the full apps
const authRoutes = require('../routes/authRoutes');
const userApp = require('../user-service');
const reportApp = require('../report-service');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// Mount microservices under their own routes
app.use('/auth', authRoutes);
app.use('/user', userApp);
app.use('/report', reportApp);

// Optional: Health check endpoint
app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
