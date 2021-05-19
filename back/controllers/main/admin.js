//jshint esversion: 8
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');
const team = require('../../models/team');
require('dotenv').config();
const nodemailer = require("nodemailer");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.getRegistrationsPerEvent = (req, res) => {
    Event.find({}, (error, events) => {
        if(error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                msg: 'Something Went Wrong',
                error: 'Something Went Wrong',
                resCode: '109'
            });
        } else {
            const data = [];
            events.forEach(event => {
                data.push({
                    eventName: event.eventName,
                    teamCountRegisterd: event.registered.length || 0,
                    teamCountPaid: event.paid.length || 0
                });
            });
            res.status(200).json({
                status: 200,
                registrationCount: data,
                msg: "Request Successful"
            });
        }
    });
};

exports.getUserCount = (req, res) => {
    User.find({}, (error, users) => {
        if(error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                msg: 'Something Went Wrong',
                error: 'Something Went Wrong',
                resCode: '109'
            });
        } else{
            if(users){
                res.status(200).json({
                    status: 200,
                    usersCount: users.length,
                    msg: "Request Successfull"
                });
            } else {
                res.status(200).json({
                    status: 200,
                    usersCount: 0,
                    msg: "Request Successfull"
                });
            }
        }
    });
};

exports.getUsersUsingEventId = (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                msg: 'Something Went Wrong',
                error: 'Something Went Wrong',
                resCode: '109'
            });
        } else{
            
            const responseData = [];
            users.forEach(user => {
                user.registered.forEach(event => {
                    if(event.event.toString() === req.params.eventId){
                        if(req.params.paidStatus === "all"){
                            responseData.push({
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                endvrid: user.endvrid,
                                semester: user.semester || "null",
                                confirmed: user.confirmed,
                                college: user.college || "null",
                                branch: user.branch || "null",
                                libId: user.libId || "null",
                                discord: user.discord || "null"
                            });
                        } else {
                            Team.findOne({_id: event.teams}, (err, team) => {
                                if(req.params.paidStatus === "paid" && team.paidStatus){
                                    responseData.push({
                                        name: user.name,
                                        email: user.email,
                                        phoneNumber: user.phoneNumber,
                                        endvrid: user.endvrid,
                                        semester: user.semester || "null",
                                        confirmed: user.confirmed,
                                        college: user.college || "null",
                                        branch: user.branch || "null",
                                        libId: user.libId || "null",
                                        discord: user.discord || "null"
                                    });
                                } else if(req.params.paidStatus === "unpaid" && !team.paidStatus) {
                                    responseData.push({
                                        name: user.name,
                                        email: user.email,
                                        phoneNumber: user.phoneNumber,
                                        endvrid: user.endvrid,
                                        semester: user.semester || "null",
                                        confirmed: user.confirmed,
                                        college: user.college || "null",
                                        branch: user.branch || "null",
                                        libId: user.libId || "null",
                                        discord: user.discord || "null"
                                    });
                                }
                            });
                        }
                    }
                });
                res.status(200).json({
                    status: 200,
                    msg: "Data Fetched Successfully",
                    users: responseData
                });
            });
        }
    });



};

exports.getTeamHead = (req, res) => {
    const eventId = req.params.eventId;
    const paidStatus = req.params.paidStatus;
    Team.find({}, (err, teams) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                msg: 'Something Went Wrong',
                error: 'Something Went Wrong',
                resCode: '109'
            });
        } else {
            const responseData = [];
            teams.forEach(team => {
                if(team.event.toString() === eventId.toString()){
                    if(paidStatus === "all" || (paidStatus === "paid" && team.paidStatus) || (paidStatus === "unpaid" && !team.paidStatus)) {
                        User.findOne({_id: team.leader}, (err, user) => {
                            if(error) {
                                console.log(error);
                                return res.status(500).json({
                                    status: 500,
                                    msg: 'Something Went Wrong',
                                    error: 'Something Went Wrong',
                                    resCode: '109'
                                });
                            } else {
                                responseData.push({
                                    name: user.name,
                                    email: user.email,
                                    phoneNumber: user.phoneNumber,
                                    endvrid: user.endvrid,
                                    semester: user.semester || "null",
                                    confirmed: user.confirmed,
                                    college: user.college || "null",
                                    branch: user.branch || "null",
                                    libId: user.libId || "null",
                                    discord: user.discord || "null"
                                });
                            }
                        });                    
                    }
                }
            });
            res.status(200).json({
                status: 200,
                msg: "Data Fetched Successfully",
                teamHeads: responseData
            });
        }
    });
};

exports.getTeamHeadAll = (req, res) => {
    const eventId = req.params.eventId;
    const paidStatus = req.params.paidStatus;
    Team.find({}, (err, teams) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                msg: 'Something Went Wrong',
                error: 'Something Went Wrong',
                resCode: '109'
            });
        } else {
            const responseData = [];
            teams.forEach(team => {
                if(paidStatus === "all" || (paidStatus === "paid" && team.paidStatus) || (paidStatus === "unpaid" && !team.paidStatus)) {
                    User.findOne({_id: team.leader}, (err, user) => {
                        if(error) {
                            console.log(error);
                            return res.status(500).json({
                                status: 500,
                                msg: 'Something Went Wrong',
                                error: 'Something Went Wrong',
                                resCode: '109'
                            });
                        } else {
                            responseData.push({
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                endvrid: user.endvrid,
                                semester: user.semester || "null",
                                confirmed: user.confirmed,
                                college: user.college || "null",
                                branch: user.branch || "null",
                                libId: user.libId || "null",
                                discord: user.discord || "null"
                            });
                        }
                    });                    
                }
            });
            res.status(200).json({
                status: 200,
                msg: "Data Fetched Successfully",
                teamHeads: responseData
            });
        }
    });
};

exports.getUserFromEndvrId = async (req, res) => {
    const endvrId = req.params.endvrId;
    const paidStatus = req.params.paidStatus;
    const user = await User.findOne({endvrid: endvrId});
    const responseData = [];
    const registeredEvents = [];
    user.registered.forEach(event => {
        Event.findOne({_id: event.event}, (err, event) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    status: 500,
                    msg: 'Something Went Wrong',
                    error: 'Something Went Wrong',
                    resCode: '109'
                });
            } else {
                registeredEvents.push(event.eventName);
            }
        });
    });
    responseData.push({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        endvrid: user.endvrid,
        semester: user.semester || "null",
        confirmed: user.confirmed,
        college: user.college || "null",
        branch: user.branch || "null",
        libId: user.libId || "null",
        discord: user.discord || "null",
        events: registeredEvents
    });
    res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        users: responseData
    });
};

exports.getUserFromMobile = async (req, res) => {
    const phoneNumber = req.params.number;
    const user = await User.findOne({phoneNumber: phoneNumber });
    const responseData = [];
    const registeredEvents = [];
    user.registered.forEach(event => {
        Event.findOne({_id: event.event}, (err, event) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    msg: 'Something Went Wrong',
                    error: 'Something Went Wrong',
                    resCode: '109'
                });
            } else {
                registeredEvents.push(event.eventName);
            }
        });
    });
    responseData.push({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        endvrid: user.endvrid,
        semester: user.semester || "null",
        confirmed: user.confirmed,
        college: user.college || "null",
        branch: user.branch || "null",
        libId: user.libId || "null",
        discord: user.discord || "null",
        events: registeredEvents
    });
    res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        users: responseData
    });
};

exports.getAllUsersByPaidStatus = async (req, res) => {
    const users = await User.find({});
    const responseData = [];
    users.forEach(user => {
        const registerdEvents = [];
        user.registered.forEach(async event => {
            const e = await Event.find({_id: event.event});
            console.log(e);
            console.log("event name", e.eventName);
            registerdEvents.push(e.eventName);
        });
        responseData.push({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            endvrid: user.endvrid,
            semester: user.semester || "null",
            confirmed: user.confirmed,
            college: user.college || "null",
            branch: user.branch || "null",
            libId: user.libId || "null",
            discord: user.discord || "null",
            events: registerdEvents
        });
    });
    res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        users: responseData
    });
};

exports.getEventScaleIdeaHandler = async (req, res) => {
    var confirmed = 0
    var total = 0
    var eventpass = 0
    var internship = 0
    var profile = 0
    const user = await User.find({});
    user.forEach(user => {
        total = total + 1;
        if(user.confirmed){
            confirmed += 1;
            if(user.profile){
                profile += 1;
                if(user.eventPass){
                    eventpass += 1
                }
                if(user.internship){
                    internship += 1;
                }
            }
        }
    });

    return res.send({
        "Total": total,
        "Confirmed": confirmed,
        "profile": profile,
        "eventPass": eventpass,
        "internship": internship
    })
}

exports.massMailInternshipHandler = async (req, res) => {
    const user = await User.find({});
    user.forEach(user => {
        if(user.confirmed && user.role === "user"){
            if(!user.internship){
                async function main() {
            
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASS,
                        },
                    });
                    let info = await transporter.sendMail({
                    from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
                    to: user.email,
                    subject: "Internship email", 
                    text: "Hi it's a internship email", 
                    html: `
                    <b>Hey! ${user.name}</b>,Testing is going on!!!<br><br>You are one step closer to successfully get an internship register for endeavour'21 internship fair.
                    <img src="https://firebasestorage.googleapis.com/v0/b/endeavour-21.appspot.com/o/eventpass.png?alt=media&token=052ecba5-5577-423b-a562-d778bbf24d3c" alt="eventpass" />
                    If any queries, please contact :<br>(ecellwebtechnical@gmail.com)<br>Regards<br>Team e-Cell
                    `, });
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                }
                main().catch(err => {
                console.log(err);
                });
                
            }
        }
    });
    return res.json({
        msg: "Successfully send all the mails"
    })
}

exports.adminConfrimUserByMailHandler = (req, res) => {
    User.findOne({email: req.body.email}).exec((err,user) => {
        if(err || !user){
        return res.status(400).json({
            error: "Unable to find user"
        })
        }
        user.confirmed = true;
        user.endvrid = 'ENDVR2021'+user.phoneNumber.toString();
        user.uniqueString = undefined
        user.save((err, user) => {
            if(err || !user) {
                return res.json({
                    error: "Unable to save user"
                })
            }else {
                return res.json({
                    msg: "User successfully confirmed"
                })
            }
            
        })
    })
}

exports.adminConfrimUserByPhoneNumberHandler = (req, res) => {
    User.findOne({phoneNumber: req.body.phoneNumber}).exec((err,user) => {
        if(err || !user){
        return res.status(400).json({
            error: "Unable to find user"
        })
        }
        user.confirmed = true;
        user.endvrid = 'ENDVR2021'+user.phoneNumber.toString();
        user.uniqueString = undefined
        user.save((err, user) => {
            if(err || !user) {
                return res.json({
                    error: "Unable to save user"
                })
            }else {
                return res.json({
                    msg: "User successfully confirmed"
                })
            }
            
        })
    })
}