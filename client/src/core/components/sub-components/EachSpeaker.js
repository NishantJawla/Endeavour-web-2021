//jshint esversion: 8
import React from 'react';
import SpeakerImage from "./../../../assets/img/speaker/aditiohri.png";

function EachSpeaker() {
    return (
        <a href="google.com" className="each-speaker">
            <div className="speaker-img">
                <img src={SpeakerImage} width="275px" height="275px" alt="speaker img" />
            </div>
            <div className="speaker-details pt-2">
                <div className="speaker-name fs-5 fw-bold color-white text-decoration-none">Divya Rajput</div>
            </div>
        </a>
    );
}

export default EachSpeaker;