const User = require('../models/User');
const { getDownlineTree, isDescendant } = require('../services/hierarchyService');
const { transferBalance } = require('../services/balanceService');

const nextLevelUsers = async (req, res) => {
  const users = await User.find({}).select('-passwordHash');
  res.json({ users });
};

const hierarchy = async (req, res) => {
  const target = req.params.userId;
  const allowed = req.auth.role === 'OWNER' || req.auth.role === 'ADMIN' || (await isDescendant(req.auth.sub, target)) || req.auth.sub === target;
  if (!allowed) return res.status(403).json({ message: 'Forbidden' });

  const tree = await getDownlineTree(target);
  res.json({ tree });
};

const creditAny = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  const user = await User.findById(userId);
  if (!user || !user.parentId) return res.status(400).json({ message: 'Invalid target user' });

  const parent = await User.findById(user.parentId);
  const result = await transferBalance({
    sender: parent,
    receiver: user,
    amount: Number(amount),
    type: 'ADMIN_CREDIT',
    note: `Admin initiated by ${req.auth.sub}`
  });

  req.app.get('io').emit('balance-updated', {
    userIds: [parent._id.toString(), user._id.toString()],
    balances: { [parent._id]: result.sender.balance, [user._id]: result.receiver.balance }
  });

  res.json({ message: 'Admin credit successful', parentDebited: parent.username, commission: result.commission });
};

const balanceSummary = async (_req, res) => {
  const users = await User.find({}).select('username name level role balance commissionEarned parentId');
  const totalSystemBalance = users.reduce((acc, u) => acc + u.balance, 0);
  res.json({ totalSystemBalance, users });
};

module.exports = { nextLevelUsers, hierarchy, creditAny, balanceSummary };
