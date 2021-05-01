const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {signupHandler,loginHandler} = require('../../controllers/main/auth');

router.post('/signup',[
    check("name", "name should be at least 3 char").isLength({ min: 4 }),
    check("email", "Please provide a valid email").isEmail(),
    check("plainPassword", "password should be at least 5 character long").isLength({ min: 5 })
    ],signupHandler);

router.post('/login',loginHandler);
module.exports = router; 