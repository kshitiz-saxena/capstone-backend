const { createChatPayload } = require('../services/chatService');

async function processChat(req, res, next) {
  try {
    const { message = '', conversationId } = req.body;

    const payload = createChatPayload({
      userId: req.user.sub,
      message,
      conversationId,
      files: req.files || [],
    });

    return res.status(200).json({
      success: true,
      message: 'Chat request processed successfully',
      data: payload,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  processChat,
};
