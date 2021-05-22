//jshint esversion: 8
import React, { useEffect, useState } from "react";
import "./css/admin.css";
import profileImg from "./../assets/img/superman.png";
import { getEventId } from "./helper/EventIds";
import { registrationsPerEvent, getUsersCount, getUsersByEvent, getTeamHeads, getTeamHeadsAll, getUserFromEndvrId, getUserFromMobile, getUsers, updatepaidstatuseventbymail, updatepaidstatuseventbyphone,updatepaidstatusinternshipbyphone,
    updatepaidstatusinternshipbymail} from "./helper/adminapicall"; 
import { isAuthenticated } from "./../auth/helper/index";
import { API } from "../backend";
import axios from "axios";
function AdminDashboard() {

    const [data, setData] = useState([]);
    
    const [usersPerEvent, setUsersPerEvent] = useState(["fweg", "fewgweg", "Gwgewg","gwegewg"]);

    const [totalUsers, setTotalUsers] = useState(0);

    const [endvrId, setEndvrId] = useState("");

    const [mobileno, setMobileNo] = useState("");

    const [paidStatus, setPaidStatus] = useState(false);

    const [someData, setsomeData] = useState({
        total: "loading...",
        confirmed: "loading...",
        profile: "loading...",
        eventpass: "loading...",
        internship: "loading...",
        first: "loading...",
        second: "loading...",
        third: "loading...",
        fourth: "loading..."
    })

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
        async function main() {
            const {user, token} = isAuthenticated();
            var serverData1 = await axios.get(`${API}admin/eventstatus`, {
                headers: { Authorization: `${token}` }
            })
            var serverData2 = await axios.get(`${API}admin/getuserbyyear`, {
                headers: { Authorization: `${token}` }
            })
            // 
            console.log(serverData2.data);
            setsomeData({
                total: serverData1.data.Total,
                confirmed: serverData1.data.Confirmed,
                profile: serverData1.data.profile,
                eventpass: serverData1.data.eventPass,
                internship: serverData1.data.internship,
                first: serverData2.data.first,
                second: serverData2.data.second,
                third: serverData2.data.third,
                fourth: serverData2.data.fourth
            })
        }
        main()
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
        updatepaidstatuseventbymail(endvrId);
    }
    const changeinternshipstatusbyemail = (event) => {
        event.preventDefault();
        updatepaidstatusinternshipbymail(endvrId)
    }
    const getUsersByMobile = (event) => {
        event.preventDefault();
        updatepaidstatuseventbyphone(mobileno)
    }
    const changeinternshipstatusbyphone = (event) => {
        event.preventDefault();
        updatepaidstatusinternshipbyphone(mobileno)
    }
    function getUsersData(){
        getUsers(setData);
    }

    function showUsersPerEvent(event) {
        return (
            <div className="py-3 d-flex">
                <div className="ls-1 fs-6 pe-3">Total no of Uses Registerd in </div>
                <div className="ls-1 fs-6 fw-bold">{event.teamCountRegisterd}</div>
            </div>
        );
    }
    const {user , token} = isAuthenticated();

    return (
        <React.Fragment>
            <div className="admin-portal bg-sec-pattern bg-norepeat py-5">
                <div className="container py-5">
                    <div className="heading-font py-3 color-white text-center fw-bold">Justice League Dashboard</div>
                    <div className="row profile pt-5 color-white">
                        <div className="col-lg-5 col-md-10">
                            <div className="w-50 m-auto overflow-hidden rounded-circle">
                                <img className="profile-pic" width="100%" height="100%" src={profileImg} alt="profil_pic" />
                            </div>
                            <div className="profile-info color-white py-4 text-center">
                                <div className="fs-6 ls-1 py-1 fw-bold ">Justice League</div>
                                <div className="fs-6 ls-1 py-1">Hi! {user.name}</div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-10">
                            <div className="fs-4 fw-bold pb-2 ls-1">Registration Info</div>
                            <div className="admin-info px-3">
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Total no of Users Registerd: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.total}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Total no of Confirmed Users: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.confirmed}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Total no of profile completed: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.profile}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Event Pass kitno ne liya hai: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.eventpass}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Naukri kitne logo ko chaiye: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.internship}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">First Year Vale: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.first}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Second Year Vale: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.second}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Third Year Vale: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.third}</div>
                                </div>
                                <div className="py-3 d-flex">
                                    <div className="ls-1 fs-5 fw-bold pe-3">Fourth Year Vale: </div>
                                    <div className="ls-1 fs-5 fw-bold">{someData.fourth}</div>
                                </div>
                                {/* <div className="ls-1 fs-5 py-4 fw-bold">Registrations Per Event
                                </div> */}
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
                                    {/* {usersPerEvent.map(user => {
                                        return (<div className="py-3 d-flex">
                                            <div className="ls-1 fs-6 pe-3">Total no of Uses {user.eventName}: </div>
                                            <div className="ls-1 fs-6 fw-bold">{user.teamCountRegisterd}</div>
                                        </div>)
                                    })} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row getevets-data pt-5 color-white fs-6 ls-1 color-white">
                        <div className="">
                            <div className="fs-4 fw-bold pb-2 ls-1">Functions</div>
                            {/* <div className="">
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
                            </div> */}
                            {/* <div className="py-4">
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
                            </div> */}
                            <div> Change Paid Status of event Pass
                            <div className="py-4">
                                <div className="fw-bold fs-5">BY Email</div>
                                <div>
                                    <input onChange={changeEndvrId} type="text" name="endvrid" value={endvrId} placeholder="Email" />
                                    <button onClick={getUsersByEndvrId} className="btn btn-secondary">Change</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">By mobile Number from endvrId</div>
                                <form>
                                    <input onChange={changeMobileno} value={mobileno} type="tel" name="mobileno" placeholder="mobileno" />
                                    <button onClick={getUsersByMobile} className="btn btn-secondary">Change</button>
                                </form>
                            </div>
                            </div>
                            <div> Change Paid Status of internship
                            <div className="py-4">
                                <div className="fw-bold fs-5">BY Email</div>
                                <div>
                                    <input onChange={changeEndvrId} type="text" name="endvrid" value={endvrId} placeholder="Email" />
                                    <button onClick={changeinternshipstatusbyemail} className="btn btn-secondary">Change</button>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="fw-bold fs-5">By mobile Number from endvrId</div>
                                <form>
                                    <input onChange={changeMobileno} value={mobileno} type="tel" name="mobileno" placeholder="mobileno" />
                                    <button onClick={changeinternshipstatusbyphone} className="btn btn-secondary">Change</button>
                                </form>
                            </div>
                            </div>
                            {/* <div className="py-4">
                                <div className="fw-bold fs-5">Get users</div>
                                <button onClick={getUsersData} value="all" className="btn btn-secondary">All</button>
                                {/* <button onClick={getUsersData} value="paid" className="btn btn-secondary mx-3 my-3 color-white">Paid</button>
                                <button onClick={getUsersData} value="unpaid" className="btn btn-secondary mx-3 my-3 color-white">Unpaid</button> 
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;