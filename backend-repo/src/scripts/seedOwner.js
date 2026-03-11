require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDb = require('../config/db');
const User = require('../models/User');

(async () => {
  await connectDb();
  const existing = await User.findOne({ role: 'OWNER' });
  if (existing) {
    console.log('Owner already exists:', existing.username);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(process.env.OWNER_DEFAULT_PASSWORD || 'Owner@123', 10);
  const owner = await User.create({
    username: 'owner',
    name: 'System Owner',
    passwordHash,
    role: 'OWNER',
    level: 1,
    balance: 0,
    parentId: null
  });

  console.log('Owner created:', owner.username);
  process.exit(0);
})();
