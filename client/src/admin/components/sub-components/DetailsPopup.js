//jshint esversion: 8
import React, { useState } from "react";
import { updateUserData, deleteUserData } from "./../../helper/adminapicall";
import ModalPopup from "./ModalPopup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetailsPopup(props){
    
    const [edit, setEdit] = useState(false);
    const [updatedData, setUpdataedData] = useState({});
    const [showConf, setShowConf] = useState(false);

    const startHidePopup = (event) => {
        props.setShowSlowly(false);
        setEdit(false);
    };

    const handleChange = (event) => {
        const {name , value } = event.target;
        props.setPopupData((prev) => {
            return {
                ...prev,
                [name]: value.toLowerCase() === "true" ? true : value.toLowerCase() === "false" ? false : value
            };
        });
        setUpdataedData(prev => {
            return {
                ...prev,
                [name]: value.toLowerCase() === "true" ? true : value.toLowerCase() === "false" ? false : value
            };
        });
    };

    const saveChanges = () => {
        updateUserData(props.data._id, updatedData).then(data => {
            if(data.error){
                errorMessage(data.msg);
            } else {
                successMessage(data.msg);
                setEdit(false);
            }
        });
    };

    const deleteUser = () => {
        deleteUserData(props.data._id).then(data => {
            if(data.error){
                errorMessage(data.msg);
            } else {
                successMessage(data.msg);
                startHidePopup();
                setShowConf(false);
            }
        });
    };

    const showConfBox = () => {
        setShowConf(true);
    };

    const successMessage = (msg) => {
        toast.success(msg , {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };

    const errorMessage = (error) => {
        if(error){
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
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
    // 
    return (
        <div className="position-absolute top-0 w-50 left-0" style={props.showSlowly ? showSlowly : hideSlowly }>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <div className=" m-5 p-5 rounded-3 bg-white">
                <div className="close-button">
                    <div onClick={startHidePopup} className="position-absolute right-0 top-0 m-5 p-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                    </div>
                </div>
                <div class="details">
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center fs-6 ls-1 fw-bold">Name</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="name" name="name" readOnly={!edit} value={props.data.name}/>
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Email</label>
                        <input className="form-control col-9 " onChange={handleChange}  type="email" placeholder="email" name="email" readOnly={!edit} value={props.data.email} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Phone Number</label>
                        <input className="form-control col-9 " onChange={handleChange} type="tel" placeholder="1234567890" name="phoneNumber" readOnly={!edit} value={props.data.phoneNumber} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Endeavour Id</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="ENDVR20211234567890" name="endvrid" readOnly={!edit} value={props.data.endvrid} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Semester</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="Semester" name="semester" readOnly={!edit} value={props.data.semester} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Confirmed</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="true/false" name="confirmed" readOnly={!edit} value={props.data.confirmed} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Profile</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="true/false" name="profile" readOnly={!edit} value={props.data.profile} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">College</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="College Name" name="college" readOnly={!edit} value={props.data.college} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Discord Id</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="Pranav#1234" name="discord" readOnly={!edit} value={props.data.discord} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Event Pass</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="true/false" name="eventPass" readOnly={!edit} value={props.data.eventPass} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Internship</label>
                        <input className="form-control col-9 " onChange={handleChange} type="text" placeholder="true/false" name="internship" readOnly={!edit} value={props.data.internship} />
                    </div>
                    <div className="each-line row py-2">
                        <label className=" col-3 align-self-center ls-1 fs-6 fw-bold">Events Registered</label>
                        <div className="col-9">
                            <div className="d-flex flex-wrap justify-content-around">
                                {
                                    props.data.myEvents ?
                                    props.data.myEvents.length >= 0 ?
                                    props.data.myEvents.map(event => {
                                        return (<li key={event.eventId} className="p-1">{event.eventName}</li>);
                                    }) : (<li className="p-1">Not Registered in Any Event</li>) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="each-line row py-2">
                        {
                            edit ? <button onClick={saveChanges} className="btn col btn-primary fs-6 ls-1 py-3 me-2">Save Changes</button>
                            : <button onClick={() => setEdit(true)} className="btn col btn-primary fs-6 ls-1 py-3 me-2">Edit</button>
                        }
                        <button onClick={showConfBox} className="btn col btn-danger fs-6 ls-1 py-3 ms-2">Delete</button>
                    </div>
                </div>
            </div>
            <ModalPopup show={showConf} setShow={setShowConf} deleteUser={deleteUser} heading={`Delete ${props.data.name}`} name={props.data.name} email={props.data.email} />
        </div>
    );
}

export default DetailsPopup;