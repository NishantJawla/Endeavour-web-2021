//jshint esversion: 8
import React from "react";
import facebookIcon from "./../../../assets/img/icons/facebook.svg";
import linkedinIcon from "./../../../assets/img/icons/linkedin.svg";

const  EachSpeakerCard = (props) => {
    return (
        <div className="each-speakerpage bg-white rounded-3 m-4">
            <div className="each-speaker-img overflow-hidden rounded-3">
                <img src={props.data.imguri} width="100%" height="100%" alt="speaker" />
            </div>
            <div className="p-3 each-speaker-desc">
                <div className="name text-center fs-6 ls-1 fw-bold color-primary">
                {props.data.name}
                </div>
                <div className="designation text-center py-1 fs-7 text-wrap">
                    <strong>{props.data.title}</strong><br/>
                    {props.data.t}
                </div>
                <div className="each-speaker-social-icons py-2">
                    <div className="d-flex justify-content-center">
                        <a href={props.data.facebookurl} className="mx-2">
                            <img src={facebookIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                        <a href={props.data.linkedinurl} className="mx-2">
                            <img src={linkedinIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EachSpeakerCard;