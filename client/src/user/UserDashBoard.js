//jshint esversion: 8
import React from 'react';
import profileImg from "./../assets/img/icons/profilepic.jpg";

const UserDashBoard= () => {
    return (
        <div className="profile-container py-5 bg-sec-pattern bg-norepeat">
            <div className="container py-5">
            <div className="heading-font py-3 color-white text-center fw-bold">User Dashboard</div>
                <div className="row profile pt-5 color-white">
                    <div className="col-lg-5 col-md-10">
                        <div className="w-50 m-auto overflow-hidden rounded-circle">
                            <img className="profile-pic" width="100%" height="100%" src={profileImg} alt="profil_pic" />
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-10">
                        <div className="fs-5 fw-bold pb-3 ls-1">Personal Info</div>
                        <form className="edit-details" action="" method="">
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Username: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input className="form-control p-3 border-0" type="text" name="username" />
                                </div>
                            </div>

                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Username: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input className="form-control p-3 border-0" type="text" name="username" />
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Username: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input className="form-control p-3 border-0" type="text" name="username" />
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Username: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input className="form-control p-3 border-0" type="text" name="username" />
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Username: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input className="form-control p-3 border-0" type="text" name="username" />
                                </div>
                            </div>
                            <div className="row py-4">
                                <div className="col">
                                    <button className="w-100 rounded bg-primary .hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3">Save Changes</button>
                                </div>
                                <div className="col">
                                    <button className="w-100 rounded bg-secondary color-white fs-6 border-0 ls-1 fw-bold py-3">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row pt-5 color-white">
                    <div className="fs-5 fw-bold pb-3 ls-1">Registerd Events</div>
                    <div className="events-registerd-table">
                        <div className="row col-head py-3 ls-1 fw-bold">
                            <div className="col">
                                Serial No.
                            </div>
                            <div className="col">
                                Event Name
                            </div>
                            <div className="col">
                                Status
                            </div>
                        </div>
                        <div className="row py-2 ls-1">
                            <div className="col">
                                1.
                            </div>
                            <div className="col">
                                Hackathon
                            </div>
                            <div className="col color-registered">
                                Registered
                            </div>
                        </div>
                        <div className="row py-2 ls-1">
                            <div className="col">
                                2.
                            </div>
                            <div className="col">
                                Market Watch
                            </div>
                            <div className="col py-1 not-registerd cursor-pointer">
                                <div className="">Register Now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard
