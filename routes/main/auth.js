const express = require('express');
const router = express.Router();
const {signupHandler} = require('../../controllers/main/auth');
router.post('/signup',signupHandler);

module.exports = router; 