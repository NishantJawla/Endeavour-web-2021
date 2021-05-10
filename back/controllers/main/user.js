//jshint esversion: 8
//dependecy
const bcrypt = require('bcrypt')
const saltRounds = 10;
require('dotenv').config();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
//imports
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');
const user = require('../../models/user');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                status: 400,
                msg: "No user was found in db"
            });
        }
        req.extractedUser =  user;
        next();
    });
} 

exports.registerEvent = async (req, res) => {
    let user1 = await User.findOne({_id: req.user._id});
    // console.log(user1.registerd);
    if(!user1){
        return res.json({
            status: 404,
            msg: "User not found"
        })
    }
    user1.registerd.forEach(team => {
        if(team.event.toString() === req.params.eventId){
            res.json({
                status: 401,
                msg: "User already registed"
            });
        }
    });
    const data = {
        event: req.params.eventId,
        leader: req.user._id,
        teamMembers: []
    };
    data.teamMembers.push(user1._id.toString());
    const team = new Team(data);
    team.save();
    user1.registerd.push({
        teams: team._id,
        event: req.params.eventId
    });
    user1.save();
    res.json({
        status: 200,
        msg: "User successfully added"
    });

};


exports.addTeamMember = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            status: 500,
            location: '/controllers/main/auth.js',
            error: errors.array()[0].msg
        });
    }
    const team = await Team.findOne({_id: req.params.teamId});
    const user = await User.findOne({endvrid: req.body.newMember});
    const event = await Event.findOne({_id: team.event});
    if(!user){
        return res.json({
            status: 404,
            msg: "User not found"
        })
    }
    if(!team)  {
        return res.json({
            status: 404,
            msg: "Team not found"
        })
    }
    if(!event)  {
        return res.json({
            status: 404,
            msg: "Event not found"
        })
    }
    if(team.leader.toString() !== req.user._id.toString()){
        return res.json({
            status: 403,
            msg: "The Leader can only change team"
        });
    }else{
        let c = 1;
        user.registerd.forEach(item => {
            if(item.teams.toString() === req.params.teamId){
                c = 0;
                return res.json({
                    status: 400,
                    msg: "Member is already present in the team"
                });
            }
            else if(item.event.toString() === team.event.toString()){
                c = 0;
                return res.json({
                    status: 400,
                    msg: "User is already registered in another team for the same event"
                });
            }
        });
        if(c){
            if(team.teamMembers.length.toString() === event.membersCount.toString()){
                return res.json({
                    status: 403,
                    msg: "Max no of Participants exceeded"
                });
            } else{
                team.teamMembers.push(user._id.toString());
                user.registerd.push({
                    teams: req.params.teamId,
                    event: team._id
                });
                user.save();
                team.save();
                return res.json({
                    status: 200,
                    msg: "Team member added successfully"
                });
            }
        }
        
    }
    
};

exports.removeTeamMember = async (req, res) => {
    const user = await User.findOne({_id: req.params.memberId});
    const team = await Team.findOne({_id: req.params.teamId});
    if(team.leader.toString() !== req.user._id.toString()){
        res.json({
            status: 403,
            msg: "The Leader can only change team"
        });
    } else {
        const tmembers = [];
        team.teamMembers.forEach(item => {
            if(item.toString() !== req.params.memberId.toString()){
                tmembers.push(item);
            }
        });
        team.teamMembers = tmembers;
        team.save();
        //remove event from the user;
        const events = [];
        user.registerd.forEach(item => {
            if(item.teams.toString() !== req.params.teamId){
                events.push(item);
            }
        });
        user.registerd = events;
        user.save();
        res.json({
            status: 200,
            msg: "Member removed Successfully"
        });
    }
};

exports.unregisterEvent = async (req, res) => {
    const team = await Team.findOne({_id: req.params.teamId});
    if(!team){
        return res.json({
            status: 404,
            msg: "Team not found"
        })
    }
    if(team.leader.toString() !== req.user._id.toString()){
        res.json({
            status: 403,
            msg: "Only leader can unregister the whole team"
        });
    }
    //removing event from the list of registred events for all the members of team
    team.teamMembers.forEach(async (member) => {
        const tevents = [];
        const user = await User.findOne({_id: member});
        user.registerd.forEach(item => {
            if(item.teams.toString() !== req.params.teamId){
                tevents.push(item);
            }
        });
        user.registerd = tevents;
        user.save();
    });
    //delete team from the database
    Team.findOneAndDelete({_id: req.params.teamId}, (err) => {
        if(err){
            res.json({
                status: 500,
                msg: "Not able to delete the requested user",
                msg: err
            });
        } else {
            res.json({
                status: 200,
                msg: "Unregisted Successfully"
            });
        }
    });
};

exports.getAllUsersHandler = (req, res) => {
    User.find()
    .exec((err,users)=> {
        if(err){
            return res.status(400).json({
                status: 400,
                msg: "seeing all user is causing problems",
            })
        }
        res.json(users);
    })
}

exports.changePasswordHandler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            status: 500,
            location: '/controllers/main/auth.js',
            error: errors.array()[0].msg
        });
    }
    const user = User.findById(req.user._id).exec((err,user) => {
        if(err || !user){
            return res.json({
                status: 500,
                msg: "failed to change password!"
            })
        }
        bcrypt.compare(req.body.oldPassword, user.encryptedPassword, function(err, result){
            if(result == true){
                bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
                    user.encryptedPassword = hash
                    user.save((err,user) => {
                        if(err){
                        return res.json({
                                location: '/controllers/main/auth.js',
                                msg: 'Failed to save user',
                                err
                            })
                        }
                    return res.json({
                        msg: "Passwords succesfully changed"
                        })
                    })
                })
            }else{
                res.json({
                    msg: "old password is wrong"
                })
            }
        })
    })
}

exports.contactUsOneHandler = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 400,
            msg: errors.array()[0].msg,
            error: errors.array()[0].msg
        })
    }
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
                    },
        });
        let info = await transporter.sendMail({
        from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
        to: req.body.contactEmail, 
        subject: "Contact Us Succesfull", 
        text: "Hi it's a contact us succefull mail", 
        html: `<b>Hello ${req.body.contactUserName}</b><br>
        Your concern have been recieved. We will send a response to you soon!
        <br>Regards:<br> Team e-Cell`, 
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error)
    next()
    
}

exports.contactUsTwoHandler = (req,res) => {
    
        async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                        },
            });
            let info = await transporter.sendMail({
            from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
            to: process.env.GMAIL_USER, 
            subject: "Someone Used Contact Us", 
            text: "Hi it's a contact us form", 
            html: `
            <b> Hey! admin there is a person that want to hear from you!</b> <br>
            <br>Sent by: ${req.body.contactUserName}<br><br>
            senders mail : ${req.body.contactEmail}<br>
            subject: ${req.body.contactSubject}<br>
            content : ${req.body.contactContent}<br>
            <b>Contact him soon! because customer satisfaction is really important</b>
            `, 
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
    res.status(200).json({
        status: 200,
        msg: "succefully contacted us"
    })

}

exports.updateProfileHandler = (req,res) => {
    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 400,
            msg: errors.array()[0].msg,
            error: errors.array()[0].msg
        })
    }
    User.findById(req.user._id).exec((err,user)=> {
        if(err || !user){
            
            if(err){
                return res.status(500).json({
                    status:500,
                    msg: "Server Error",
                    error: "Server Error"
                })
            }else{
                return res.status(400).json({
                    status:400,
                    msg: "User Not found!",
                    error: "User Not found!"
                })
            }
        }
        else{
            user.semester = req.body.semester
            user.college = req.body.college
            user.branch = req.body.branch
            user.libId = req.body.libId
            user.discord = req.body.discord
            user.profile = true
            user.save((err,user)=>{
                if(err) {
                    if(err.keyPattern.discord === 1){
                        return res.json({
                            status: 400,
                            msg: 'User with this discord id already exist!',
                            error: 'User with this discord id already exist!'
                        })
                    }
                    return res.status(500).json({
                        status:500,
                        msg: "Server Error",
                        error: "Server Error"
                    })
                }
                return res.status(200).json({
                    status: 200,
                    msg: "Profile Updated Succesfully",
                })
            })
            
        }
    })
}

exports.getUserHandler = (req, res) => {
    let messenger = req.user
    messenger.encryptedPassword = undefined
    messenger.uniqueString = undefined
    messenger.resetPassword = undefined
    res.status(200).json(messenger)
}

exports.isProfileCompleteHandler = (req, res,next) => {
    User.findById(req.user._id).exec((err, user) => {
        if(err || !user){
            if(err){
            return res.status(500).json({
                    status:500,
                    msg:"Server error",
                    error: "Server Error"
                })
            }
            return res.status(404).json({
                status:404,
                msg: "User not found",
                error: "User Not found!"
            })
        }
        if(user.profile.toString() !== true.toString()){
            return res.status(400).json({
                status: 400,
                msg: "Please Complete Profile",
                error: "Please Complete Profile!"
            })
        }else{
            next()
        }
        
    })
}