const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, editMessage, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, sendMessage);
router.get('/:channelId', protect, getMessages);


router.put('/:id', protect, editMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;