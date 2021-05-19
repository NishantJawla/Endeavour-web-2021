//Dependecies
//jshint esversion: 8
const express = require('express');
const router = express.Router();
const {getRegistrationsPerEvent, getUserCount, getUsersUsingEventId, getTeamHead, getTeamHeadAll, getUserFromEndvrId, getUserFromMobile, getAllUsersByPaidStatus,getEventScaleIdeaHandler,massMailInternshipHandler,adminConfrimUserByMailHandler, adminConfrimUserByPhoneNumberHandler,getuserbyemailAdminHandler} = require("./../../controllers/main/admin");
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport);

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler,forgotPasswordHandler,resetPasswordHandler} = require('../../controllers/main/auth');
const {registerEvent,addTeamToEventsHandler} = require('../../controllers/main/event');
const {getUserById,getAllUsersHandler} = require('../../controllers/main/user');
const {changePaidStatusHandler} = require('../../controllers/main/team');
//params
router.param("userId",getUserById);

//routes

router.get('/getAllUsers',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,getAllUsersHandler);

router.get("/api/registrationPerEvent", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getRegistrationsPerEvent);
router.get("/api/getUser/count", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getUserCount);
router.get("/api/getUsers/eventId/:eventId/:paidStatus", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getUsersUsingEventId);
router.get("/api/teamHead/:eventId/:paidStatus", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getTeamHead);
router.get("/api/teamHead/all/:paidStatus", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getTeamHeadAll);
router.get("/api/getUser/endvId/:endvrId", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getUserFromEndvrId);
router.get("/api/getUser/number/:number", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getUserFromMobile);
router.get("/api/getUser/all", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), isAdmin, getAllUsersByPaidStatus);
router.post('/changePaidStatus',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,changePaidStatusHandler,addTeamToEventsHandler);
router.get('/eventstatus',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,getEventScaleIdeaHandler);
router.get('/sendinternshipmails',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,massMailInternshipHandler);
router.post('/confirmuserbyemail',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,adminConfrimUserByMailHandler);
router.post('/confirmuserbyphone',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,adminConfrimUserByPhoneNumberHandler);
router.post('/getuserbyadmin',passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isAdmin,getuserbyemailAdminHandler);
module.exports = router; 