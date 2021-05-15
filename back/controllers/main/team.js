//jshint esversion: 8
//dependecy
const bcrypt = require('bcrypt')
const saltRounds = 10;
//imports
const User = require('../../models/user');
const Team = require('../../models/team');
const Event = require('../../models/event');

exports.changePaidStatusHandler = (req,res,next) => {
    User.findOne({
        phoneNumber: req.body.phoneNumber
    }).exec((err,user) => {
        if(err || !user){
            return res.json({
                status: 403,
                msg: "Sorry admin, Not able tochange the paid status"
            })
        }
        user.registerd.forEach(t => {
            if(t.event.toString() === req.body.eventId){
                
                Team.findById(t.teams.toString()).exec((err,team) => {
                team.paidStatus = true;
                team.save((err,team) => {
                    if(err){
                        return res.json({
                            status: 403,
                            msg: 'not able to update'
                        })
                    }
                    req.team = t;
                    next();
                })
                });
                
            }
        })
    })
}

exports.getTeamHandler = (req, res) => {

    Team.findOne({_id: req.params.teamId}).exec((err,team) => {
        if(err || !team) {
            return res.status(400).json({
                status: 400,
                error: "Team Not Found!",
                msg: "Team not found!"
            })
        }
        return res.json({
            teamMembers: team.teamMembers,
            status: false
        })
    })
    
}