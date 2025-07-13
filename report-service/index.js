const express = require('express');
const app = express();

let cache = {};

app.use(express.json());

app.get('/report', (req, res) => {
  if (cache['report']) {
    return res.json({ report: cache['report'], cached: true });
  }
  const data = { balance: 12345, transactions: 5 };
  cache['report'] = data;
  setTimeout(() => { delete cache['report']; }, 30000); // cache expires in 30 seconds
  res.json({ report: data, cached: false });
});

module.exports = app;

// Only run if called directly (not needed if only used as a router)
if (require.main === module) {
  app.listen(4003, () => console.log('Report service running on 4003'));
}
