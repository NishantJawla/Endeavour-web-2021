//jshint esversion: 8
import React from 'react';
import SpeakerImage from "./../../../assets/img/speaker/aditiohri.png";

const  EachSpeaker = (props) => {
    return (
        <a href={props.data.linkedinurl} className="each-speaker">
            <div className="speaker-img">
                <img src={props.data.imguri} width="275px" height="275px" alt="speaker img" />
            </div>
            <div className="speaker-details pt-2">
                <div className="speaker-name fs-5 fw-bold color-white text-decoration-none">{props.data.name}</div>
            </div>
        </a>
    );
}

export default EachSpeaker;