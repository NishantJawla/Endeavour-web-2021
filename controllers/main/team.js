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
                msg: "Sorry admin can't change the status"
            })
        }
        user.registerd.forEach(t => {
            if(t.event.toString() === req.body.eventId){
                
                Team.findById(t.teams.toString()).exec((err,team) => {
                team.paidStatus = true
                team.save((err,team) => {
                    if(err){
                        return res.json({
                            msg: 'not able to update'
                        })
                    }
                    req.team = t
                    next()
                })
                });
                
            }
        })
    })
}