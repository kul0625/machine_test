const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['SELF_RECHARGE', 'TRANSFER', 'ADMIN_CREDIT', 'COMMISSION'], required: true },
    amount: { type: Number, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    debitedFromId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    commissionAmount: { type: Number, default: 0 },
    note: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
