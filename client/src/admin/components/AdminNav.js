//jshint esversion: 8
import React from "react";
 
function AdminNav(props) {

    return (
        <div className="admin-nav h-100 py-4 px-5">
            <div className="text-center color-grey fs-5 fw-bold ls-1 pb-3 border-1 border-bottom">Admin Dashboard</div>
            <div className="admin-nav-options color-white fs-6 py-3">
                <div onClick={() => props.setPage("dashboard")} className="py-2 cursor-pointer my-2 ls-1" >Dashboard</div>
                <div onClick={() => props.setPage("findUsers")} className="py-2 cursor-pointer my-2 ls-1" >Find users</div>
                <div onClick={() => props.setPage("findUsersAll")} className="py-2 cursor-pointer my-2 ls-1" >Find All Users</div>
                <div onClick={() => props.setPage("importCSV")} className="py-2 cursor-pointer my-2 ls-1" >Import CSV</div>
            </div>
        </div>
    );
}

export default AdminNav;