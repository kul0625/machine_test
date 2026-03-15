const User = require('../models/User');

const isDescendant = async (ancestorId, candidateId) => {
  let current = await User.findById(candidateId).select('parentId');
  while (current?.parentId) {
    if (current.parentId.toString() === ancestorId.toString()) return true;
    current = await User.findById(current.parentId).select('parentId');
  }
  return false;
};

const getDownlineTree = async (rootId) => {
  const allUsers = await User.find({}).select('name username level parentId role balance').lean();
  const byParent = new Map();
  allUsers.forEach((u) => {
    const key = u.parentId ? u.parentId.toString() : 'ROOT';
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(u);
  });

  const build = (id) => {
    const children = byParent.get(id.toString()) || [];
    return children.map((c) => ({ ...c, children: build(c._id) }));
  };

  const root = allUsers.find((u) => u._id.toString() === rootId.toString());
  if (!root) return null;
  return { ...root, children: build(root._id) };
};

module.exports = { isDescendant, getDownlineTree };
