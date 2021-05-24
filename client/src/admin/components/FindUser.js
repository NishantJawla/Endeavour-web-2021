//jshint esversion: 8
import React, { useState } from "react";
import SearchMenu from "./SeachMenu";
import EachUserLine from "./sub-components/EachUserLine";

function FindUser(){

    const [userData, setUserData] = useState([]);

    const showUsers = () => {
        return userData.map((user, index) => {
            return (
                <React.Fragment>
                    <EachUserLine
                        key={user.endvrid} 
                        index={index}
                        user={user}
                    />
                </React.Fragment>
            );
        });
    };

    return (
        <div className="p-3">
            <SearchMenu setUserData={setUserData} />
            <div className="count pt-5">
                <div className="color-white fs-5 ls-2 fw-bold">Count: 50</div>
            </div>
            <div className="usersInfo pt-3">
                <table class="table color-white">
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
        </div>
    );
}

export default FindUser;