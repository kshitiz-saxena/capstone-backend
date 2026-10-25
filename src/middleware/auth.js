const { verifyToken } = require('../lib/jwt');
const { AppError } = require('../lib/errors');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication token is required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
}

module.exports = { requireAuth };
