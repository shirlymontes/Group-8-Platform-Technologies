const bcrypt = require("bcryptjs");

const users = [];

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const exists = users.find(user => user.email === email);
  if (exists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });

  return res.status(201).json({ message: "User registered successfully!" });
};
