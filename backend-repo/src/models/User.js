const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['OWNER', 'ADMIN', 'USER'], default: 'USER' },
    level: { type: Number, required: true, default: 1 },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    balance: { type: Number, default: 0 },
    commissionEarned: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
