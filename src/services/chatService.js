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

module.exports = {
  buildUploadedFiles,
  createChatPayload,
};
