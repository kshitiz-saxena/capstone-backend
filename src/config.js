const path = require('path');
require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadDir: path.join(__dirname, '../uploads'),
  maxUploadSize: 5 * 1024 * 1024,
};
