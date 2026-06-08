const Message = require('../models/Message');
const Channel = require('../models/Channel');

const sendMessage = async (req, res) => {
    try {
        const { channelId, content, attachment } = req.body; 

        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        const message = await Message.create({
            sender: req.user._id,
            channel: channelId,
            content: content || '', 
            attachment: attachment || null, 
        });

        const populatedMessage = await message.populate('sender', 'name avatar role status');

        req.io.to(channelId).emit('new_message', populatedMessage);
        
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error(`Error in sendMessage: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;

        const messages = await Message.find({ channel: channelId })
            .populate('sender', 'name avatar role status')
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error in getMessages: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this message' });
        }

        message.content = content;
        const updatedMessage = await message.save();

        const populatedMessage = await updatedMessage.populate('sender', 'name avatar role status');

        
        req.io.to(message.channel.toString()).emit('message_edited', populatedMessage);

        res.status(200).json(populatedMessage);
    } catch (error) {
        console.error(`Error in editMessage: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this message' });
        }

        const channelId = message.channel.toString();

        await message.deleteOne();

        
        req.io.to(channelId).emit('message_deleted', id);

        res.status(200).json({ message: 'Message removed successfully', id });
    } catch (error) {
        console.error(`Error in deleteMessage: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { sendMessage, getMessages, editMessage, deleteMessage };