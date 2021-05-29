//jshint esversion: 8
import React, { useState } from "react";
import './css/admin.css';
import AdminNav from "./components/AdminNav";
import DashBoard from "./components/DashBoard";
import FindUser from "./components/FindUser";
import FindAllUsers from  "./components/FindAllUsers";
import FindTeams from "./components/FindTeams";
import CreateTeam from "./components/CreateNewTeam";

function AdminDashboardNew() {

    const [page, setPage] = useState("");

    return (
        <div className="admin-front bg-secondary pt-5">
            <div className="container-fluid pt-5 h-100">
                <div className="row h-100">
                    <div className="col-md-2 p-0 pt-3 m-0 h-100" >
                        <AdminNav 
                            setPage={setPage}
                        />
                    </div>
                    <div className="col-md-10 py-3 m-0 h-100 overflow-auto">
                        {
                            page === "dashboard" ? <DashBoard /> : 
                            page === "findUsers" ? <FindUser /> : 
                            page === "findUsersAll" ? <FindAllUsers /> : 
                            page === "findTeams" ? <FindTeams /> : 
                            page === "createTeam" ? <CreateTeam /> : "" 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardNew;