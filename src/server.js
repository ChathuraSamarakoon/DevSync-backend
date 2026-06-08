const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io'); 
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); 
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});


app.use(helmet({ crossOriginResourcePolicy: false })); 
app.use(cors()); 
app.use(express.json()); 


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workspaces', require('./routes/workspaceRoutes'));
app.use('/api/channels', require('./routes/channelRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes')); 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to DevSync API!',
        status: 'Server is running smoothly'
    });
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join_channel', (channelId) => {
        socket.join(channelId);
        console.log(`User joined channel: ${channelId}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`DevSync Server is running on port ${PORT}`);
});