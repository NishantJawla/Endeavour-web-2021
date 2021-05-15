//jshint esversion: 8
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');
const team = require('../../models/team');


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
};

exports.getUserFromMobile = async (req, res) => {
    const phoneNumber = req.params.number;
    const user = await User.findOne({phoneNumber: phoneNumber });
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
};

exports.getAllUsersByPaidStatus = async (req, res) => {
    const users = await Users.find({});
    const responseData = [];
    users.forEach(user => {
        const registerdEvents = [];
        user.registered.forEach(async event => {
            const e = await Event.find({_id: event.event});
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
            events: registeredEvents
        });
    });
};