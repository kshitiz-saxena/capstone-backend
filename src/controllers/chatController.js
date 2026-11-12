const { createChatPayloadFromRag, queryRagPipeline } = require('../services/chatService');

async function processChat(req, res, next) {
  try {
    const { message = '', conversationId, topK } = req.body;

    const ragResponse = await queryRagPipeline({ query: message, topK });
    const payload = createChatPayloadFromRag({
      userId: req.user.sub,
      conversationId,
      files: req.files || [],
      fallbackMessage: message,
      ragResponse,
    });

    return res.status(200).json({
      success: true,
      message: 'Chat response generated successfully',
      data: {
        ...payload,
        ragResponse,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  processChat,
};
