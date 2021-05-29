//jshint esversion: 8
import React, { useState } from "react";
import { getEventName } from "./../helper/EventNames";
import { Button, Modal } from "react-bootstrap";
import { findTeamUsingId, deleteTeamFomId, findTeamsAll } from "./../helper/adminapicall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FindTeams() {

    const [teamData, setTeamData] = useState([]);
    const [popupData, setPopupData] = useState({});
    const [showConf, setShowConf] = useState(false);
    const [endeavourId, setEndeavourId] = useState("");
    const [teamOption, setTeamOption] = useState("");

    const showConfBlock = (team, eventName) => {
        setShowConf(true);
        setPopupData({
            team: team,
            eventName: eventName
        });
    };

    const handleClose = () => setShowConf(false);

    const showUsers = () => {
        return teamData ? teamData.map((team, index) => {
            return (
                <tr className= {index%2 === 0 ? "bg-primary" : ""}>
                    <th scope="row">{index + 1}</th>
                    <td>{getEventName(team.event)}</td>
                    <td>{team.teamMembers[0]}</td>
                    <td>{team.teamMembers[1]}</td>
                    <td onClick={() => {showConfBlock(team, getEventName(team.event))}} className="text-decoration-underline cursor-pointer">Delete</td>
                </tr>
            );
        }) : ""
    };

    const onSubmit = () => {
        if(teamOption === "all"){
            findTeamsAll().then(data => {
                if(data.error){
                    errorMessage(data.error);
                } else if(!data.teamsData || data.teamsData.length === 0){
                    errorMessage("No data found");
                } else {
                    setTeamData(data.teamsData);
                }
            });
        } else {
            findTeamUsingId(endeavourId).then(data => {
                if(data.error){
                    errorMessage(data.error);
                } else if(!data.teamsData || data.teamsData.length === 0) {
                    errorMessage("No data found");
                } else {
                    setTeamData(data.teamsData);
                }
            });
        }
    };

    const deleteTeam = (_id) => {
        deleteTeamFomId(_id).then(data => {
            if(data.error){
                errorMessage(data.error);
            } else {
                setShowConf(false);
                successMessage("Successfully deleted Team");
            }
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "main-options"){
            setTeamOption(value);
        } else {
            setEndeavourId(value);
        }
    };

    const importCSV = () => {
        const csvRows = [];
        // const newHeaders = [
        //     "Event Name",
        //     "",
        //     "email",
        //     "phoneNumber",
        //     "discord",
        //     "semester",
        //     "branch",
        //     "college",
        //     "libId",

        // ];
        const headers = {
            EventName: "",
            Member1EndeavourId: "",
            Member2EndeavourId:'',
        }
        csvRows.push(Object.keys(headers).join(","));

        for(const row of teamData){
            const values = [];
            values.push(getEventName(row.event));
            values.push(row.teamMembers[0]);
            values.push(row.teamMembers[1]);
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
            {showConf ? 
            <React.Fragment>
                <Modal show={showConf} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure you want to delete team registerd in <span className="fw-bold fs-5">{popupData.eventName}?</span> with leader's EndeavourId <span className="fw-bold fs-5">{endeavourId}?</span> Once deleted it cannot be restored.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteTeam(popupData.team._id)}>
                        Yes Delete
                    </Button>
                </Modal.Footer>
                </Modal>
            </React.Fragment> : ""}
            <div className="search-team row">
                <div className="col-2 offset-2 color-white">
                    <select onChange={handleChange} name="main-options" className="form-select form-control" placeholder="semester" aria-label="Default select example">
                        <option className="color-secondary">Select Options</option>
                        <option className="color-secondary" title="Using Endeavour Id" value="all">All Teams</option>
                        <option className="color-secondary" title="Using Email" value="endvrid">Using Leaders Endeavour Id</option>
                    </select>
                </div>
                <div className="col-5 d-flex">
                    {
                        teamOption && teamOption === "endvrid" ? 
                        <input onChange={handleChange} className="form-control py-3" type="text" name="leaderendvrid" placeholder="Endeavour Id Of leader" value={endeavourId} />
                        : ""
                    }
                    <button onClick={onSubmit} className="px-5 mx-3 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Search</button>
                </div>
                <div className="col-2 ">
                    <button onClick={importCSV} className="px-5 mx-3 py-2 bg-primary color-white rounded-3 border-0 ls-1 fs-6">Import CSV</button>
                </div>
            </div>
            <div className="count pt-5">
                <div className="color-white fs-5 ls-2 fw-bold">Count: {teamData.length}</div>
            </div>
            <div className="usersInfo pt-3">
                <table className="table color-white">
                    <thead>
                        <tr className="color-white">
                            <th scope="col">#</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Member1</th>
                            <th scope="col">Member2</th>
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

export default FindTeams;