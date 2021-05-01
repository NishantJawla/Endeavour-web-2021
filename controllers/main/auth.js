const User = require('../../models/user');
const bcrypt = require('bcrypt')
const saltRounds = 10;
exports.signupHandler = (req,res)=>{
    bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
        const user = new User(req.body);
        user.encryptedPassword = hash
    user.save((err,user) => {
        if(err){
        return res.json({
                location: '/controllers/main/auth.js',
                msg: err.message,
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