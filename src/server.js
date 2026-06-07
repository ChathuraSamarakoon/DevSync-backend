const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();


const app = express();


app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to DevSync API!',
        status: 'Server is running smoothly'
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`DevSync Server is running on port ${PORT}`);
});