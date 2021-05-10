//jshint esversion: 8
import React from "react";
import teamImg from "./../../../assets/img/team-img/nishant.jpeg";

function EachMember(){
    return(
        <div className="py-5 each-member">
            <div className="">
                <div className="member-img py-3">
                    <img src={teamImg} width="100%" height="100%" alt="hackathon icon"/>
                </div>
            </div>
        </div>
    );
}

export default EachMember;