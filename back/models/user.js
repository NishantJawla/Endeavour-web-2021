//dependency
//jshint esversion: 8
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');
//user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        maxLength: 10,
        trim: true,
        required: true,
        unique: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    endvrid: {
        type: String,
    },
    semester:{
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    uniqueString: {
        type:String
    },
    role:{
        type: String,
        default: 'user'
    },
    profile: {
        type:Boolean,
        default: false
    },
    college:{
        type: String
    },
    branch:{
        type: String
    },
    libId:{
        type: String
    },
    discord: {
        type: String
    },
    eventPass: {
        type: Boolean,
        default: false
    },
    resetPassword: {
        passCode:{
            type:String
        },
        use: {
            type:Boolean
        }
    },
    registered: [{
        teams: {
            type: Schema.Types.ObjectId,
            ref: "Team"
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event"
        },
        editable: {
            type: Boolean,
            default: true
        }
    }  
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User',userSchema);
