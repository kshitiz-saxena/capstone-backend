const express = require('express');
const { handleValidationErrors } = require('../lib/validation');
const { requestDemo } = require('../controllers/demoController');
const { demoRequestValidator } = require('../validators/demoValidators');

const router = express.Router();

router.post('/request-demo', demoRequestValidator, handleValidationErrors, requestDemo);

module.exports = router;
