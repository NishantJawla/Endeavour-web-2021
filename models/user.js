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
    }

});

module.exports = mongoose.model('User',userSchema);
