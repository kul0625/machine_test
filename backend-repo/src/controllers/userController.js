const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isDescendant, getDownlineTree } = require('../services/hierarchyService');

const listNextLevel = async (req, res) => {
  const users = await User.find({ parentId: req.auth.sub }).select('-passwordHash');
  res.json({ users });
};

const downline = async (req, res) => {
  const targetId = req.params.userId || req.auth.sub;
  if (targetId !== req.auth.sub) {
    const allowed = await isDescendant(req.auth.sub, targetId);
    if (!allowed && req.auth.role !== 'OWNER') return res.status(403).json({ message: 'Forbidden target user' });
  }

  const tree = await getDownlineTree(targetId);
  if (!tree) return res.status(404).json({ message: 'User not found' });
  res.json({ tree });
};

const changePassword = async (req, res) => {
  const child = await User.findById(req.params.userId);
  if (!child) return res.status(404).json({ message: 'User not found' });
  if (child.parentId?.toString() !== req.auth.sub) {
    return res.status(403).json({ message: 'You can update only next-level user password' });
  }

  const { newPassword } = req.body;
  child.passwordHash = await bcrypt.hash(newPassword, 10);
  await child.save();
  res.json({ message: 'Password updated' });
};

module.exports = { listNextLevel, downline, changePassword };
