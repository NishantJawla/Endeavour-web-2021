//jshint esversion: 8
import React, { useState } from "react";
import EventPopup from "./../core/components/sub-components/EventPopup";


function EventRegister(){

    const [showPopUp, setShowPopup] = useState(false);

    function changeShowPopup(props){
        setShowPopup(true);
    }
    function hidePopup(props){
        setShowPopup(false);
    }

    return (
        <React.Fragment>
            <div className="event-register py-5 bg-sec-pattern bg-norepeat">
                <div className="container py-5">
                    <div className="heading-font pt-3 text-center color-white fw-bold">Event Name</div>
                    <div className="event-desc color-white pt-3 px-5 mx-5">
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Description</div>
                            <div className="fs-6 color-white ls-1">
                                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Structure</div>
                            <div className="fs-6 color-white ls-1">
                                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Rounds</div>
                            <div className="fs-6 color-white ls-1">
                                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <button onClick={changeShowPopup} className="w-100 rounded bg-primary hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3">Register Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <EventPopup 
                showSlowly={showPopUp}
                hidePopup={hidePopup}
                memberCount={2}
            />
        </React.Fragment>
    );
}

export default EventRegister;