const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
app.listen(port,(req, res) => {
    console.log(`The website is running at ${port}`);
})