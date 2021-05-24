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

    return (
        <div className="each-speaker-popup position-relative" style={props.showSlowly ? showSlowly : hideSlowly }>
            <div className="position-fixed w-100 top-25">
                <div className="row">
                    <div className="col-md-8 col-lg-8 col-xl-6 col-xxl-6 offset-md-2 offset-lg-2 offset-xl-3 offset-xxl-3">
                        <div className="position-absolute right-0 p-4">
                            <button onClick={startHidePopup} className="close-button pe-3 bg-transparent border-0">
                                <img src={closeIcon} width="20px" height="20px" alt="cancel button" />
                            </button>
                        </div>  
                        <div className="p-5 popup-main row rounded-3 overflow-hidden bg-secondary">
                            <div className="col-lg-3 col-xl-4 border-right border-1 border-primary">
                                <div className="speaker-popup-img d-flex justify-content-center">
                                    <img className="align-self-center rounded-circle img-fluid" src={props.data ? props.data.imguri : ""} alt="speaker"/>
                                </div>
                                <div className="speaker-desc pt-3">
                                    <div className="color-white fs-5 ls-1 fw-bold text-center">{props.data ? props.data.name: ""}</div>
                                    <div className="color-white fs-7 text-center">{props.data ? props.data.desc: ""}</div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-xl-8 d-flex">
                                <div className="color-white ls-1 fs-7 align-self-center px-3 text-justify">{props.data ? props.data.t : ""} {props.data ? props.data.d : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPopup;