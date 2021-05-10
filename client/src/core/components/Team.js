//jshint esversion: 8
import React from "react";
import EachMember from "./sub-components/EachMember";

function Team(){
    return(
        <div className="team py-5 bg-sec-pattern bg-norepeat" id="events">
            <div className="container py-5 mt-5">
                <div className="heading-font text-center color-white fw-bold">Our Team</div>
                <div className="events-container">
                    <div className="d-flex justify-content-between flex-wrap">
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                        <EachMember />
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Team;