//dependecy
//jshint esversion: 8
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
    return res.status(400).json({
        status: 400,
        msg: errors.array()[0].msg,
        error: errors.array()[0].msg
    });
}

    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                status: 400,
                msg: 'User with this email already exist!',
                error: 'User with this email already exist!',
                resCode: '109'
            })
        }
        bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
            const user = new User(req.body);
            user.encryptedPassword = hash;
            
                const randString = () => {
                    const len = 64
                    let randStr = ''
                    for(let i = 0; i<len; i++){
                        const ch = Math.floor((Math.random()*10)+1)
                        randStr += ch
                    }
                    return randStr;
                }
                const uniqueString = randString()
                user.uniqueString = uniqueString
            
        user.save((err,user) => {
            if(err){
                if(err.keyPattern.phoneNumber === 1){
                    return res.status(400).json({
                        status: 400,
                        msg: 'User with this Phone Number already exist!',
                        error: 'User with this Phone Number already exist!'
                    })
                }
            return res.status(400).json({
                    status: 400,
                    msg: 'Failed to save user',
                    error: 'Failed to save user'
                })
            }
            
            
        async function main() {
            
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });
            const url = `http://localhost:7000/main/auth/confirmation/${user.uniqueString}`;
            let info = await transporter.sendMail({
            from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
            to: req.body.email, 
            subject: "Verification email", 
            text: "Hi it's a verification email", 
            html: `
            <b>Hey! ${req.body.name}</b>,<br>You are one step closer to successfully register for endeavour'21. Simply click <a href="${url}">here</a> to verify your email address.<br>
            If any queries, please contact :<br>(ecellwebtechnical@gmail.com)<br>Regards<br>Team e-Cell
            `, });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(err => {
            return res.status(500).json({
                    status: 500,
                    msg: 'Server Failure',
                    error: 'Server Failure'
            })
        });
        
            res.status(200).json({
                status:200,
                msg: "User Created Succesfully"
            });
        });
        });
    });
    
}

exports.loginHandler = (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            msg: errors.array()[0].msg,
            error: errors.array()[0].msg
        });
    }
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                status: 400,
                msg: 'User with this email does not exist',
                error: 'User with this email does not exist',
            })
        }
        if(user){
            if(user.confirmed == false){
                return res
                    .status(400)
                    .json({
                        status: 400,
                        msg: 'Please validate your email',
                        error: 'Please validate your email',
                        resCode: '101'
                    });
            }
            bcrypt.compare(req.body.plainPassword, user.encryptedPassword, function(err, result) {
                if(result != true){
                    return res.status(400).json({
                        status: 400,
                        msg: 'Please Enter correct Password',
                        error: 'Please Enter correct Password'
                    });
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
                            const { _id, name, email, role, phoneNumber, evdvrid, college, branch, registerd, univRollno, profile } = user;
                            return res.status(200).json({
                                status: 200,
                                token: 'Bearer '+token,
                                user: { _id, name, email, role, phoneNumber, evdvrid, college, branch, registerd, univRollno, profile },
                                msg: 'User succesfully loggedin!'
                            });
                        });
                }
            });
        }
    })
}

exports.confirmUserHandler = (req,res) => {
    const {uniqueString} = req.params
    User.findOne({ uniqueString: uniqueString}).exec((err,user) => {
        if(err || !user){
        return res.status(400).send("Unable to find user")
        }
        user.confirmed = true;
        user.endvrid = 'ENDVR2021'+user.phoneNumber.toString();
        user.uniqueString = undefined
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    msg: "Failed to update category",
                    error: err.message
                })
            }
            return res.status(200).send("E-Mail Verified Succesfully");
        })
    })
}

exports.signoutHandler = (req, res) => {
    req.logout();
    return res.status(200).json({
        status: 200,
        msg: "User signout successfully"
    });
};

exports.isAdmin = (req, res,next) => {
    if(req.user.role !==  'superman' ){
        return res.status(403).json({
            status: 403,
            msg : "You are not admin, Access Denied"
        });
    }
next();
}

exports.adminHandler = (req,res) => {
    return res.status(200).json({
        status: 200,
        msg: 'welcome admin'
    });
};

exports.forgotPasswordHandler = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            msg: errors.array()[0].msg,
            error: errors.array()[0].msg
        });
    }
    User.findOne({email: req.body.email}).exec((err,user)=> {
        if(err || !user){
            if(err){
                return res.status(500).json({
                    status: 500,
                    'msg': "Server Error",
                    error: "Server Error"
                });
            }
            return res.status(400).json({
                status: 400,
                'msg': "User with this email do not exist",
                error: "User with this email do not exist"
            });
        }

        const randString = () => {
            const len = 64
            let randStr = ''
            for(let i = 0; i<len; i++){
                const ch = Math.floor((Math.random()*10)+1)
                randStr += ch
            }
            return randStr;
        }
        const uniqueString = randString()

        async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                        },
            });
            var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            user.resetPassword.passCode = seq;
            user.resetPassword.use = true;
            const url = `http://localhost:3000/resetpassword`;
            let info = await transporter.sendMail({
            from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
            to: req.body.email, 
            subject: "Forgot Password Support", 
            text: "it's a forgot password email", 
            html: `<b>Hello ${req.body.name}</b><br>Forgot your password? No worries!<br>
            To reset your password, <a href="${url}">click here</a>:<br> 
            pass code: ${user.resetPassword.passCode}<br>
            If any queries, please contact :<br>(ecellwebtechnical@gmail.com)<br>Regards<br>Team e-Cell
            `, 
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        user.save((err,user) => {
            if(err || !user){
                if(err){
                    return res.status(400).json({
                        status: 500,
                        'msg': "Server Error",
                        error: "Server Error"
                    });
                }
                return res.status(400).json({
                    status: 400,
                    'msg': "User with this email do not exist",
                    error: "User with this email do not exist"
                });
            }
            return res.json({
                status: 200,
                msg: "Password reset request Generated. Please check your registed mail id"
            });
        });
        }
        main().catch(err => {
            return res.status(500).json({
                status: 500,
                msg: "Server Error",
                error: "Server Error"
            })
        });
    });
    
};

exports.resetPasswordHandler = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            msg: errors.array()[0].msg,
            error: errors.array()[0].msg
        });
    }
    User.findOne({
        email: req.params.uniqueString
    }).exec((err,user)=> {
        if(err || !user){
            if(err){
                return res.status(500).json({
                    status: 500,
                    msg: "Server Error",
                    error: "Server Error",
                    resCode: "102"
                })
            }
            return res.status(400).json({
                msg: "unable to find user",
                error: "unable to find user",
                resCode: "102"
            })
        }
        if(user.resetPassword.use !== true){
            user.resetPassword = undefined;
            user.uniqueString = undefined;
            user.save((err, user) => {
                if(err || !user) {
                    if(err){
                        return res.status(500).json({
                            status: 500,
                            msg: "Server Error",
                            error: "Server Error",
                            resCode: "102"
                        })
                    }
                    return res.status(400).json({
                        msg: "unable to find user",
                        error: "unable to find user",
                        resCode: "102"
                    })
                }
                return res.status(400).json({
                    status: 400,
                    msg: "passcode has been expired use forgot password again",
                    error: "use forgot password again use forgot password again"
                })
            });
            
        }
        
        if(parseInt(req.body.passCode) !== parseInt(user.resetPassword.passCode)){
            user.resetPassword = undefined;
            user.uniqueString = undefined;
            user.save((err, user) => {
                if(err || !user){
                    if(err){
                        return res.status(500).json({
                            status: 500,
                            msg: "Server Error",
                            error: "Server Error",
                        })
                    }
                    return res.status(400).json({
                        msg: "unable to find user",
                        error: "unable to find user",
                    })
                }
                return res.status(400).json({
                    status: 400,
                    msg: "Passcode doesnot match use forgot password again",
                    error: "use forgot password again use forgot password again"
                })
            });
            
        }
        bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
            console.log("changing password")
            user.encryptedPassword = hash;
            user.resetPassword = undefined;
            user.uniqueString = undefined;

            async function main() {
            
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });
                const url = `http://localhost:7000/main/auth/confirmation/${user.uniqueString}`;
                let info = await transporter.sendMail({
                from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
                to: user.email, 
                subject: "Password Change Alert!", 
                text: "Hi it's a password change mail", 
                html: `
                <b>Hey! ${user.name}</b>,<br>
                This is a confirmation that the password for your Endeavour account ${user.endvrid} has just been changed.<br>
                If you didn't change your password, secure your account immediately.<br>    
                If you're having trouble, please write us back to :<br>(ecellwebtechnical@gmail.com)<br>Regards<br>Team e-Cell
                `, });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                user.save((err, user) => {
                    if(err || !user){
                        if(err){
                            return res.status(500).json({
                                status: 500,
                                msg: "Server Error",
                                error: "Server Error",
                            })
                        }
                        return res.status(400).json({
                            msg: "unable to find user",
                            error: "unable to find user",
                        })
                    }
                        return res.status(200).json({
                            status: 200,
                            msg: 'User password changed Successfully',
                        });
                    });
            }
            main().catch(err => {
                return res.status(500).json({
                        status: 500,
                        msg: 'Server Failure',
                        error: 'Server Failure'
                })
            });

            res.status(400).json({
                error: 'Internal Server Error'
            })

            
        });
    });
};