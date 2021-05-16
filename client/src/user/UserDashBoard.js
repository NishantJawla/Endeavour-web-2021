//jshint esversion: 8
import React, { useState, useEffect, useLayoutEffect } from 'react';
import profileImg from "./../assets/img/icons/profilepic.jpg";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line
import { getUserData, getEventData,authenticate, updateProfile ,isAuthenticated, getRegisteredEvents} from "./../auth/helper/index";

const UserDashBoard = (props) => {
    // eslint-disable-next-line
    const { user, token } = isAuthenticated();
    const [userData, setUserData] = useState({});
    // eslint-disable-next-line
    const [events, setEvents] = useState([]);
    const [updatedData, setUpdatedData] = useState({
        branch: user.branch ? user.branch : "",
        libId: user.libId ? user.libId : "",
        college: user.college ? user.college : "",
        discord: user.discord ? user.discord : "",
        semester: user.semester ? user.semester :"1",
        error: ""
    });
    const {branch,libId,college,discord,semester,error} = updatedData;
    function handleChange(event){
        const {name, value} = event.target;
        setUpdatedData(prevData => {
            if(name === "branch"){
                return {
                    ...prevData,
                    branch: value
                }
            } else if(name === "libId"){
                return {
                    ...prevData,
                    libId: value
                }
            } else if(name === "clgName"){
                return {
                    ...prevData,
                    college: value
                }
            } else if(name === "semester"){
                return {
                    ...prevData,
                    semester: value
                }
            } else if(name === "discordId"){
                return {
                    ...prevData,
                    discord: value
                }
            } 
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(userData.profile){
            //profile is already updated add toster
            successMessage2();
        } else {
            updateProfile(updatedData).then(data => {
                if(data.error){
                    errorMessage()
                    setUpdatedData({
                        ...updatedData,
                        error: data.error
                    });
                } else {
                    authenticate(data, () => {
                        setUpdatedData({
                        ...updatedData,
                        });
                    });
                    successMessage()
                }
            });
            console.log("updatiung");
        }
    };
    const successMessage2 = () => {
        toast.success('Profile Already updated Once', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };
    const successMessage = () => {
        toast.success('Profile Updated successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };
    const errorMessage = () => {
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

    const showRegistesterdEvents = () => {
        console.log(events);
        return (
            events.map((event, index) => {
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{event.eventName}</td>
                        <td>Registered</td>
                        <td className={event.paidStatus ? "color-registered" : ""}>{event.paidStatus ? "Paid" : "UnPaid"}</td>
                    </tr>
                );
            })
        );
    }

    // function updateProfile (event){
    //     event.preventDefault();
    //     if(userData.profile){
    //         //profile is already updated add toster
    //         console.log("profile already updated");
    //     } else {
    //         updateProfile(updatedData);
    //         console.log("updatiung");
    //     }
    // }

    useEffect(() => {
        getUserData(setUserData);
        getRegisteredEvents(setEvents);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className="profile-container py-5 bg-sec-pattern bg-norepeat">
            <div className="container py-5">
            <div className="heading-font py-3 color-white text-center fw-bold">User Dashboard</div>
                <div className="row profile pt-5 color-white">
                    <div className="col-lg-5 col-md-10">
                        <div className="w-50 m-auto overflow-hidden rounded-circle">
                            <img className="profile-pic" width="100%" height="100%" src={profileImg} alt="profil_pic" />
                        </div>
                        <div className="profile-info color-white py-4 text-center">
                            <div className="fs-6 ls-1 py-1 fw-bold ">{userData.name}</div>
                            <div className="fs-6 ls-1 py-1">{userData.email}</div>
                            <div className="fs-6 ls-1 py-1 fw-bold ">{userData.endvrid}</div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-10">
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
                        <div className="fs-5 fw-bold pb-3 ls-1">Update Profile</div>
                        <div className="profile-update-note py-3 color-white italic ls-1 fw-bold">The Profile can be only updated once. Make sure to enter the Correct Data.</div>
                        <form className="edit-details" action="" method="">
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label htmlFor="Username">Branch: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input onChange={handleChange} value={updatedData.branch} className="form-control p-3 border-0" type="text" name="branch" placeholder="Branch" required/>
                                </div>
                            </div>

                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Library Id (Only for KIET Students): </label>
                                </div>
                                <div className="col-lg-9">
                                    <input onChange={handleChange} value={updatedData.libId} className="form-control p-3 border-0" type="text" name="libId" placeholder="Library Id" />
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">College Name: </label>
                                </div>
                                <div className="col-lg-9">
                                    <input onChange={handleChange} value={updatedData.college} className="form-control p-3 border-0" type="text" name="clgName" placeholder="College Name" required />
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Semester: </label>
                                </div>
                                <div className="col-lg-9">
                                    <select onChange={handleChange} name="semester" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "1" ? true : false} value="1">I</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "2" ? true : false} value="2">II</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "3" ? true : false} value="3">III</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "4" ? true : false} value="4">IV</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "5" ? true : false} value="5">V</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "6" ? true : false} value="6">VI</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "7" ? true : false} value="7">VII</option>
                                        <option className="color-secondary" selected={updatedData.semester.toString() === "8" ? true : false} value="8">VIII</option>
                                    </select>    
                                </div>
                            </div>
                            <div className="row py-2 ls-1 fs-6">
                                <div className="col-lg-3">
                                    <label for="Username">Discord Id (user#1234): </label>
                                </div>
                                <div className="col-lg-9">
                                    <input onChange={handleChange} value={updatedData.discord} className="form-control p-3 border-0" type="text" name="discordId" placeholder="user#1234" required/>
                                </div>
                            </div>
                            <div className="row py-4">
                                <div className="col">
                                    <button type="submit" onClick={onSubmit} className="w-100 rounded bg-primary .hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3">Update Profile</button>
                                </div>
                                <div className="col">
                                    <button type="reset" className="w-100 rounded bg-secondary color-white fs-6 border-0 ls-1 fw-bold py-3">Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row pt-5 color-white">
                    <div className="fs-5 fw-bold pb-3 ls-1">Registerd Events</div>
                    <div className="events-registerd-table">
                    <table class="table color-white">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Registered</th>
                            <th scope="col">Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events ? showRegistesterdEvents() : ""}
                            {/* <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr> */}
                        </tbody>
                    </table>
                        {/* <div className="row col-head py-3 ls-1 fw-bold">
                            <div className="col">
                                Serial No.
                            </div>
                            <div className="col">
                                Event Name
                            </div>
                            <div className="col">
                                Status
                            </div>
                            <div className="col">
                                Paid Status
                            </div>
                        </div>*/ }
                        {/* <div className="row py-2 ls-1">
                            <div className="col">
                                1.
                            </div>
                            <div className="col">
                                Hackathon
                            </div>
                            <div className="col color-registered">
                                Registered
                            </div>
                            <div className="col color-registered">
                                Paid
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
                            <div className="col py-1 not-registerd cursor-pointer">
                                <div className="">Not paid</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard;
