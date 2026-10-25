const { validationResult } = require('express-validator');
const { AppError } = require('./errors');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    return next(new AppError('Validation failed', 400, messages));
  }

  return next();
}

module.exports = { handleValidationErrors };
