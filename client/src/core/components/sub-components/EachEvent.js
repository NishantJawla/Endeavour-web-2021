//jshint esversion: 8
import React from 'react';
import { Link } from 'react-router-dom';


const  EachEvent = (props) => {
    const url = `/events/${props.data.eventId}`;
    return (
        <div className="py-5 each-event">
            <div className="p-5">
                <div className="event-img py-2">
                    <img src={props.data.eventIcon} width="80px" height="80px" alt="hackathon icon"/>
                </div>
                <div className="event-title fw-bolder ls-1 fs-5 py-2">{props.data.eventName}</div>
                <div className="event-desc py-2">{props.data.eventTagline}</div>
                {
                    (props.data.isOpen === "true") && (<Link to={url} className="learn-more border-0 bg-transparent p-0 fw-bold ls-1 mt-2 color-primary" 
                    data={props}>Read More</Link>)
                }
                
            </div>
        </div>
    );
}

export default EachEvent;