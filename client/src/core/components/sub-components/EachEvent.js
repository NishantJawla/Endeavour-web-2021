//jshint esversion: 8
import React from 'react';
import { Link } from 'react-router-dom';
import EventIcon from "./../../../assets/img/icons/hack.png";

function EachEvent(props){

    function showPopup(){
        // console.log(props);
        props.changeShowPopup(props.id);
    }

    return (
        <div className="py-5 each-event">
            <div className="p-5">
                <div className="event-img py-2">
                    <img src={EventIcon} width="80px" height="80px" alt="hackathon icon"/>
                </div>
                <div className="event-title fw-bolder ls-1 fs-5 py-2">Hackathon</div>
                <div className="event-desc py-2">Where Ideas and Technology Synergizes</div>
                <Link to="/events/:eventId" className="learn-more border-0 bg-transparent p-0 fw-bold ls-1 mt-2 color-primary">Read More</Link>
            </div>
        </div>
    );
}

export default EachEvent;