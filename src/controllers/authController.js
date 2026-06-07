const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: 'User registered successfully!'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error(`Error in registerUser: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });

        
        if (user && (await bcrypt.compare(password, user.password))) {
            
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token, 
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(`Error in loginUser: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};