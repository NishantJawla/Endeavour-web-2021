//jshint esversion: 8
import React from "react";
import EachSponser from "./sub-components/EachSponser";

function Sponsers(){
    return(
        <div className="team py-5 bg-sec-pattern bg-norepeat" id="events">
            <div className="container py-5 mt-5">
                <div className="heading-font text-center color-white fw-bold">Our Sponsers</div>
                <div className="events-container">
                    <div className="d-flex justify-content-between flex-wrap">
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                        <EachSponser />
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Sponsers;