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
    
}