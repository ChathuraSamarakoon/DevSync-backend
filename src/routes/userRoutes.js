const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUsers } = require('../controllers/userController'); // getUsers එක import කරගන්න
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUsers); 

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;