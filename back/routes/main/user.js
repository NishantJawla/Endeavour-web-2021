//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport);

//imported variables

const {registerEvent, addTeamMember, removeTeamMember, unregisterEvent, changePasswordHandler,contactUsTwoHandler,contactUsOneHandler,updateProfileHandler, getUserHandler} = require('../../controllers/main/user');

router.post("/contactUs",[
    check("contactUserName")
    .isLength({ min: 4 })
    .withMessage("name should be at least 3 char"),
    check("contactEmail", "Please provide a valid email").isEmail(),
    check("contactContent")
    .isLength({
        min: 20
    })
    .withMessage("Content Should be atleast 20 character long")
    ],contactUsOneHandler,contactUsTwoHandler);

router.post("/register/:eventId", passport.authenticate('jwt',{session: false}), registerEvent);

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
        ], passport.authenticate('jwt', {session: false}), addTeamMember);

router.post("/removeTeamMember/:teamId/:memberId", passport.authenticate('jwt', {session: false}), removeTeamMember);

router.post("/unregister/:teamId", passport.authenticate('jwt', {session: false}), unregisterEvent);

router.post("/changePassword",[
    check("plainPassword", "new password should be at least 5 character long")
    .isLength({ min: 5 }),
    check("oldPassword", "old password should be at least 5 character long")
    .isLength({ min: 5 })]
    ,passport.authenticate('jwt',{session: false}),changePasswordHandler);

router.post("/updateProfile",[
    check("branch")
    .notEmpty()
    .withMessage("Branch Field is Required"),
    check("univRollno")
    .notEmpty()
    .withMessage("University Rollno Field is Required"),
    check("college")
    .notEmpty()
    .withMessage("College Name is Required"),
    check("semester")
    .notEmpty()
    .withMessage("Semester is Required")
    .isNumeric()
    .withMessage("Semester must be a number"),
    check("discord")
    .notEmpty()
    .withMessage("Discord Id Field is Required")
],passport.authenticate('jwt', {session: false}),updateProfileHandler);

router.get("/getUser",passport.authenticate('jwt', {session: false}),getUserHandler)
module.exports = router;