//jshint esversion: 8
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
