//Dependecies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler} = require('../../controllers/main/auth');
const {getUserById} = require('../../controllers/main/user');
const {createEventHandler} = require('../../controllers/main/event');
//params
router.param("userId",getUserById);


//routes

router.post('/admin/createEvent',[check('price','price is not numeric').isNumeric()],
passport.authenticate('jwt',{session: false})
,isAdmin
,createEventHandler);

module.exports = router; 