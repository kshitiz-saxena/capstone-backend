const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { handleValidationErrors } = require('../lib/validation');
const { AppError } = require('../lib/errors');
const { requireAuth } = require('../middleware/auth');
const { uploadDir, maxUploadSize } = require('../config');
const { processChat } = require('../controllers/chatController');
const { chatValidator } = require('../validators/chatValidators');

const router = express.Router();

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxUploadSize,
    files: 3,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
      'text/csv',
      'image/png',
      'image/jpeg',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new AppError('Unsupported file type. Allowed types: PDF, DOC/DOCX, XLS/XLSX, TXT, CSV, JSON, PNG, JPG', 400));
    }

    cb(null, true);
  },
});

router.post('/chat', requireAuth, upload.array('files', 3), chatValidator, handleValidationErrors, processChat);

module.exports = router;
