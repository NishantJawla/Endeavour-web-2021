//jshint esversion: 8
import React from 'react';

function ContactUsForm(){
    return (
        
        <form action="#" method="post">
            <div className="name py-3">
                <label className="fs-6 py-2" for="name">Name</label>
                <input className="form-control p-3 border-0 " type="text" name="name" id="name" placeholder="Enter Your Name" autocomplete="off" required/>
            </div>
            <div className="email py-3">
                <label className="fs-6 py-2" for="email">Email</label>
                <input className="form-control p-3 border-0 " type="email" name="email" id="email" placeholder="Enter Your Email" required/>
            </div>
            <div className="subject py-3">
                <label className="fs-6 py-2" for="subject">Subject</label>
                <input className="form-control p-3 border-0 " type="text" name="subject" id="subject" placeholder="Subject" required/>
            </div>
            <div className="message py-3">
                <label className="fs-6 py-2" for="messgae">Your Message</label>
                <textarea className="form-control p-3 border-0 " name="message" id="message" cols="30" rows="5" placeholder="Your Message"></textarea>
            </div>
        </form>
    ); 
}

export default ContactUsForm;