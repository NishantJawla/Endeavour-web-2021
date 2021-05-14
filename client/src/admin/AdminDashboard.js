//jshint esversion: 8
import React, { useEffect, useState } from "react";
import "./css/admin.css";
import profileImg from "./../assets/img/icons/profilepic.jpg";
import { getEventId } from "./helper/EventIds";
import { registrationsPerEvent, getUsersCount, getUsersByEvent, getTeamHeads, getTeamHeadsAll, getUserFromEndvrId, getUserFromMobile, getUsers } from "./helper/adminapicall"; 

function AdminDashboard() {

    const [data, setData] = useState([]);
    
    const [usersPerEvent, setUsersPerEvent] = useState(["fweg", "fewgweg", "Gwgewg","gwegewg"]);

    const [totalUsers, setTotalUsers] = useState({});

    const [endvrId, setEndvrId] = useState("");

    const [mobileno, setMobileNo] = useState("");

    const [paidStatus, setPaidStatus] = useState(false);

    function changePaidStatus(event) {
        const {value} = event.target;
        setPaidStatus(value);
    }

    function changeEndvrId(event){
        const {value} = event.target;
        setEndvrId(value);
    }

    function changeMobileno(event){
        const { value } = event.target;
        setMobileNo(value);
    }

    useEffect(() => {
        registrationsPerEvent(setUsersPerEvent);
        getUsersCount(setTotalUsers);
    }, []);

    function getusersByEvent(event){
        const { value } = event.target;
        const eventId = getEventId(value);
        getUsersByEvent(eventId, paidStatus, setData);
    } 

    function getTeamheads(event){
        const { value } = event.target;
        if(value === "all"){
            getTeamHeadsAll(paidStatus, setData);
        } else {
            const eventId = getEventId(value);
            getTeamHeads(eventId, paidStatus, setData);
        }
    }

    function getUsersByEndvrId(){
        getUserFromEndvrId(endvrId, setData);
    }

    function getUsersByMobile(){
        getUserFromMobile(mobileno, setData);
    }

    function getUsersData(event){
        const { value } = event.target;
        getUsers(value, setData);
    }

    return (
        <React.Fragment>
            <div className="admin-portal bg-sec-pattern bg-norepeat py-5">
                <div className="container py-5">
                    <div className="heading-font py-3 color-white text-center fw-bold">Admin Dashboard</div>
                    <div className="row profile pt-5 color-white">
                        <div className="col-lg-5 col-md-10">
                            <div className="w-50 m-auto overflow-hidden rounded-circle">
                                <img className="profile-pic" width="100%" height="100%" src={profileImg} alt="profil_pic" />
                            </div>
                            <div className="profile-info color-white py-4 text-center">
                                <div className="fs-6 ls-1 py-1 fw-bold ">Name</div>
                                <div className="fs-6 ls-1 py-1">admin@endeavour</div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-10">
                            <div className="fs-4 fw-bold pb-2 ls-1">Registration Info</div>
                            <div className="admin-info px-3">
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Total no of Uses Registerd: </div>
                                    <div className="ls-1 fs-5 fw-bold">45</div>
                                </div>
                                <div className="ls-1 fs-5 py-4 fw-bold">Registrations Per Event
                                </div>
                                <div className="users-by-events d-flex justify-content-between flex-wrap">
                                    {/* <div className="py-3 d-flex">
                                        <div className="ls-1 fs-6 pe-3">Total no of Uses Registerd: </div>
                                        <div className="ls-1 fs-6 fw-bold">45</div>
                                    </div>
                                    <div className="py-3 d-flex">
                                        <div className="ls-1 fs-6 pe-3">Total no of Uses Registerd: </div>
                                        <div className="ls-1 fs-6 fw-bold">45</div>
                                    </div>
                                    <div className="py-3 d-flex">
                                        <div className="ls-1 fs-6 pe-3">Total no of Uses Registerd: </div>
                                        <div className="ls-1 fs-6 fw-bold">45</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row getevets-data pt-5 color-white fs-6 ls-1 color-white">
                        <div className="">
                            <div className="fs-4 fw-bold pb-2 ls-1">Filters</div>
                            <div className="">
                                <div className="fw-bold fs-5">Get Users By Event</div>
                                <div className="d-flex ">
                                    <input onChange={changePaidStatus} name="paidstatus" value="all" type="radio" />All
                                    <input onChange={changePaidStatus} name="paidstatus" value="paid" type="radio" className="ms-4"  />Paid
                                    <input onChange={changePaidStatus} name="paidstatus" value="unpaid" type="radio" className="ms-4" />Unpaid
                                    </div>
                                <div className="">
                                    <button onClick={getusersByEvent} value="bpaln" className="btn btn-secondary mx-3 my-3 color-white">B Plan</button>
                                    <button onClick={getusersByEvent} value="bquiz" className="btn btn-secondary mx-3 my-3 color-white">B Quiz</button>
                                    <button onClick={getusersByEvent} value="hackathon" className="btn btn-secondary mx-3 my-3 color-white">Hackathon</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get Team heads</div>
                                <div className="d-flex ">
                                    <input onChange={changePaidStatus} name="paidstatus" value="all" type="radio" />All
                                    <input onChange={changePaidStatus} name="paidstatus" value="paid" type="radio" className="ms-4" />Paid
                                    <input onChange={changePaidStatus} name="paidstatus" value="unpaid" type="radio" className="ms-4" />Unpaid
                                    </div>
                                <div className="">
                                    <button onClick={getTeamheads} name="all" className="btn btn-secondary mx-3 my-3 color-white">All Events</button>
                                    <button onClick={getTeamheads} name="bpaln" className="btn btn-secondary mx-3 my-3 color-white">B Plan</button>
                                    <button onClick={getTeamheads} name="bquiz" className="btn btn-secondary mx-3 my-3 color-white">B Quiz</button>
                                    <button onClick={getTeamheads} name="hackathon" className="btn btn-secondary mx-3 my-3 color-white">Hackathon</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get User using endeavour ID</div>
                                <div>
                                    <input onChange={changeEndvrId} type="text" name="endvrid" value={endvrId} placeholder="endeavour id" />
                                    <button onClick={getUsersByEndvrId} className="btn btn-secondary">Search</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get User using mobile Number</div>
                                <form>
                                    <input onChange={changeMobileno} value={mobileno} type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" name="mobileno" placeholder="mobileno" />
                                    <button onClick={getUsersByMobile} className="btn btn-secondary">Search</button>
                                </form>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get users</div>
                                <button onClick={getUsersData} value="all" className="btn btn-secondary">All</button>
                                <button onClick={getUsersData} value="paid" className="btn btn-secondary mx-3 my-3 color-white">Paid</button>
                                <button onClick={getUsersData} value="unpaid" className="btn btn-secondary mx-3 my-3 color-white">Unpaid</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;