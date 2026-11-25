const { AppError } = require('../lib/errors');
const { ragApiBaseUrl, ragTopK } = require('../config');

function buildUploadedFiles(files = []) {
  return files.map((file) => ({
    name: file.originalname,
    path: file.path,
    mimetype: file.mimetype,
    size: file.size,
  }));
}

function createChatPayload({ userId, message = '', conversationId = 'default', files = [] }) {
  return {
    userId,
    conversationId,
    message,
    uploadedFiles: buildUploadedFiles(files),
    createdAt: new Date().toISOString(),
  };
}

function createChatPayloadFromRag({ userId, conversationId, files = [], fallbackMessage = '', ragResponse }) {
  const bestSource = Array.isArray(ragResponse?.sources)
    ? ragResponse.sources.reduce((best, current) => {
        if (!best) return current;
        return current.score > best.score ? current : best;
      }, null)
    : null;

  return createChatPayload({
    userId,
    message: bestSource?.content || ragResponse?.answer || fallbackMessage,
    conversationId,
    files,
  });
}

function parseTopK(topK) {
  if (topK === undefined || topK === null || topK === '') {
    return ragTopK;
  }

  const parsed = Number(topK);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new AppError('topK must be a positive integer', 400);
  }

  return parsed;
}

async function queryRagPipeline({ query, topK }) {
  if (!query || !query.trim()) {
    throw new AppError('Message is required for chat queries', 400);
  }

  let response;
  try {
    response = await fetch(`${ragApiBaseUrl}/api/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_k: parseTopK(topK),
      }),
    });
  } catch (error) {
    throw new AppError('Unable to reach RAG service', 502, { reason: error.message });
  }

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    throw new AppError('RAG service returned an invalid response format', 502);
  }

  if (!response.ok) {
    throw new AppError('RAG service returned an error', response.status || 502, responseData);
  }

  return responseData;
}

module.exports = {
  buildUploadedFiles,
  createChatPayload,
  createChatPayloadFromRag,
  queryRagPipeline,
};
