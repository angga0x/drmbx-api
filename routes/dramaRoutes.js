const express = require('express');
const router = express.Router();
const dramaController = require('../controllers/dramaController');
const authMiddleware = require('../middleware/auth');

router.post('/download', authMiddleware, dramaController.downloadDrama);

module.exports = router;
