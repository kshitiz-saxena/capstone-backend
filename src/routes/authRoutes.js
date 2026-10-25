const express = require('express');
const { handleValidationErrors } = require('../lib/validation');
const { requireAuth } = require('../middleware/auth');
const { login, logout, getMe } = require('../controllers/authController');
const { loginValidator, logoutValidator } = require('../validators/authValidators');

const router = express.Router();

router.post('/login', loginValidator, handleValidationErrors, login);
router.post('/logout', logoutValidator, handleValidationErrors, requireAuth, logout);
router.get('/me', requireAuth, getMe);

module.exports = router;
