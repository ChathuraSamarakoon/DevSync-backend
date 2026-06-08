const express = require('express');
const router = express.Router();
const { createChannel, getChannels } = require('../controllers/channelController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, createChannel);

router.get('/:workspaceId', protect, getChannels);

module.exports = router;