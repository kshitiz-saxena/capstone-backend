const bcrypt = require('bcryptjs');

const demoUsers = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    passwordHash: bcrypt.hashSync('Demo@123', 12),
  },
];

async function findUserByEmail(email) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

function getUserById(userId) {
  return demoUsers.find((user) => user.id === userId) || null;
}

function serializeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

module.exports = {
  demoUsers,
  findUserByEmail,
  verifyCredentials,
  getUserById,
  serializeUser,
};
