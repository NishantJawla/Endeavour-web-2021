//jshint esversion: 8
import React from "react";

function EventPass() {
    return (
        <React.Fragment>
            <div className="event-pass pb-5 bg-main-pattern bg-norepeat">
                <div className="container">
                    {/* <div className="heading-font text-center color-white pt-5 pb-3 fw-bold">Event Pass</div> */}
                    <div className="d-flex w-100 pb-5 h-100 justify-content-center">
                        <div className="each-event-pass w-50 align-self-center ">
                            {/* <div className="w-75 m-auto p-5">
                                <div className="heading-font color-primary text-center fw-bold">Event Pass</div>
                                <div className="passbenefits py-2">
                                    <div className="fs-5 fw-bold pb-3 ls-1">Benefits</div>
                                    <ul>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 1</li>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 2</li>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 3</li>
                                    </ul>
                                </div>
                                <div className="getpassbutton">
                                    <button className="p">Buy Pass</button>
                                </div>
                            </div> */}
                            <div className="position-relative card">
                                <div className="position-absolute m-auto card-strip bg-secondary">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                <div>
                </div>
            </form>

        </React.Fragment>
    );
}

export default EventPass;