//packages
const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
//importing self made routes and controllers
const authRoutes = require('./routes/main/auth');
//Routes
app.use('/main',authRoutes);
app.get('/', (req, res) =>{
    res.send('Welcome to the homepage!!');
})
//port connection
app.listen(port,(req, res) => {
    console.log(`The website is running at ${port}`);
})