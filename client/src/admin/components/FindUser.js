//jshint esversion: 8
import React, { useState } from "react";
import SearchMenu from "./SeachMenu";
import EachUserLine from "./sub-components/EachUserLine";
import DetailsPopup from "./sub-components/DetailsPopup";

function FindUser(){

    const [userData, setUserData] = useState([]);
    const [popupData, setPopupData] = useState({});
    const [showSlowly, setShowSlowly] = useState(false);

    const showUsers = () => {
        // const temp = [1,2,3,4,5,6,7,8];
        // return userData.map((user, index) => {
        //     return (
        //         <React.Fragment>
        //             <EachUserLine
        //                 key={user.endvrid} 
        //                 index={index}
        //                 user={user}
        //                 setShowSlowly={setShowSlowly}
        //                 setPopupData={setPopupData}
        //             />
        //         </React.Fragment>
        //     );
        // });
        return userData ? userData.map((user, index) => {
            return (
                <React.Fragment>
                    <EachUserLine
                        key={user.endvrid} 
                        index={index}
                        user={user}
                        setShowSlowly={setShowSlowly}
                        setPopupData={setPopupData}
                    />
                </React.Fragment>
            );
        }) : ""
    };

    return (
        <div className="p-3">
            <SearchMenu setUserData={setUserData} />
            <div className="count pt-5">
                <div className="color-white fs-5 ls-2 fw-bold">Count: {userData.length}</div>
            </div>
            <div className="usersInfo pt-3">
                <table className="table color-white">
                    <thead>
                        <tr className="color-white">
                            <th scope="col">#</th>
                            <th scope="col">Endeavour Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Semester</th>
                            <th scope="col">College</th>
                            <th scope="col">Profile</th>
                            <th scope="col">Event Pass</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody >
                        {showUsers()}
                    </tbody>
                </table>
            </div>
            <DetailsPopup data={popupData} showSlowly={showSlowly} setSlowSlowly={setShowSlowly} />
        </div>
    );
}

export default FindUser;