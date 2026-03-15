const User = require('../models/User');
const { transferBalance, selfRecharge, getStatement } = require('../services/balanceService');

const ownerSelfRecharge = async (req, res) => {
  const { amount } = req.body;
  const owner = await User.findById(req.auth.sub);
  if (owner.role !== 'OWNER') return res.status(403).json({ message: 'Only owner can self recharge' });

  const updated = await selfRecharge(owner, Number(amount));
  res.json({ message: 'Recharge successful', balance: updated.balance });
};

const creditNextLevel = async (req, res) => {
  const { receiverId, amount } = req.body;
  const sender = await User.findById(req.auth.sub);
  const receiver = await User.findById(receiverId);

  if (!receiver || receiver.parentId?.toString() !== sender._id.toString()) {
    return res.status(403).json({ message: 'Can credit next-level users only' });
  }

  const result = await transferBalance({ sender, receiver, amount: Number(amount), type: 'TRANSFER', note: 'Direct transfer' });
  req.app.get('io').emit('balance-updated', {
    userIds: [sender._id.toString(), receiver._id.toString()],
    balances: { [sender._id]: result.sender.balance, [receiver._id]: result.receiver.balance }
  });

  res.json({ message: 'Transfer complete', commission: result.commission });
};

const statement = async (req, res) => {
  const items = await getStatement(req.auth.sub);
  res.json({ items });
};

module.exports = { ownerSelfRecharge, creditNextLevel, statement };
