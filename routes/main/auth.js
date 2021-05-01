const express = require('express');
const router = express.Router();
const {signupHandler} = require('../../controllers/main/auth');
router.get('/signup',signupHandler);

module.exports = router; 