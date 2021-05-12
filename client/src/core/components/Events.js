//jshint esversion: 8
import React, { useState } from 'react';
import EachEvent from './sub-components/EachEvent';

function Event() {

    

    return (
        <React.Fragment>
            <div className="events py-5 bg-main-pattern" id="events">
                <div className="container">
                    <div className="heading-font text-center color-white fw-bold">Our Events</div>
                    <div className="events-container">
                        <div className="d-flex justify-content-between flex-wrap">
                            <EachEvent/>
                            <EachEvent/>
                            <EachEvent/>
                            <EachEvent/>
                            <EachEvent/>
                            <EachEvent/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ConfRegistration /> */}
        </React.Fragment>
    );
}

export default Event;