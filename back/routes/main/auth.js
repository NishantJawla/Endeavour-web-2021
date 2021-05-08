//Dependecies
//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler,forgotPasswordHandler,resetPasswordHandler} = require('../../controllers/main/auth');
const {registerEvent} = require('../../controllers/main/event');
const {getUserById} = require('../../controllers/main/user');


//params
router.param("userId",getUserById);


//routes


// Public Post notprotected
// to get signup details of the user
router.post('/signup',[
    check("name")
    .isLength({ min: 4 })
    .withMessage("Name should be at least 3 char")
    .notEmpty()
    .withMessage("Name Field is Required"),
    check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email Field is Required"),
    check("phoneNumber")
    .isLength({ min: 10,max:10 })
    .withMessage("Phone number should be 10 char long")
    .isNumeric()
    .withMessage("Phone number should be numeric")
    .notEmpty()
    .withMessage("Phone Number Field is required"),
    check("plainPassword")
    .isLength({ min: 5 })
    .withMessage( "Password should be at least 5 character long")
    .notEmpty()
    .withMessage("Password Field is Required")
    ],signupHandler);


// Private Get notprotected
// To get the user to sign out
router.get("/signout", signoutHandler);

//public post  not protected
// to allow user to login
router.post('/login',[
    check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email Field is Required"),
    check("plainPassword", "password should be at least 5 character long")
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("Password Field is Required")
],loginHandler);


//Private get notprotected
// to allow email confiramtion
router.get('/confirmation/:uniqueString',confirmUserHandler);

//private get protected 
//to redirect a user to admin panel
router.get('/admin',passport.authenticate('jwt',{session: false}),isAdmin,adminHandler);

router.get('/secure', passport.authenticate('jwt',{session: false}),  (req, res) => {
    res.json({
        username: req.user.name
    });
});



router.post('/forgotpassword',[
    check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email Field is Required")],forgotPasswordHandler);
    
router.post('/resetpassword/:uniqueString',[
    check("plainPassword")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 character long")
    .notEmpty()
    .withMessage("Password Field is Required")],resetPasswordHandler);
    
module.exports = router; 