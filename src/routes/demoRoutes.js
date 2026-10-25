const express = require('express');
const { handleValidationErrors } = require('../lib/validation');
const { requireAuth } = require('../middleware/auth');
const { requestDemo } = require('../controllers/demoController');
const { demoRequestValidator } = require('../validators/demoValidators');

const router = express.Router();

router.post('/request-demo', demoRequestValidator, handleValidationErrors, requireAuth, requestDemo);

module.exports = router;
