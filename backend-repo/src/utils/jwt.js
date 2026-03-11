const jwt = require('jsonwebtoken');

const signToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      level: user.level,
      parentId: user.parentId
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

module.exports = { signToken };
