//jshint esversion: 8
import React from "react";
import loaderIcon from "./../../assets/img/loaderLogo.png";

function Loader() {

    return (
        <div class="loader bg-secondary w-100 h-100 position-fixed">
            <div className="d-flex justify-content-center w-100 h-100">
                <img src={loaderIcon} width="0%" className="align-self-center" alt="loader img" />
            </div>
        </div>
    );
}

export default Loader;