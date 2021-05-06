//Dependecies
//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler,forgotPasswordHandler,resetPasswordHandler} = require('../../controllers/main/auth');
const {registerEvent,addTeamToEventsHandler} = require('../../controllers/main/event');
const {getUserById,getAllUsersHandler} = require('../../controllers/main/user');
const {changePaidStatusHandler} = require('../../controllers/main/team');
//params
router.param("userId",getUserById);

//routes

router.get('/getAllUsers',passport.authenticate('jwt',{session: false}),isAdmin,getAllUsersHandler);
router.post('/changePaidStatus',passport.authenticate('jwt',{session: false}),isAdmin,changePaidStatusHandler,addTeamToEventsHandler);
module.exports = router; 