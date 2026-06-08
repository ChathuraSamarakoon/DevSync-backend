const DirectMessage = require('../models/DirectMessage');
const User = require('../models/User');


const sendDirectMessage = async (req, res) => {
    try {
        const { receiverId, content, attachment } = req.body;

        
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const message = await DirectMessage.create({
            sender: req.user._id,
            receiver: receiverId,
            content: content || '',
            attachment: attachment || null,
        });

        const populatedMessage = await message.populate('sender', 'name avatar role status');

        
        req.io.to(receiverId).emit('new_dm', populatedMessage);
        
        req.io.to(req.user._id.toString()).emit('new_dm', populatedMessage);

        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error(`Error in sendDirectMessage: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getDirectMessages = async (req, res) => {
    try {

        const { userId } = req.params;
        const myId = req.user._id;


        const messages = await DirectMessage.find({
            $or: [
                { sender: myId, receiver: userId },
                { sender: userId, receiver: myId }
            ]
        })
            .populate('sender', 'name avatar role status')
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error in getDirectMessages: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { sendDirectMessage, getDirectMessages };