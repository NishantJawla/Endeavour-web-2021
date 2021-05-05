//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {registerEvent} = require('../../controllers/main/user');


router.post("/register/:eventId", passport.authenticate('jwt',{session: false}), registerEvent);

module.exports = router;