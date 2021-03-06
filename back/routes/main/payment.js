require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const Event = require('../../models/event');
const Team = require('../../models/team');
const User = require('../../models/user');
const Payment = require('../../models/payment');
const router = express.Router();
const shortid = require('shortid')
const nodemailer = require("nodemailer");
router.post("/orders/eventpass", async (req, res) => {

    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        
    const payment_capture = 1
    const amount = parseInt(150)
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await instance.orders.create(options)
        // console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

} catch (error) {
    res.status(500).send(error);
}
});

router.post("/orders/internship", async (req, res) => {

    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        
    const payment_capture = 1
    const amount = parseInt(50)
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await instance.orders.create(options)
        // console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

} catch (error) {
    res.status(500).send(error);
}
});

router.post('/verification', (req, res) => {
	// do a validation
    // console.log("reached here")
	const secret = process.env.SECRET

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')
    
    
	if (digest === req.headers['x-razorpay-signature']) {
		// process it
        const data = JSON.stringify(req.body, null, 4)
        // console.log(data)
        // console.log("qwertyuiop")
        // console.log(req.body)
        if(req.body.payload.payment){
            if(req.body.payload.payment.entity.error_code === null){
            
                const payment = new Payment({
                    email: req.body.payload.payment.entity.email,
                    endvrid: req.body.payload.payment.entity.description,
                    phoneNumber: req.body.payload.payment.entity.contact,
                    transid: req.body.payload.payment.entity.id,
                    amount: req.body.payload.payment.entity.amount,
                    success: true
                });
                payment.save()
                var amount = parseInt(req.body.payload.payment.entity.amount)
                var endvrId = req.body.payload.payment.entity.description
    
                if(amount === 15000){
                    User.findOne({endvrid : endvrId}).exec((err, user) =>{
                        user.eventPass = true;
                        user.save((err, user) => {
                        })
                    })
                } else if(amount === 5000){
                    User.findOne({endvrid : endvrId}).exec((err, user) =>{
                        user.internship = true;
                        user.save((err, user) => {
                        })
                    })
                }
                
            } else {
                const payment = new Payment({
                    email: req.body.payload.payment.entity.email,
                    endvrid: req.body.payload.payment.entity.description,
                    phoneNumber: req.body.payload.payment.entity.contact,
                    amount: req.body.payload.payment.entity.amount,
                    transid: req.body.payload.payment.entity.id
                });
                payment.save((err, payment) => {
                })
            }
        } else {
            // pass it
        }
        }
        
	res.json({ status: 'ok' })
})


module.exports = router;