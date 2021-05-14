//jshint esversion: 8
import React from 'react';
import ContactUsForm from './sub-components/ContactUsForm';
import one from "./../../assets/glimpses/1.jpg";
import two from "./../../assets/glimpses/2.jpg"
import three from "./../../assets/glimpses/3.jpg"
import four from "./../../assets/glimpses/4.jpg"
import five from "./../../assets/glimpses/5.jpg"
import six from "./../../assets/glimpses/6.jpg"
import seven from "./../../assets/glimpses/7.jpg"
import eight from "./../../assets/glimpses/8.jpg"
import nine from "./../../assets/glimpses/9.jpg"
import ten from "./../../assets/glimpses/10.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;
function ContactUs(){
    return (
        <div className="contact-us bg-sec-pattern py-5">
            <div className="container">
                <div className="heading-font text-center fw-bold color-white">Get In Touch</div>
                <div className="row py-3">
                    <div className="col-md-6 d-md-block d-none">
                        <div className="p-5">
                            <div className="contact-image">
                            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={false} swipeable ={true} stopOnHover={true}>
                            <div>
                            <img src={one} alt="contact us img"/>
                            <p className="legend">Endeavour'16</p>
                            </div>
                            <div>
                            <img src={two} alt="contact us img"/>
                            <p className="legend">Endeavour'17</p>
                            </div>
                            <div>
                            <img src={three} alt="contact us img"/>
                            <p className="legend">Endeavour'18</p>
                            </div>
                            <div>
                            <img src={four} alt="contact us img"/>
                            <p className="legend">Endeavour'19</p>
                            </div>
                            <div>
                            <img src={five} alt="contact us img"/>
                            <p className="legend">Endeavour'20</p>
                            </div>
                            <div>
                            <img src={six} alt="contact us img"/>
                            <p className="legend">Endeavour'16</p>
                            </div>
                            <div>
                            <img src={seven} alt="contact us img"/>
                            <p className="legend">Endeavour'17</p>
                            </div>
                            <div>
                            <img src={eight} alt="contact us img"/>
                            <p className="legend">Endeavour'18</p>
                            </div>
                            <div>
                            <img src={nine} alt="contact us img"/>
                            <p className="legend">Endeavour'19</p>
                            </div>
                            <div>
                            <img src={ten} alt="contact us img"/>
                            <p className="legend">Endeavour'20</p>
                            </div>
                            </Carousel>
                            </div>
                        </div>
                        <span className="contact-details  color-white">
                            <div className="fs-4 ">Contact Us:</div>
                            <div>
                                <div>Mobile Number : 8601613337</div>
                                <div>Email ID : ecell@kiet.edu</div>
                                <div>Address : TBI, KIET Group Of Institutions, Muradnagar, Ghaziabad</div>
                            </div>
                        </span>
                    </div>
                    <div className="form-container col-lg-6 col-sm-12 px-5 color-white">
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default ContactUs;