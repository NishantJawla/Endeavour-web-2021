//jshint esversion: 8
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');
const team = require('../../models/team');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var async = require("async");
var listofemails = []; 
var success_email = [];
var failure_email = [];
var transporter;

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

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        usersData: users
    });
};

exports.getUsersUsersCustom = async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;
    let options = {};
    if(key === "eventPass" && value === "false"){
        options = {
            [key]: value,
            profile: true
        };
    } else {
        options = {
            [key]: value
        };
    }
    const users = await User.find(options);
    res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        usersData: users
    });
};

exports.updateUserData = async (req, res) => {
    const userId = req.body.userId;
    const updatedData = req.body.updatedData;
    User.findByIdAndUpdate(userId, updatedData, (err) => {
        if(err){
            res.status(500).json({
                status: 500,
                msg: "Not Able to update User data",
                error: "Not Able to update User data"
            });
        } else {
            res.status(200).json({
                status: 200,
                msg: "Successfully updated User Data"
            });
        }
    });
};

exports.deleteUserForDB = async (req, res) => {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId, (err) => {
        if(err){
            res.status(500).json({
                status: 500, 
                msg: "Unable to Delete user",
                error: "Unable to delete user",
            });
        } else {
            res.status(200).json({
                status: 200,
                msg: "Successfully deleted user from database"
            });
        }
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
            }
            if(user.internship){
                internship += 1;
            }
        }
    });

    return res.status(200).json({
        status: 200,
        msg: "Data Fetched Successfully",
        data: {
            total: total,
            confirmed: confirmed,
            profile: profile,
            eventPass: eventpass,
            internship: internship
        }
    })
}
function massMailer() {
    var self = this;
    transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USER_MASS,
            pass: process.env.GMAIL_PASS_MASS
        }
    });
    // Fetch all the emails from database and push it in listofemails
        // Will do it later.
    self.invokeOperation();
};

/* Invoking email sending operation at once */

massMailer.prototype.invokeOperation = function() {
    var self = this;
    async.each(listofemails,self.SendEmail,function(){
        console.log(success_email);
        console.log(failure_email);
    });
}

/* 
* This function will be called by multiple instance.
* Each instance will contain one email ID
* After successfull email operation, it will be pushed in failed or success array.
*/

massMailer.prototype.SendEmail = function(Email,callback) {
    console.log("Sending email to " + Email);
    var self = this;
    self.status = false;
    // waterfall will go one after another
    // So first email will be sent
    // Callback will jump us to next function
    // in that we will update DB
    // Once done that instance is done.
    // Once every instance is done final callback will be called.
    async.waterfall([
        function(callback) {                
            var mailOptions = {
                from: '"Team e-Cell" <ecellwebtechnical@gmail.com>',     
                to: Email,
                subject: 'Get Your Pass Now', 
                text: "Hi it's a get your pass email",
                html: `
                <div style="width:inherit !important; background-color: #202020; width: 100%; height: 100%; margin: 0px; padding: 50px;">
        <div style="margin: auto; display: flex;">
            <img style="margin: auto; align-self:center;" src="https://firebasestorage.googleapis.com/v0/b/endeavour-21.appspot.com/o/loaderLogo.png?alt=media&token=323355c3-7aff-4d0c-801c-9dbcba45dfe5" width="158px" height="150px" />
        </div>
        <div style="width: 100%; color: white;">
            <div style="font-weight: 800; color: white; font-size: 22px; letter-spacing: 1px;">Hey! </div>
            <div style="text-align: justify; padding-top: 14px; font-size: 16px; line-height: 25px; letter-spacing: 1px;">
                Hope you are doing great! <br>

                We have received your registration for Endeavour'21, and would like to notify you that you can be a part of our events by buying an Endeavour'21 pass, at an affordable price, to enjoy the E-SUMMIT at its fullest! <br>
                <ol>
                    <li>
                        The Super-Pack: Rs.150/-
                        <ul>
                            <li>Take part in any number of  events of your choice  (excluding the hackathon and Internship Fair), and various other events like-</li>
                            <li>Speaker Session</li>
                            <li>Preparatory Events</li>
                            <li>Workshops</li>
                            <li>Entertainment Eve</li>
                        </ul>
                    </li>
                    <li>Hackathon: Rs. 100/-</li>
                    <li>Internship Fair: Rs. 50 for being a part of any 2 internships.</li>
                    <li>Preparatory events: FREE</li>
                </ol>
                
                Also, join our Discord Channel, if you haven't already!<br><br>
                <div>
                    <a style="text-decoration: none; color: #fff; background-color: #a13941; padding: 10px 15px; margin: 10px 0" href="https://discord.gg/KwSKQb62Hv">Join Discord</a><br>
                </div>
                <br><br>
                See you there!<br>
            </div>
            <div style="width: 100%; display: flex; text-align: center; padding-top: 20px;">
                <img width="540px" height="300px" style="margin: auto; align-self:center;" src="https://firebasestorage.googleapis.com/v0/b/endeavour-21.appspot.com/o/eventpass.png?alt=media&token=052ecba5-5577-423b-a562-d778bbf24d3c" alt="">
            </div>
            <div style="width: 100%; display: flex; padding-top: 0px;">
                <a href="http://endeavour-kiet.in/geteventpass" style="text-decoration: none; margin: auto; align-self: center; padding: 15px 25px; border: 0px; background-color: #a13941; color: #fff; letter-spacing: 1px; font-weight: 700; font-size: 18px; border-radius: 5px;">Get Your Pass Now</a>
            </div>
            <div style="text-align: justify; padding-top: 10px; font-size: 16px; line-height: 25px; letter-spacing: 1px; color: #fff;">
                If You have any queries contact us at:<br>
                endeavour@kiet.edu <br>
                +91 8795484505 <br><br>

                With Regards,<br>

                Team e-Cell
            </div>
        </div>
    </div>
                
                    `,
            };
            transporter.sendMail(mailOptions, function(error, info) {               
                if(error) {
                    console.log(error)
                    failure_email.push(Email);
                } else {
                    self.status = true;
                    success_email.push(Email);
                }
                callback(null,self.status,Email);
            });
        },
        function(statusCode,Email,callback) {
                console.log("Status for sent mail " + Email + "is " + statusCode);
                callback();
        }
        ],function(){
            //When everything is done return back to caller.
            callback();
    });
}


exports.massMailInternshipHandler = async (req, res) => {
    const user = await User.find({});
    listofemails = []
    success_email = []
    failure_email = []
    user.forEach(user => {
        if(user.confirmed && user.role === "user"){
            if(!user.eventPass){
                listofemails.push(user.email)
            }
        }
    });
    console.log(listofemails);
    new massMailer(); //lets begin
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

exports.getuserbyemailAdminHandler = (req,res) => {
    User.findOne({ email: req.body.email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User will this mail does not exist"
            })
        }
        return res.json({
            msg: "user is valid",
            user
        })
    })
}

exports.getallinvalidusersHandler = async (req,res) => {
    const users = await User.find({});
    var arr = [];
    users.forEach(user => {
        if(!user.confirmed){
            arr.push(user.email);
        }
    })
    return res.json({arr})
}

exports.getuserbyprofileHandler = async (req, res) => {
    const users = await User.find({});
    var someArray = []
    users.forEach(user => {
        if(user.profile){
            someArray.push(user.email)
        }
    })
    res.send({someArray})
}

exports.getUserByYearHandler = async (req, res) => {
    const users = await User.find({});
    var first = 0
    var second = 0
    var third = 0
    var fourth = 0
    users.forEach(user => {
        if(user.profile){
            var s = parseInt(user.semester)
            if(s<=2){
                first += 1
            }else if (s<=4) {
                second += 1
            } else if (s<=6){
                third += 1
            } else{
                fourth += 1
            }
        }
    })
    return res.status(200).json({
        status: 200,
        msg: "Successfully fetched data",
        usersCount: {
            first: first,
            second: second,
            third: third,
            fourth: fourth
        }
    });
}

exports.changepaidstatusofeventpassbyemailHandler = (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        user.eventPass = true
        user.save();
        res.json({
            msg: "Chnaged status succesfully"
        })
    })
}

exports.changepaidstatusofeventpassbyphoneHandler = (req, res) => {
    console.log(req.body)
    User.findOne({ phoneNumber: req.body.phoneNumber}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        user.eventPass = true
        user.save();
        res.json({
            msg: "Chnaged status succesfully"
        })
    })
}

exports.changepaidstatusofinternshipbyemailHandler = (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        user.internship = true
        user.save();
        res.json({
            msg: "Chnaged status succesfully"
        })
    })
}


exports.changepaidstatusofinternshipbyphoneHandler = (req, res) => {
    console.log(req.body)
    User.findOne({  phoneNumber: req.body.phoneNumber}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        user.internship = true
        user.save();
        res.json({
            msg: "Chnaged status succesfully"
        })
    })
}


exports.createAdminHandler = (req, res) => {
    bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
        const user = new User(req.body);
        user.encryptedPassword = hash;
        user.role = "superman"
        user.confirmed = true
        user.save((err, user) => {
            if(err || !user){
                console.log(err)
                res.json({
                    error: "Failed to create admin"
                })
            }
            res.json({
                "msg": "success admin created"
            })
        })
    })

}

exports.getNumberOfParticipantsPerEventHandler = async (req, res) =>  {
    const events = await Event.find({});
    var arr = [];
    events.forEach((event) =>{
        arr.push({
            name: event.eventName,
            "No of participants" : event.mails.length,
            discord: event.discord
        })
    })
    return res.send({arr})
}

exports.getTeamsByLeaderId = async (req, res) => {
    const leaderId = req.params.leaderId;
    const user = await User.findOne({endvrid: leaderId});
    if(!user){
        res.status(404).json({
            status: 404,
            msg: "No user found for the given endeavourId",
            error: "No user found for the given endeavourId"
        });
    } else {
        let teams = await Team.find({leader: user._id});
        if(!teams){
            res.status(404).json({
                status: 404,
                msg: "The user is not registerd in any event",
                error: "The user is not registerd in any event"
            });
        } else {
            res.status(200).json({
                status: 200,
                msg: "Successfully fetched data",
                teamsData: teams
            });
        }
    }
}

exports.deleteTeamFromId = async (req, res) => {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if(!team){
        res.status(404).json({
            status: 404,
            msg: "No team found",
            error: "No team found"
        });
    } else {
        const member1 = await User.findOne({endvrid: team.teamMembers[0]});
        if(team.teamMembers[1]){
            const member2 = await User.findOne({endvrid: team.teamMembers[1]});
            const newEvent2 = member1.registered.filter(event => {
                return !((""+event.teams) === teamId);
            });
            member2.registered = newEvent2;
            const newMyEvents2 = member2.myEvents.filter(event => {
                return !(("" + event.eventId) === ("" + team.event));
            });
            member2.myEvents = newMyEvents2;
            member2.save();
        }
        const newEvent1 = member1.registered.filter(event => {
            return !((""+event.teams) === teamId);
        });
        member1.registered = newEvent1;
        const newMyEvents1 = member1.myEvents.filter(event => {
            return !(("" + event.eventId) === ("" + team.event));
        });
        member1.myEvents = newMyEvents1;
        member1.save();
        Team.findByIdAndDelete(teamId, (err) => {
            if(err){
                res.status(500).json({
                    status: 500,
                    msg: "Not able to remove team. Something went wrong.",
                    error: "Not able to remove team. Something went wrong."
                });
            } else {
                res.status(200).json({
                    status: 200,
                    msg: "Successfully deleted team."
                });
            }
        });
    }

    // if(team.teamMembers[0])
    // const user1 = await User.findOne({});
    // Team.findByIdAndDelete(teamId, (err) => {
    //     if(err){
    //         res.status(500).json({
    //             status: 500,
    //             msg: "Something went wrong",
    //             error: "Something went wrong"
    //         });
    //     } else {
    //         res.status(200).json({
    //             status: 200,
    //             msg: "Successfully deleted team form database"
    //         });
    //     }
    // });
};

exports.getTeamsAll = async (req, res) => {
    const teams = await Team.find({});

    if(!teams){
        res.status(404).json({
            status: 404,
            msg: "Not team data found",
            error: "No Team data found"
        });
    } else {
        res.status(200).json({
            status: 200,
            msg: "Successfully fetched teams data",
            teamsData: teams
        });
    }
};