//jshint esversion: 8
import React from "react";
import './css/admin.css';
import AdminNav from "./components/AdminNav";

function AdminDashboardNew() {
    return (
        <div className="admin-front bg-secondary">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 bg-sec-pattern bg-norepeat border-1 py-5 border-left border-secondary" style={{height: "100vh"}}>
                        <AdminNav />
                    </div>
                    <div className="col-md-10">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardNew;