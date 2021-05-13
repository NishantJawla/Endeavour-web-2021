//jshint esversion: 8
import React from "react";
import "./css/admin.css";
import profileImg from "./../assets/img/icons/profilepic.jpg";

function AdminDashboard() {

    function handleClick(event){
        console.log("clicked");
        console.log(event.target.value);
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
                                    <div className="py-3 d-flex">
                                        <div className="ls-1 fw-6 pe-3">Total no of Uses Registerd: </div>
                                        <div className="ls-1 fw-6 fw-bold">45</div>
                                    </div>
                                    <div className="py-3 d-flex">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row getevets-data pt-5 color-white fs-6 ls-1 color-white">
                        <div className="">
                            <div className="fs-4 fw-bold pb-2 ls-1">Filters</div>
                            <div className="">
                                <div className="fw-bold fs-5">Get Paid Users By Event</div>
                                <div className="d-flex ">
                                    <input name="paidstatus" value="paid" type="radio" />Paid
                                    <input name="paidstatus" value="unpaid" type="radio" className="ms-4" />Unpaid
                                    </div>
                                <div className="">
                                    <button onClick={handleClick} value="bpaln" className="btn btn-secondary mx-3 my-3 color-white">B Plan</button>
                                    <button onClick={handleClick} value="bquiz" className="btn btn-secondary mx-3 my-3 color-white">B Quiz</button>
                                    <button onClick={handleClick} value="hackathon" className="btn btn-secondary mx-3 my-3 color-white">Hackathon</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get all users who have paid</div>
                                <button onClick={handleClick} className="btn btn-secondary">By Payment</button>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get Team heads</div>
                                <div className="d-flex ">
                                    <input name="paidstatus" value="paid" type="radio" />Paid
                                    <input name="paidstatus" value="unpaid" type="radio" className="ms-4" />Unpaid
                                    </div>
                                <div className="">
                                    <button onClick={handleClick} name="all" className="btn btn-secondary mx-3 my-3 color-white">All</button>
                                    <button onClick={handleClick} name="bpaln" className="btn btn-secondary mx-3 my-3 color-white">B Plan</button>
                                    <button onClick={handleClick} name="bquiz" className="btn btn-secondary mx-3 my-3 color-white">B Quiz</button>
                                    <button onClick={handleClick} name="hackathon" className="btn btn-secondary mx-3 my-3 color-white">Hackathon</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get User using endeavour ID</div>
                                <div>
                                    <input type="text" name="endvrid" placeholder="endeavour id" />
                                    <button onClick={handleClick} className="btn btn-secondary">Search</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get User using mobile Number</div>
                                <input type="text" name="mobileno" placeholder="endeavour id" />
                                <button onClick={handleClick} className="btn btn-secondary">Search</button>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">Get all users</div>
                                <div className="d-flex ">
                                    <input name="paidstatus" value="paid" type="radio" />Paid
                                    <input name="paidstatus" value="unpaid" type="radio" className="ms-4" />Unpaid
                                </div>
                                <button onClick={handleClick} className="btn btn-secondary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;