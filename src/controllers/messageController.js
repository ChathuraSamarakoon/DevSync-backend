const Message = require('../models/Message');
const Channel = require('../models/Channel');

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { channelId, content } = req.body;

        // Channel එක ඇත්තටම තියෙනවද කියලා බලනවා
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Message එක save කරනවා
        const message = await Message.create({
            sender: req.user._id,
            channel: channelId,
            content,
        });

        // පණිවිඩය යවපු කෙනාගේ නම වගේ විස්තරත් එක්කම response එක යවනවා (populate)
        const populatedMessage = await message.populate('sender', 'name avatar role status');

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

module.exports = { sendMessage, getMessages };