//jshint esversion: 8
import React, { useState, useEffect } from "react";
import { getUsers } from "./../helper/adminapicall"
import EachUserLine from "./sub-components/EachUserLine";
import DetailsPopup from "./sub-components/DetailsPopup";

function FindAllUsers(){

    const [userData, setUserData] = useState([]);
    const [popupData, setPopupData] = useState({});
    const [showSlowly, setShowSlowly] = useState(false);

    useEffect(() => {
        getUsers(setUserData);
    }, []);

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
                        key={user._id} 
                        index={index}
                        user={user}
                        setShowSlowly={setShowSlowly}
                        setPopupData={setPopupData}
                    />
                </React.Fragment>
            );
        }) : ""
    };

    const importCSV = () => {
        const csvRows = [];
        const newHeaders = [
            "endvrid",
            "name",
            "email",
            "phoneNumber",
            "discord",
            "semester",
            "branch",
            "college",
            "libId",

        ];
        const headers = {
            EndeavourId: "",
            Name: "",
            Email:'',
            PhoneNumber: '',
            DiscordId: '',
            Semester: '',
            Branch: '',
            College: '',
            LiberaryId: '',
        }
        csvRows.push(Object.keys(headers).join(","));

        for(const row of userData ){
            const values = newHeaders.map(header => {
                const escaped = (''+row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        const joinedCSV = csvRows.join('\n');
        
        const url = window.URL.createObjectURL(new Blob([joinedCSV], {type: 'text/csv'}));
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="p-3">
            <div className="count pt-3 d-flex justify-content-around">
                <div className="color-white fs-5 ls-2 fw-bold">Count: {userData.length}</div>
                <button onClick={() => {importCSV()}} className="px-5 mx-3 py-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Download CSV</button>
            </div>
            <div className="">
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
            <DetailsPopup data={popupData} showSlowly={showSlowly} setPopupData={setPopupData} setShowSlowly={setShowSlowly} />
        </div>
    );
}

export default FindAllUsers;