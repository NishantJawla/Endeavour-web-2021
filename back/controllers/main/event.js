//jshint esversion: 8
const Event = require('../../models/event');
const { check, validationResult } = require("express-validator");
const User = require('../../models/user');
const Team = require('../../models/team');


exports.createEventHandler = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            status: 400,
            msg:errors.array()[0].msg,
            error: errors.array()[0].msg
        })
    }
    Event.findOne({eventName: req.body.eventName}).exec((err,ev)=>{
        if(err){
            return res.status(500).json({
                error: "Server error"
            })
        }
        else if(ev){
            return res.status(400).json({
                error: "Event already exist"
            })
        }
        const e = {
            price: parseInt(req.body.price),
            eventName: req.body.eventName,
            membersCount: parseInt(req.body.membersCount)
        }
        const event = new Event(e);
        event.save((err,event) => {
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(event);
        })
    })
   
};

exports.addTeamToEventsHandler = (req,res) => {
    Event.findById(req.team.event.toString()).exec((err,e)=>{
        if(err || !e){
            return res.status(404).json({
                status: 404,
                msg: "unable to find the event"
            })
        }
        e.paid.push(req.team.event._id)
        res.json(e)
    })
}

exports.getEventHandler = (req,res) => {
    Event.findById(req.params.eventId).exec((err,event) => {
        if(err || !event){
            if(err){
                return res.status(500).json({
                    status: 500,
                    msg: "Server Error",
                    error: "Server Error"
                })
            }
            return res.status(400).json({
                status: 400,
                msg: "Event Not Found",
                error: "Event Not Found"
            })
        }
        let content = event
        content.paid = undefined;
        content.createdAt = undefined
        content.updatedAt = undefined
        content.__v = undefined
        return res.status(200).json({
            status: 200,
            msg: "Event Found Successfully",
            content
        })
    })
};


// const  changeTeamPaidStatus = async (teamId) => {
// await Team.findById(teamId).exec((err, team) => {
//     team.paidStatus = true
//     await Event.findById(team.event.toString()).exec((err, event) => {
//         event.paid.push(teamId);
//         event.save();
//     })

//     })
// } 