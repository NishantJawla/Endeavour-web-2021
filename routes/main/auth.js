const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {signupHandler,loginHandler,getUserById,confirmUserHandler,signoutHandler} = require('../../controllers/main/auth');
router.param("userId",getUserById);
router.post('/signup',[
    check("name", "name should be at least 3 char").isLength({ min: 4 }),
    check("email", "Please provide a valid email").isEmail(),
    check("plainPassword", "password should be at least 5 character long").isLength({ min: 5 })
    ],signupHandler);
router.get("/signout", signoutHandler);
router.post('/login',loginHandler);
router.get('/confirmation/:userId',confirmUserHandler);
module.exports = router; 