//Dependecies
//jshint esversion:8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler} = require('../../controllers/main/auth');
const {getUserById,isProfileCompleteHandler} = require('../../controllers/main/user');
const {createEventHandler,getEventHandler} = require('../../controllers/main/event');
//params
router.param("userId",getUserById);


//routes

router.post('/createEvent',[check('price')
                            .notEmpty()
                            .withMessage("Price cannot be empty")
                            .isNumeric()
                            .withMessage('price is not numeric'),
                            check('membersCount')
                            .notEmpty()
                            .withMessage("Member Count cannot be empty")
                            .isNumeric()
                            .withMessage('Member Count is not numeric'),
                            check('eventName')
                            .notEmpty()
                            .withMessage("Event name can not be empty")],
passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',})
,isAdmin
,createEventHandler);

router.get('/getEvent/:eventId',isProfileCompleteHandler,getEventHandler);

module.exports = router; 