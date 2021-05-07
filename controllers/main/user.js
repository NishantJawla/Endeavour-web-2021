//jshint esversion: 8
//dependecy
const bcrypt = require('bcrypt')
const saltRounds = 10;
require('dotenv').config();
const nodemailer = require("nodemailer");
//imports
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in db"
            });
        }
        req.extractedUser =  user;
        next();
    });
} 

exports.registerEvent = async (req, res) => {
    let user1 = await User.findOne({_id: req.user._id});
    // console.log(user1.registerd);
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
    const team = await Team.findOne({_id: req.params.teamId});
    const user = await User.findOne({endvrid: req.body.newMember});
    const event = await Event.findOne({_id: team.event});
    if(team.leader.toString() !== req.user._id.toString()){
        res.json({
            status: 403,
            msg: "The Leader can only change team"
        });
    }
    user.registerd.forEach(item => {
        if(item.teams.toString() === req.params.teamId){
            res.json({
                status: 400,
                msg: "Member is already present in the team"
            });
        }
        if(item.event.toString() === team.event.toString()){
            res.json({
                status: 400,
                msg: "User is already registered in another team for the same event"
            });
        }
    });
    if(team.teamMembers.length.toString() === event.membersCount.toString()){
        res.json({
            status: 403,
            msg: "Max no of Participants exceeded"
        });
    } else{
        team.teamMembers.push(user._id);
        user.registerd.push({
            teams: req.params.teamId,
            event: team._id
        });
        user.save();
        team.save();
        res.json({
            status: 200,
            msg: "Team member added successfully"
        });
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
                error: "seeing all user is causing problems",
            })
        }
        res.json(users);
    })
}

exports.changePasswordHandler = (req, res) => {
    const user = User.findById(req.user._id).exec((err,user) => {
        if(err || !user){
            return res.json({
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
        subject: "Verification email", 
        text: "Hi it's a verification email", 
        html: `<b>Hello</b><br>
        Your concern have been recieved`, 
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
            subject: "someone used contact us", 
            text: "Hi it's a contact us form", 
            html: `<b>Hello</b><br>
            send  by : ${req.body.contactEmail}</br>
            content : ${req.body.contactContent}
            `, 
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
    res.json({
        msg: "succefully contacted us"
    })

}