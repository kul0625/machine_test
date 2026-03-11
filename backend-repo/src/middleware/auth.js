const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.auth.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};

module.exports = { requireAuth, requireRole };
