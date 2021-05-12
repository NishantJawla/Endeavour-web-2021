//jshint esversion: 8
import React from 'react';
import "./footer.css";
import SocialLinks from "./sub-components/SocialLinks";
import personIcon1 from "./../../assets/img/icons/person1.png";
import personIcon2 from "./../../assets/img/icons/person3.png";

function Footer() {
    return (
        <footer className="pt-4 bg-secondary position-relative">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-7 d-sm-none d-md-block">
                        <div className="address">
                            <div className="fs-4 color-white py-3 fw-bold ls-1">Address</div>
                            <iframe title="address" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d874.4751148729615!2d77.4986140292191!3d28.75238877465378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf471f7307f87%3A0xa4a1095abb33f9ac!2sTBI%20KIET!5e0!3m2!1sen!2sin!4v1620477652006!5m2!1sen!2sin" width="100%" height="390" style={{border: 0}} allowFullScreen={true} loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-8 offset-md-1 offset-sm-2">
                        <div className="contact-info">
                            <div className="fs-4 color-white py-3 fw-bold ls-1">Contact Info</div>
                            <div className="d-flex justify-content-between">
                                <div className="each-contact color-grey p-3 ls-1">
                                    <div className="pt-3 pb-4">
                                        <img src={personIcon1} height="150px" alt="person" />
                                    </div>
                                    <div className="bg-white w-100 my-3" style={{height:"2px", }}></div>
                                    <div className="py-2">
                                        <div className="name">Nishant Jawla</div>
                                        <div className="designation">Web Developer e-Cell</div>
                                        <div className="contact">+91 7054409248</div>
                                    </div>
                                    
                                </div>
                                <div className="each-contact color-grey p-3 ls-1">
                                    <div className="pt-3 pb-4">
                                        <img src={personIcon2} height="150px" alt="person" />
                                    </div>
                                    <div className="bg-white w-100 my-3" style={{height:"2px", }}></div>    
                                    <div className="py-2">
                                        <div className="name">Pranav Shukla</div>
                                        <div className="designation">Web Developer e-Cell</div>
                                        <div className="contact">+91 9718069294</div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            {/* <div className="each-contact color-grey py-3 ls-1">
                                <div className="name">Person 1</div>
                                <div className="designation">Member Ecell</div>
                                <div className="contact">+91 1234567890</div>
                            </div>
                            <div className="each-contact color-grey py-3 ls-1">
                                <div className="name">Person 1</div>
                                <div className="designation">Member Ecell</div>
                                <div className="contact">+91 1234567890</div>
                            </div> */}
                        </div>
                        <SocialLinks />
                    </div>
                </div>
                <div className="copyright pt-5 pb-3 text-center fw-bold fs-6 color-white">
                    Copyright © 2021 Technical Team e-Cell
                </div>
            </div>
        </footer>
    );
}

export default Footer;
