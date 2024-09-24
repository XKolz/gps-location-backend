
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.header('Authorization');

  // Check if no token or the Bearer keyword is missing
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token after "Bearer "
  const token = authHeader.split(' ')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
