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
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createTask };