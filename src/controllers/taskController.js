const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { title, description, workspaceId } = req.body;

        const task = await Task.create({
            title,
            description,
            workspace: workspaceId,
            createdBy: req.user._id,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(`Error in createTask: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getTasks = async (req, res) => {
    try {
        const { workspaceId } = req.params; 
        
       
        const tasks = await Task.find({ workspace: workspaceId });
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error(`Error in getTasks: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { 
    createTask, 
    getTasks 
};