require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const Event = require('../../models/event');
const Team = require('../../models/team');
const User = require('../../models/user');
const router = express.Router();
const shortid = require('shortid')
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

router.post("/orders/intership", async (req, res) => {

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
    console.log("reached here")
	const secret = process.env.SECRET

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
        if(req.body.payload.payment.entity.error_code === null){
            console.log('It\'s a valid payment')
        } else {
            console.log('IT is not a valid payment')
        }
		require('fs').writeFileSync('payment.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})


module.exports = router;