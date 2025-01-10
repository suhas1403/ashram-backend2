const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Store decoded token in the request object
    next();
  });
};

module.exports = {
  verifyToken,
};
