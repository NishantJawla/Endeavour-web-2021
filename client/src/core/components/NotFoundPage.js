//jshint esversion: 8
import React from "react";
import NotFoundImg from "./../../assets/img/notfound.png";

function NotFoundPage(){

    const style = {
        width: "60%",
        marginLeft: "20%"
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="">
                    <img style={{marginLeft:"10%"}} width="80%" src={NotFoundImg} alt="not found img" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFoundPage;