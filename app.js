//packages
const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//data base connection
mongoose.connect(process.env.db, 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Database is connected')
                }).catch(err => {
                                console.log(err)
                                });
//Predefined controllers/middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
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
