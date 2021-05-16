const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    email: {
        type: String,
    },
    endvrid: {
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    success: {
        type: Boolean,
        default: false
    },
    transid: {
        type: String,
    },
    amount: {
        type: String
    }
})

module.exports = mongoose.model('Payment',paymentSchema);