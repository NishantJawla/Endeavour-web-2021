//dependency
//jshint esversion: 8
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//user schema
const teamSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    member1: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    member2: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    member3: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    member4: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    paidStatus: {
        type: Boolean,
        default:false
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Team',teamSchema);
