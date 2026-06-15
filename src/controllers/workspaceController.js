const Workspace = require('../models/Workspace');


const getWorkspaces = async (req, res) => {
    try {

        const workspaces = await Workspace.find(); 
        
        res.status(200).json(workspaces);
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        res.status(500).json({ message: "Server error fetching workspaces" });
    }
};

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

const deleteWorkspace = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        await workspace.deleteOne();
        res.status(200).json({ message: 'Workspace removed successfully' });
    } catch (error) {
        console.error(`Error in deleteWorkspace: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { createWorkspace, deleteWorkspace, getWorkspaces };