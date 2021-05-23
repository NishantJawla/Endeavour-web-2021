//jshint esversion: 8
import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/img/logo.png";

function AdminNav() {
    return (
        <div className="admin-nav">
            <div className="logo d-flex justify-content-center">
                <Link className="" to="/">
                    <img src={logo} width="45px" alt="ecell logo" />
                </Link>
            </div>
        </div>
    );
}

export default AdminNav;