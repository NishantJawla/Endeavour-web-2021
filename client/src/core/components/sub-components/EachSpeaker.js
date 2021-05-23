//jshint esversion: 8
import React from 'react';

const  EachSpeaker = (props) => {
    return (
        <a href={props.data.linkedinurl} className="each-speaker">
            <div className="speaker-img">
                <img src={props.data.imguri} width="275px" height="275px" alt="speaker img" />
            </div>
            <div className="speaker-details pt-2">
                <div className="speaker-name fs-5 fw-bold color-white text-decoration-none">{props.data.name}</div>
                <div className="text-center color-white ls-1 fs-7 py-2">{props.data.desc}</div>
            </div>
        </a>
    );
}

export default EachSpeaker;