const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();


app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workspaces', require('./routes/workspaceRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes')); 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/channels', require('./routes/channelRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to DevSync API!',
        status: 'Server is running smoothly'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 DevSync Server is running on port ${PORT}`);
});