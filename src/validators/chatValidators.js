const { body } = require('express-validator');

const chatValidator = [
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters'),
  body('conversationId').optional().isString().isLength({ min: 1, max: 100 }).withMessage('Conversation ID must be a valid string'),
  body('topK').optional().isInt({ min: 1 , max: 5 }).withMessage('topK must be a positive integer'),
];

module.exports = {
  chatValidator,
};
