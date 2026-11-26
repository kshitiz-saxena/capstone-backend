const express = require('express');
const { handleValidationErrors } = require('../lib/validation');
const { requireAuth } = require('../middleware/auth');
const { login, googleLogin, logout, getMe } = require('../controllers/authController');
const { loginValidator, googleLoginValidator, logoutValidator } = require('../validators/authValidators');

const router = express.Router();

router.post('/login', loginValidator, handleValidationErrors, login);
router.post('/google-login', googleLoginValidator, handleValidationErrors, googleLogin);
router.post('/logout', logoutValidator, handleValidationErrors, requireAuth, logout);
router.get('/me', requireAuth, getMe);

module.exports = router;
