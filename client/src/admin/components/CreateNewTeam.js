//jshint esversion: 8
import React, { useState } from "react";
import { createNewTeam } from "./../helper/adminapicall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateNewTeam() {
    
    const [teamData, setTeamData] = useState({
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeamData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = () => {
        createNewTeam(teamData).then(data => {
            if(data.error){
                errorMessage(data.error);
            } else {
                successMessage("Successfully created Team");
            }
        });
        setTeamData({});
    };

    const successMessage = (msg) => {
        toast.success(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };
    const errorMessage = (error) => {
        toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };

    return (
        <div className="p-3">
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
            <div className="createTeam-team row pb-3">
                <div className="color-white fs-4 ls-1 fw-bold text-center">Create New Team</div>
            </div>
            <div className="usersInfo pt-3 m-auto">
                <div className="createTeamForm px-5 m-auto w-50">
                    <div className="py-2">
                        <input onChange={handleChange} name="leader" className="form-control p-4" type="text" placeholder="Team Leader EndeavourId"/>
                    </div>
                    <div  className="py-2">
                        <input onChange={handleChange} name="member2" className="form-control p-4" type="text" placeholder="Member2 Endeavour Id" />
                    </div>
                    <div className="py-2">
                        <select onChange={handleChange} name="eventId" className="form-select py-3" placeholder="semester" aria-label="Default select example">
                            <option className="color-secondary">Select Event</option>
                            <option className="color-secondary" title="B-Paln" value="609caacc46ebb237b8fff05c">B-Plan</option>
                            <option className="color-secondary" title="B-Quiz" value="60a0b75aa45a7705fc059d84">B-Quiz</option>
                            <option className="color-secondary" title="Rags to Riches" value="60a0ba34a45a7705fc059d85">Rags to Riches</option>
                            <option className="color-secondary" title="Market Watch" value="60a0be2aa45a7705fc059d86">Market Watch</option>
                            <option className="color-secondary" title="Corporate Mystry" value="60a0d0b7a45a7705fc059d87">Corporate Mystry</option>
                            <option className="color-secondary" title="Treasure Hunt" value="60a0d1f4a45a7705fc059d88">Treasure Hunt</option>
                            <option className="color-secondary" title="Mind Scribble" value="60a0d441a45a7705fc059d89">Mind Scribble</option>
                        </select> 
                    </div>
                    <div className="py-2">
                        <button onClick={handleSubmit} className="w-100 py-3 rounded-3 bg-primary border-0 fs-6 ls-1 color-white btn-primary">Create New team</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTeam;