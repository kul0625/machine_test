const Transaction = require('../models/Transaction');
const User = require('../models/User');

const COMMISSION_RATE = 0.02;

const createTransaction = async (payload) => Transaction.create(payload);

const transferBalance = async ({ sender, receiver, amount, type = 'TRANSFER', note = '' }) => {
  if (sender.balance < amount) throw new Error('Insufficient balance');

  sender.balance -= amount;
  receiver.balance += amount;

  const commission = +(amount * COMMISSION_RATE).toFixed(2);
  sender.commissionEarned += commission;

  await sender.save();
  await receiver.save();

  await createTransaction({
    type,
    amount,
    senderId: sender._id,
    receiverId: receiver._id,
    debitedFromId: sender._id,
    commissionAmount: commission,
    note
  });

  return { sender, receiver, commission };
};

const selfRecharge = async (owner, amount) => {
  owner.balance += amount;
  await owner.save();
  await createTransaction({ type: 'SELF_RECHARGE', amount, receiverId: owner._id, note: 'Owner self recharge' });
  return owner;
};

const getStatement = async (userId) =>
  Transaction.find({
    $or: [{ senderId: userId }, { receiverId: userId }, { debitedFromId: userId }]
  })
    .populate('senderId receiverId debitedFromId', 'username name level')
    .sort({ createdAt: -1 });

module.exports = { transferBalance, selfRecharge, getStatement };
