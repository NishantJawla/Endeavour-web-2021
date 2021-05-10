//jshint esversion: 8
import React, { useState } from 'react';
import EachEvent from './sub-components/EachEvent';
import EventPopup from './sub-components/EventPopup';
import ConfRegistration from "./sub-components/ConfRegistration";

function Event() {

    const [showPopUp, setShowPopup] = useState(false);

    const popupData = {
        key: ''
    };

    function changeShowPopup(props){
        setShowPopup(true);
    }
    function hidePopup(props){
        setShowPopup(false);
    }

    

    return (
        <React.Fragment>
            <div className="events py-5" id="events">
                <div className="container">
                    <div className="heading-font text-center color-white fw-bold">Our Events</div>
                    <div className="events-container">
                        <div className="d-flex justify-content-between flex-wrap">
                            <EachEvent 
                                id={0}
                                changeShowPopup={changeShowPopup}
                            />
                            <EachEvent
                                id={1}
                                changeShowPopup={changeShowPopup}
                            />
                            <EachEvent 
                                id={2}
                                changeShowPopup={changeShowPopup}
                            />
                            <EachEvent
                                id={3} 
                                changeShowPopup={changeShowPopup}
                            />
                            <EachEvent
                                id={4} 
                                changeShowPopup={changeShowPopup}
                            />
                            <EachEvent
                                id={5} 
                                changeShowPopup={changeShowPopup}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EventPopup 
                showSlowly={showPopUp}
                hidePopup={hidePopup}
            />
            {/* <ConfRegistration /> */}
        </React.Fragment>
    );
}

export default Event;