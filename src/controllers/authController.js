const { signToken } = require('../lib/jwt');
const { AppError } = require('../lib/errors');
const { verifyCredentials, getUserById, serializeUser } = require('../services/authService');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await verifyCredentials(email, password);

    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    const token = signToken({ sub: user.id, email: user.email, name: user.name });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: serializeUser(user),
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
}

function getMe(req, res) {
  const user = getUserById(req.user.sub);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      user: serializeUser(user),
    },
  });
}

module.exports = {
  login,
  logout,
  getMe,
};
