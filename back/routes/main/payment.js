require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const Event = require('../../models/event');
const router = express.Router();
const shortid = require('shortid')
router.post("/orders/:eventId", async (req, res) => {
    
    try {
        const event = await Event.findById(req.params.eventId)
        try {
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET,
            });
            
        const payment_capture = 1
        const amount = parseInt(event.price)
        const currency = 'INR'
    
        const options = {
            amount: amount * 100,
            currency,
            receipt: shortid.generate(),
            payment_capture
        }
            const order = await instance.orders.create(options);
        
            if (!order) return res.status(500).send("Some error occured");
            console.log(order)
            res.json(order);
        } catch (error) {
            res.status(500).send(error);
        }

    } catch (err) {
        res.status(500).send(error);
    }
    



});



module.exports = router;