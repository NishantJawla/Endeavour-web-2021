//jshint esversion: 8
import React from 'react';
import ContactUsForm from './sub-components/ContactUsForm';
import ContactUsImage from "./../../assets/img/form.png";

function ContactUs(){
    return (
        <div className="contact-us bg-sec-pattern py-5">
            <div className="container">
                <div className="heading-font text-center fw-bold color-white">Get In Touch</div>
                <div className="row py-3">
                    <div className="col-md-6 d-md-block d-none">
                        <div className="p-3">
                            <div className="contact-image">
                                <img src={ContactUsImage} alt="contact us img"/>
                            </div>
                        </div>
                        <div className="contact-details p-3 color-white">
                            <div className="fs-4 py-3">Contact Us:</div>
                            <div>
                                <div>Mobile Number : 1234567890</div>
                                <div>Email ID : ecell@kiet.edu</div>
                                <div>Address : TBI, KIET Group Of Institutions, Muradnagar, Ghaziabad</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 px-5 color-white">
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default ContactUs;