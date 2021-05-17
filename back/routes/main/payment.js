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
    const amount = parseInt(1)
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

router.post('/verification', async (req, res) => {
	// do a validation
    console.log("reached here")
	const secret = process.env.SECRET

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	if (digest === req.headers['x-razorpay-signature']) {
		// process it

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

            const main = async () => {
            
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });
                let info = await transporter.sendMail({
                from: '"Team e-Cell" <ecellwebtechnical@gmail.com>', 
                to: req.body.payload.payment.entity.email, 
                subject: "Payment Successfull email", 
                text: "Hi it's a payment successfull email", 
                html: `
                <b>Hey! ${req.body.payload.payment.entity.description}</b>,<br>Thank you for your payment that you made on the endeavour website of amount Rs ${parseInt(parseInt(amount)/100)} through transaction number.  ${req.body.payload.payment.entity.id}.  This mail is an acknowledgement of receipt for the amount.<br>
                If any queries, please contact :<br>(ecellwebtechnical@gmail.com)<br>Regards<br>Team e-Cell
                `, });
            }
            await main().catch(err => {
            console.log(err)
            });



            if(amount === 100){
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
                return res.status(400).json({
                    "error" : req.body.payload.payment.entity.error_description
                })
            })
        }
		require('fs').writeFileSync('payment.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})


module.exports = router;