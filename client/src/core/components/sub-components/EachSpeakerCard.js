//jshint esversion: 8
import React from "react";
import speakerImg from "./../../../assets/img/speaker/aditiohri.png";
import facebookIcon from "./../../../assets/img/icons/facebook.svg";
import linkedinIcon from "./../../../assets/img/icons/linkedin.svg";

function EachSpeakerCard() {
    return (
        <div className="each-speakerpage bg-white rounded-3 m-4">
            <div className="each-speaker-img overflow-hidden rounded-3">
                <img src={speakerImg} width="100%" height="100%" alt="speaker" />
            </div>
            <div className="p-3 each-speaker-desc">
                <div className="name text-center fs-6 ls-1 fw-bold color-primary">
                    Speaker Name
                </div>
                <div className="designation text-center py-1 fs-7 text-wrap">
                    Founder and CEO of Alphabet fewjiogjwoijgio wijegoiowjge
                </div>
                <div className="each-speaker-social-icons py-2">
                    <div className="d-flex justify-content-center">
                        <a href="https://google.com" className="mx-2">
                            <img src={facebookIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                        <a href="https://google.com" className="mx-2">
                            <img src={linkedinIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EachSpeakerCard;