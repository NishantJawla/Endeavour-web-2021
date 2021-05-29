//jshint esversion: 8
import React, { useState } from "react";
import { queryDataBase, getUsers } from "./../helper/adminapicall";

function SearchMenu(props){

    const [userOption, setUserOption] = useState("");
    const [tempData, setTempData] = useState();
    const [optionValue, setOptionValue] = useState("");
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "main-options"){
            setUserOption(value);
            setOptionValue("");
        } else {
            setOptionValue(value);
        }
    };

    const submit = () => {
        if(userOption === "event"){
            if(optionValue === "60a0b51ca45a7705fc059d83"){
                getUsers(setTempData);
                const eventUsers = [];
                if(tempData){
                    tempData.forEach(user => {
                        if(user.internship){
                            eventUsers.push(user);
                        }
                    });
                }
                props.setUserData(eventUsers);
            } else {
                getUsers(setTempData);
                const eventUsers = [];
                if(tempData){
                    tempData.forEach(user => {
                        user.myEvents.forEach(event => {
                            if(event.eventId === optionValue){
                                eventUsers.push(user);
                            }
                        });
                    });
                }
                props.setUserData(eventUsers);
            }

        } else {
            const options = {
                key: userOption,
                value: optionValue 
            };
            queryDataBase(options, props.setUserData);
        }
    }

    return (
        <div className="search-menu">
            <div className="row">
                <div className="col-2 offset-1">     
                    <select onChange={handleChange} name="main-options" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                        <option className="color-secondary">Select Category</option>
                        <option className="color-secondary" title="Using Endeavour Id" value="endvrid">Using Endeavour Id</option>
                        <option className="color-secondary" title="Using Email" value="email">Using Email</option>
                        <option className="color-secondary" title="Using MobileNo" value="phoneNumber">Using MobileNo</option>
                        <option className="color-secondary" title="using Discord Id" value="discord">Using Discord Id</option>
                        <option className="color-secondary" title="By events" value="event">By events</option>
                        <option className="color-secondary" title="By Event Pass" value="eventPass">By Event Pass</option>
                        <option className="color-secondary" title="By Profile" value="profile">By Profile</option>
                    </select>
                </div>
                <div className="offset-1 col-5">
                    {
                        userOption === "endvrid" ? 
                        <div className="endeavourId d-flex">
                            <input onChange={handleChange} className="form-control p-4" type="text" placeholder="Endeavour Id" name="endurId" value={optionValue} required/>
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "email" ? 
                        <div className="email d-flex">
                            <input onChange={handleChange} className="form-control p-4" type="text" placeholder="Email Id" name="emailid" value={optionValue} required/>
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "phoneNumber" ? 
                        <div className="mobileno d-flex">
                            <input onChange={handleChange} className="form-control p-4" type="tel" placeholder="Mobile No" name="mobileno" value={optionValue} required/>
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "discord" ?
                        <div className="discord d-flex">
                            <input onChange={handleChange} className="form-control p-4" type="tel" placeholder="Discord Id" name="discordid" value={optionValue} required/>
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "event" ? 
                        <div className="event d-flex">
                            <select onChange={handleChange} name="sub-options" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                                <option className="color-secondary">Sub Options</option>
                                <option className="color-secondary" title="B-Paln" value="609caacc46ebb237b8fff05c">B-Plan</option>
                                <option className="color-secondary" title="B-Quiz" value="60a0b75aa45a7705fc059d84">B-Quiz</option>
                                <option className="color-secondary" title="Rags to Riches" value="60a0ba34a45a7705fc059d85">Rags to Riches</option>
                                <option className="color-secondary" title="Market Watch" value="60a0be2aa45a7705fc059d86">Market Watch</option>
                                <option className="color-secondary" title="Corporate Mystry" value="60a0d0b7a45a7705fc059d87">Corporate Mystry</option>
                                <option className="color-secondary" title="Treasure Hunt" value="60a0d1f4a45a7705fc059d88">Treasure Hunt</option>
                                <option className="color-secondary" title="Internship" value="60a0b51ca45a7705fc059d83">Internship</option>
                                <option className="color-secondary" title="Mind Scribble" value="60a0d441a45a7705fc059d89">Mind Scribble</option>
                            </select> 
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "eventPass" ? 
                        <div className="byevent-pass d-flex">
                            <select onChange={handleChange} name="sub-options" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                                <option className="color-secondary">Sub Options</option>
                                <option className="color-secondary" title="Have Pass" value={true}>Purchased</option>
                                <option className="color-secondary" title="Do not have Pass" value={false}>Not Purchased</option>
                            </select> 
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                    {
                        userOption === "profile" ? 
                        <div className="profile-completed d-flex">
                            <select onChange={handleChange} name="sub-options" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                                <option className="color-secondary">Sub Options</option>
                                <option className="color-secondary" title="Profile Completed" value={true}>Profile Completed</option>
                                <option className="color-secondary" title="Profile Not Completed" value={false}>Profile Not Completed</option>
                            </select> 
                            <button onClick={submit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                        </div> : ""
                    }
                </div>
                <div className="offset-1 col-1">
                <button onClick={() => {props.importCSV()}} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Download CSV</button>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;