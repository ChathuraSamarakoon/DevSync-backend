const express = require('express');
const router = express.Router();
const { sendDirectMessage, getDirectMessages } = require('../controllers/directMessageController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, sendDirectMessage);

router.get('/:userId', protect, getDirectMessages);

module.exports = router;