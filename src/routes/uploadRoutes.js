const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

   
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({ 
        message: 'File uploaded successfully',
        url: fileUrl, 
        filename: req.file.originalname 
    });
});

module.exports = router;