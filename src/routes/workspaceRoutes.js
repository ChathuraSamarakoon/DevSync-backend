const express = require('express');
const router = express.Router();

const { createWorkspace, deleteWorkspace, getWorkspaces } = require('../controllers/workspaceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, getWorkspaces);

router.post('/', protect, createWorkspace);
router.delete('/:id', protect, authorizeRoles('admin'), deleteWorkspace);

module.exports = router;