//jshint esversion: 8
import React from 'react';
import EachEvent from './sub-components/EachEvent';
import EventPopup from './sub-components/EventPopup';
import ConfRegistration from './sub-components/ConfRegistration';

function Event() {
    return (
        <React.Fragment>
            <div className="events py-5">
                <div className="container">
                    <div className="heading-font text-center color-white fw-bold">Our Events</div>
                    <div className="events-container">
                        <div className="d-flex justify-content-between flex-wrap">
                            <EachEvent />
                            <EachEvent />
                            <EachEvent />
                            <EachEvent />
                            <EachEvent />
                            <EachEvent />
                        </div>
                    </div>
                </div>
            </div>
            <EventPopup />
            <ConfRegistration />
        </React.Fragment>
    );
}

export default Event;