const User = require('../models/User');


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            
            user.name = req.body.name || user.name;
            user.title = req.body.title !== undefined ? req.body.title : user.title;
            user.status = req.body.status || user.status;
            
            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                title: updatedUser.title,
                status: updatedUser.status,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(`Error in updateUserProfile: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getUserProfile, updateUserProfile };