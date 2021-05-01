const User = require('../../models/user');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { check, validationResult } = require("express-validator");
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
                    msg: 'email already in use',
                    err
                })
            }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
                password: user.encryptedPassword
            })
        });
        });
    })
    
}

exports.loginHandler = (req,res) =>{
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            bcrypt.compare(req.body.plainPassword, user.encryptedPassword, function(err, result) {
                if(result != true){
                    return res.json({
                        location: 'contorllers/main/auth/loginhandler',
                        message: 'Password is not correct',
                        err
                    })
                }
                res.json({
                    name: user.name,
                    message: 'User succesfully login!'
                })
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