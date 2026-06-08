const express = require('express');
const router = express.Router();

const { createWorkspace, deleteWorkspace } = require('../controllers/workspaceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, createWorkspace);
router.delete('/:id', protect, authorizeRoles('admin'), deleteWorkspace);

module.exports = router;