const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // parsing JSON from Postman

app.use("/auth", authRoutes); // Changed from /api to /auth to match frontend
app.use("/api", authRoutes); // Keep /api as well for backward compatibility 

app.get("/", (req, res) => {
  res.send("✅ Server is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
