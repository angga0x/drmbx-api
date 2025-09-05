const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');

router.get('/:username', apiKeyController.getApiKey);
router.post('/:username/regenerate', apiKeyController.regenerateApiKey);
router.get('/:username/view', apiKeyController.viewApiKey);

module.exports = router;
