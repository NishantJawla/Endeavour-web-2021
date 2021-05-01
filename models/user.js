const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    encryptedPassword: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        maxLength: 10,
        trim: true,
        required: true,
        unique: true
    },
    college: {
        type: String,
        trim: true
    },
    endvrid: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: 'user'
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User',userSchema);
