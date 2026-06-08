const Channel = require('../models/Channel');
const Workspace = require('../models/Workspace');


const createChannel = async (req, res) => {
    try {
        const { name, description, workspaceId } = req.body;

        
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        
        const channel = await Channel.create({
            name,
            description,
            workspace: workspaceId,
            createdBy: req.user._id,
        });

        res.status(201).json(channel);
    } catch (error) {
        console.error(`Error in createChannel: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getChannels = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        
        
        const channels = await Channel.find({ workspace: workspaceId });
        
        res.status(200).json(channels);
    } catch (error) {
        console.error(`Error in getChannels: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createChannel, getChannels };