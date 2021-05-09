//jshint esversion: 8
import React from 'react';

function ConfRegistration(){
    return (
        <div className="event-conf-popup container w-25 h-100 position-fixed m-auto p-0 top-0 hide-slowly">
            <div className="position-relative h-25 p-5 color-white overflow-none">
                <div className="conf-message fs-5">
                    Do You want to register for the EventName
                </div>
                <div className="no-button position-absolute bottom-0 pb-5">
                    <button className="bg-white fw-bold border-0 hbg-dark py-2 px-3 ls-1 rounded-3">No</button>
                </div>
                <div className="yes-button position-absolute bottom-0 right-0 px-5 pb-5">
                    <button className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default ConfRegistration;