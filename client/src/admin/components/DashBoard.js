//jshint esversion: 8
import React, { useState, useEffect } from "react";
import { registrationsPerEvent, getGeneralEventData, getUsersPerYear } from "./../helper/adminapicall";

function DashBoard() {

    const [registerdUsersCount, setRegisteredUsersCount] = useState([]);
    const [generalData, setGeneralData] = useState({});
    const [usersPerYear, setUsersPerYear] = useState({});
    
    useEffect(() => {
        registrationsPerEvent(setRegisteredUsersCount);
        getGeneralEventData(setGeneralData);
        getUsersPerYear(setUsersPerYear);
        // registerdUsersCount.push({
        //     eventName: "Intership Fair",
        //     teamCount: generalData.internship
        // });
    }, []);

    // const showRegistationsPerEvent = () => {
    //     if(registerdUsersCount) {
    //         registerdUsersCount.forEach(event => {
    //             console.log(event);
                
    //                 <div className="color-white m-4 text-center ls-1">
    //                     <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
    //                         {event.teamCountPaid}
    //                     </div>
    //                     {event.eventName}
    //                 </div>
    //         });
    //     }
    // };

    return (
        <div className="admin-dashboard px-3 py-3">
            <div className="registration-info ">
                <div className="color-white px-3 fs-4 fw-bold ls-1">Registration Info</div>
                <div className="py-3 each-info">
                    <div className="color-white px-3 fs-5 ls-1 fw-bold">General Info</div>
                    <div className="d-flex justify-content-around pt-3">
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {generalData ? generalData.total : "loading..."}
                            </div>
                            Registred
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {generalData ? generalData.confirmed : "loading..."}
                            </div>
                            Confirmed
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {generalData ? generalData.profile : "loading..."}
                            </div>
                            Profile Completed
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {generalData ? generalData.eventPass : "loading..."}
                            </div>
                            Pass Purchased
                        </div>
                    </div>
                </div>
                <div className="py-3 each-info">
                    <div className="color-white px-3 fs-5 ls-1 fw-bold">Users Classification</div>
                    <div className="d-flex justify-content-around pt-3">
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {usersPerYear ? usersPerYear.first : ""}
                            </div>
                            First Year
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {usersPerYear ? usersPerYear.second : ""}
                            </div>
                            Second Year
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {usersPerYear ? usersPerYear.third : ""}
                            </div>
                            Third Year
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {usersPerYear ? usersPerYear.fourth : ""}
                            </div>
                            Fourth Year
                        </div>
                    </div>
                </div>
                <div className="py-3 each-info">
                    <div className="color-white px-3 fs-5 ls-1 fw-bold">Events Info</div>
                    <div className="d-flex flex-wrap justify-content-around pt-3">
                        {
                            registerdUsersCount ? 
                            registerdUsersCount.map((event, index) => {
                                return (
                                    event.eventName !== "Hackathon" && event.eventName !== "Event Pass" && event.eventName !== "InternShip Fair" ? 
                                    <div className="color-white m-4 text-center ls-1">
                                        <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                            {event.teamCountPaid}
                                        </div>
                                        {event.eventName}
                                    </div> : ""
                                )
                            }) : ""
                        }
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                {generalData.internship}
                            </div>
                            Internship Fair
                        </div>
                        {/* <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            B-Plan
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            B-Quiz
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Rags to Riches
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Market Watch
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Corporate Mystry
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Treasure Hunt
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Treasure Hunt
                        </div>
                        <div className="color-white m-4 text-center ls-1">
                            <div className="bg-orange text-center p-3 mb-2 fs-1 rounded-3 fw-bold ls-2">
                                148
                            </div>
                            Treasure Hunt
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;