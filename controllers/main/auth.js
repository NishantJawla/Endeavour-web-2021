//dependecy
const bcrypt = require('bcrypt')
require('dotenv').config();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");
const passport = require('passport');


//imported 
const User = require('../../models/user');


//exports
exports.signupHandler = (req,res)=>{
    const errors = validationResult(req);

if (!errors.isEmpty()) {
    return res.status(402).json({
        location: '/controllers/main/auth.js',
        error: errors.array()[0].msg
    });
}
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                location: '/controllers/main/auth',
                message: 'User with this email already exist!'
            })
        }
        bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
            const user = new User(req.body);
            user.encryptedPassword = hash
        user.save((err,user) => {
            if(err){
            return res.json({
                    location: '/controllers/main/auth.js',
                    msg: 'Failed to save user',
                    err
                })
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            
        async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                        },
            });
            const url = `http://localhost:7000/main/confirmation/${user._id}`;
            let info = await transporter.sendMail({
            from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
            to: req.body.email, 
            subject: "Verification email", 
            text: "Hi it's a verification email", 
            html: `<b>Hello ${req.body.name}</b><br>
            Please click this email to confirm your email: <a href="${url}">${url}</a>`, 
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        
            res.json({
                name: user.name,
                email: user.email,
                id: user._id
            })
        });
        });
    })
    
}

exports.loginHandler = (req,res) =>{
    const errors = validationResult(req);

if (!errors.isEmpty()) {
    return res.status(402).json({
        location: '/controllers/main/auth.js login handler',
        error: errors.array()[0].msg
    });
}
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            if(user.confirmed == false){
                return res.json({
                    location: '/controllers/main/auth.js login handler',
                    message: 'Please validate your email'
                })
            }
            bcrypt.compare(req.body.plainPassword, user.encryptedPassword, function(err, result) {
                if(result != true){
                    return res.json({
                        location: 'contorllers/main/auth/loginhandler',
                        message: 'Password is not correct',
                        err
                    })
                }else{
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload,
                        process.env.SECRET,
                        {expiresIn : 3600},
                        (err,token) => {
                            const { _id, name, email, role } = user;
                            return res.json({
                                status: 'success',
                                token: 'Bearer '+token,
                                user: { _id, name, email, role },
                                message: 'User succesfully login!'
                            })
                        })
                }
            });
        }
        else{
            res.status(404).json({
                location: 'contorllers/main/auth/loginhandler',
                message: 'User is not available Please check login details',
                err
            })
        }
    })
}

exports.confirmUserHandler = (req,res) => {
    const user = req.extractedUser;
    user.confirmed = true
    user.endvrid = 'ENDVR2021'+user.phoneNumber
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                errors: "Failed to update category",
                error: err.message
            })
        }
        return res.json(user);
    })
}

exports.signoutHandler = (req, res) => {
    req.logout();
    res.json({
    message: "User signout"
    });
};

exports.isAdmin = (req, res,next) => {
    if(req.user.role ===  'user' ){
    return res.status(403).json({
        error : "You are not admin, Access Denied"
    })
    }
next();
}
exports.adminHandler = (req,res) => {
    res.json({
        message: 'welcome admin'
    })
}



