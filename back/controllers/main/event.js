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
            msg:'Price is not numeric'
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
            res.status(402).json(err);
        }
        res.json(event);
    })
};

exports.addTeamToEventsHandler = (req,res) => {
    Event.findById(req.team.event.toString()).exec((err,e)=>{
        if(err || !e){
            return res.json({
                status: 404,
                msg: "unable to find the event"
            })
        }
        e.paid.push(req.team.event._id)
        res.json(e)
    })
}