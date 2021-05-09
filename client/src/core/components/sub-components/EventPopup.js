//jshint esversion: 8
import React from 'react';

function EventPopup(){
    return (
        <div className="event-popup container w-50 h-100 position-fixed m-auto p-0 top-0">
            <div className="position-relative h-75 p-5 color-white overflow-auto">
                <div className="position-absolute right-0 px-5">
                    <button className="close-button bg-transparent border-0">
                        <img src="img/icons/cancel.png" width="20px" height="20px" alt="cancel button" />
                    </button>
                </div>
                <div className="popup-heading fs-5 fw-bold ls-1"> 
                    Hackathon
                </div>
                <div className="popup-desc fs-6 ls-1" style={{textAlign: "justify"}}>
                    <div className="popup-subhead fs-6 pb-2 pt-3 fw-bold ls-1">Desc:</div>
                    What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                    <div className="popup-subhead fs-6 pb-2 pt-3 fw-bold ls-1">Rules:</div>
                    What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                </div>
                <div className="register-button position-absolute bottom-0 pb-5">
                    <button className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Register</button>
                </div>
            </div>
        </div>
    );
}

export default EventPopup;