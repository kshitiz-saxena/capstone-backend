const path = require('path');
require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  ragApiBaseUrl: process.env.RAG_API_BASE_URL || 'http://localhost:8001',
  ragTopK: Number(process.env.RAG_TOP_K || 1),
  uploadDir: path.join(__dirname, '../uploads'),
  maxUploadSize: 5 * 1024 * 1024,
};
