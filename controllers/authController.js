const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/config');

const login = (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = userModel.getUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Verify password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  // Return token in the response
  return res.status(200).json({
    message: 'Login successful',
    token,
  });
};

module.exports = {
  login,
};
