const User = require('../../models/user')
exports.signupHandler = (req,res)=>{
    const user = new User(req.body);
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
            id: user._id
        })
    });
}