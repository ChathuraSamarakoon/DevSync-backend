const Workspace = require('../models/Workspace');

const createWorkspace = async (req, res) => {
    try {
        const { name } = req.body;
        
        
        const workspace = await Workspace.create({
            name,
            owner: req.user._id,
            members: [req.user._id],
        });

        res.status(201).json(workspace);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createWorkspace };