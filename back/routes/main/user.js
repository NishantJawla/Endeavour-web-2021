//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport);

//imported variables

const {registerEvent, checkUserEvent, checkUserTeam, addTeamMember, removeTeamMember, unregisterEvent, changePasswordHandler,contactUsTwoHandler,contactUsOneHandler,updateProfileHandler, getUserHandler, isRegisteredAndPaidMobileHandler, registerEventTwo, registerEventOne, registerInEvent} = require('../../controllers/main/user');

router.post("/contactUs",[
    check("contactUserName")
    .notEmpty()
    .withMessage("Name field is Required")
    .isLength({ min: 4 })
    .withMessage("name should be at least 4 char")
    .matches(/^[a-zA-Z_ ]*$/, "i")
    .withMessage("Name Field is inValid"),
    check("contactSubject")
    .notEmpty()
    .withMessage("Subject field is Required"),
    check("contactEmail")
    .notEmpty()
    .withMessage("Email field is Required")
    .isEmail()
    .withMessage("Please provide a valid email"),
    check("contactContent")
    .notEmpty()
    .withMessage("Message Field is Required")
    .isLength({
        min: 20
    })
    .withMessage("Content Should be atleast 20 character long")
    ],contactUsOneHandler,contactUsTwoHandler);

// router.post("/register/:eventId", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), registerEventOne,registerEventTwo);

router.post("/register/:eventId", passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}), registerInEvent);

router.post("/addTeamMember/:teamId",
            [check("newMember")
            .notEmpty()
            .withMessage("Invalid Endeavour id")
            .isAlphanumeric()
            .withMessage("Endvr id should be alpha numeric")
            .isLength({
                min:19,
                max:19
            })
            .withMessage("Endvr id should be 19 character long")
            .contains("ENDVR2021",{ ignoreCase: false})
            .withMessage("Endvr id should begin with ENDVR2021")
        ], passport.authenticate('jwt', {session: false,failureRedirect : '/failurejson',}), addTeamMember);

router.post("/removeTeamMember/:teamId/:memberId", passport.authenticate('jwt', {session: false}), removeTeamMember);

router.post("/unregister/:teamId", passport.authenticate('jwt', {session: false,failureRedirect : '/failurejson',}), unregisterEvent);

router.post("/changePassword",passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),[
    check("plainPassword", "new password should be at least 5 character long")
    .isLength({ min: 5 }),
    check("oldPassword", "old password should be at least 5 character long")
    .isLength({ min: 5 })]
    ,changePasswordHandler);

router.post("/updateProfile",[
    check("branch")
    .notEmpty()
    .withMessage("Branch Field is Required")
    .matches(/^[a-zA-Z_ ]*$/, "i")
    .withMessage("Branch Field is inValid"),
    check("college")
    .notEmpty()
    .withMessage("College Name is Required")
    .matches(/^[a-zA-Z_ ]*$/, "i")
    .withMessage("College Name Field is inValid"),
    check("semester")
    .notEmpty()
    .withMessage("Semester is Required")
    .isNumeric()
    .withMessage("Semester must be a number"),
    check("discord")
    .notEmpty()
    .withMessage("Discord Id Field is Required")
],passport.authenticate('jwt', {session: false,failureRedirect : '/failurejson',}),updateProfileHandler);

router.get("/getUser",passport.authenticate('jwt', {session: false, failureRedirect : '/failurejson',}),getUserHandler);

router.get("/checkUser/event/:eventId",passport.authenticate('jwt', {session: false, failureRedirect : '/failurejson',}), checkUserEvent);
router.get("/checkUser/team/:teamId",passport.authenticate('jwt', {session: false, failureRedirect : '/failurejson',}), checkUserTeam);

router.get("/registered/mobile/:eventId",passport.authenticate('jwt',{session: false,failureRedirect : '/failurejson',}),isRegisteredAndPaidMobileHandler);

module.exports = router;