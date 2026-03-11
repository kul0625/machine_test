const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const { createCaptcha, verifyCaptcha } = require('../utils/captchaStore');

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  maxAge: 24 * 60 * 60 * 1000
};

const captcha = (req, res) => {
  const data = createCaptcha(req);
  res.json(data);
};

const register = async (req, res) => {
  const actor = await User.findById(req.auth.sub);
  const { username, name, password, role = 'USER' } = req.body;
  if (!username || !name || !password) return res.status(400).json({ message: 'Missing required fields' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Username already exists' });

  const nextLevel = actor.level + 1;
  const passwordHash = await bcrypt.hash(password, 10);

  const created = await User.create({
    username,
    name,
    passwordHash,
    role: actor.role === 'OWNER' ? role : 'USER',
    level: nextLevel,
    parentId: actor._id,
    balance: 0
  });

  res.status(201).json({
    message: 'User created',
    user: {
      id: created._id,
      username: created.username,
      name: created.name,
      level: created.level,
      role: created.role,
      parentId: created.parentId
    }
  });
};

const login = async (req, res) => {
  const { username, password, captchaAnswer } = req.body;
  const captchaCheck = verifyCaptcha(req, captchaAnswer);
  if (!captchaCheck.valid) return res.status(400).json({ message: captchaCheck.message });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.cookie('auth_token', token, cookieOptions);
  res.json({
    message: 'Logged in',
    user: { id: user._id, username: user.username, name: user.name, role: user.role, level: user.level, balance: user.balance }
  });
};

const me = async (req, res) => {
  const user = await User.findById(req.auth.sub).select('-passwordHash');
  res.json({ user });
};

const logout = (req, res) => {
  res.clearCookie('auth_token');
  req.session.destroy(() => {});
  res.json({ message: 'Logged out' });
};

module.exports = { captcha, register, login, me, logout };
