const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { AppError } = require('../lib/errors');
const {
  googleClientId,
  googleClientSecret,
} = require('../config');

const googleClient = new OAuth2Client(
  googleClientId,
  googleClientSecret,
  'postmessage',
);

const demoUsers = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    passwordHash: bcrypt.hashSync('Demo@123', 12),
  },
  {
    id: 'user-2',
    name: 'Kshitiz Saxena',
    email: 'saxenaquiet@gmail.com',
  },
  {
    id: 'user-3',
    name: 'Ashwini Joshi',
    email: 'joshiashwini215@gmail.com',
  },
  {
    id: 'user-4',
    name: 'Prashant Tiwari',
    email: 'tiwariprashant1697@gmail.com',
  },
  {
    id: 'user-5',
    name: 'Rishabh Aggarwal',
    email: 'aggarwal.rishabh945@gmail.com',
  },
  {
    id: 'user-6',
    name: 'Sanket Saurav',
    email: 'sanket.sam01@gmail.com',
  },
];

async function findUserByEmail(email) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

async function verifyGoogleAuthorizationCode(code) {
  if (!googleClientId || !googleClientSecret) {
    throw new AppError('Google login is not configured', 503);
  }

  try {
    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: 'postmessage',
    });

    if (!tokens.id_token) {
      throw new AppError('Google did not return an ID token', 401);
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      throw new AppError('Google account email is not verified', 401);
    }

    const user = await findUserByEmail(payload.email);
    if (!user) {
      throw new AppError('Google account is not authorized', 403);
    }

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Invalid or expired Google authorization code', 401);
  }
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
  verifyGoogleAuthorizationCode,
  getUserById,
  serializeUser,
};
