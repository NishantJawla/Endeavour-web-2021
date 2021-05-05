//jshint esversion: 8
const Event = require('../../models/event');
const { check, validationResult } = require("express-validator");
const User = require('../../models/user');
const Team = require('../../models/team');


exports.createEventHandler = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            msg:'price is not numeric'
        })
    }
    const e = {
        price: parseInt(req.body.price),
        eventName: req.body.eventName
    }
    const event = new Event(e);
    event.save((err,event) => {
        if(err){
            res.status(402).json(err);
        }
        res.json(event);
    })
};

exports.registerEvent = async (req, res) => {
    let user1 = await User.findOne({_id: req.user._id});
    // console.log(user1.registerd);
    user1.registerd.forEach(team => {
        console.log(team);
        if(team.event.toString() === req.params.eventId){
            console.log("already registred");
            return res.json({
                status: 401,
                msg: "Team leader already registed"
            });
        }
    });

    let user2 = null;
    let user3 = null;
    let user4 = null;
    if(req.body.member2){
        user2 = await User.findOne({endvrid: req.body.member2});
        user2.registerd.forEach(team => {
            if(team.event.toString() === req.params.eventId){
                res.json({
                    status: 401,
                    msg: "Member2 is already registed"
                });
            }
        });
    }
    if(req.body.member3){
        user3 = await User.findOne({endvrid: req.body.member3});
        user3.registerd.forEach(team => {
            if(team.event.toString() === req.params.eventId){
                res.json({
                    status: 401,
                    msg: "Member3 is already registed"
                });
            }
        });
    }
    if(req.body.member4){
        user4 = await User.findOne({endvrid: req.body.member4});
        user4.registerd.forEach(team => {
            if(team.event.toString() === req.params.eventId){
                res.json({
                    status: 401,
                    msg: "Member4 is already registed"
                });
            }
        });
    }

    const data = {
        event: req.params.eventId,
        leader: req.user._id,
        member1: user1._id,
        member2: user2 !== null ? user2._id : null,
        member3: user3 !== null ? user3._id : null,
        member4: user3 !== null ? user4._id : null
    };

    const team = new Team(data);
    team.save();

    if(user1){
        user1.registerd.push({
            teams: team._id,
            event: req.params.eventId
        });
        user1.save();
    }

    if(user2){
        user2.registerd.push({
            teams: team._id,
            event: req.params.eventId
        });
        user2.save();
    }

    if(user3){
        user3.registerd.push({
            teams: team._id,
            event: req.params.eventId
        });
        user3.save();
    }

    if(user4){
        user4.registerd.push({
            teams: team._id,
            event: req.params.eventId
        });
        user4.save();
    }

    res.json({
        status: 200,
        msg: "sucessfully registered"
    });

};
