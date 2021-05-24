//jshint esversion: 8
import React from "react";
import closeIcon from "./../../../assets/img/icons/cancel.png";

function DetailsPopup(props){
    const startHidePopup = (event) => {
        event.preventDefault();
        props.setShowSlowly(false);
    };

    const showSlowly = {
        opacity: "1",
        zIndex: "100",
        width: "auto",
        height:"auto",
        transition: "all ease-in",
        transitionDuration: "0.5s",
    };

    const hideSlowly = {
        opacity: "0",
        zIndex: "-1",
        width: "0px !important",
        height: "0px !important",
        transition: "all ease-out",
        transitionDuration:" 0.5s",
    };
    // style={props.showSlowly ? showSlowly : hideSlowly }
    return (
        <div className="position-absolute top-0 w-50 left-0 ">
            <div className=" m-5 p-5 rounded-3 bg-white">
                <div class="details">
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center fs-6 ls-1 fw-bold">Name</label>
                        <input className="form-control col-9 " type="text" placeholder="name" name="name" value="fewagag" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Email</label>
                        <input className="form-control col-9 " type="email" placeholder="email" name="email" value="" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Phone Number</label>
                        <input className="form-control col-9 " type="tel" placeholder="1234567890" name="phoneNumber" value="" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Endeavour Id</label>
                        <input className="form-control col-9 " type="text" placeholder="ENDVR20211234567890" name="endvrid" value="" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Semester</label>
                        <input className="form-control col-9 " type="text" placeholder="Semester" name="semester" value="" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Confirmed</label>
                        <input className="form-control col-9 " type="text" placeholder="true/false" name="confirmed" value="" readOnly />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Profile</label>
                        <input className="form-control col-9 " type="text" placeholder="true/false" name="profile" value="" readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPopup;