//jshint esversion: 8
import React from "react";
import sponserImg from "./../../../assets/img/sponser/dubulletin.jpg";

function EachSponser(){
    return(
        <div className="m-4 py-3 each-member each-sponser">
            <div className="position-relative overflow-hidden rounded">
                <a href="https://www.google.com">
                    <div className="member-img">
                        <div className="overlay bg-secondary w-100 h-100 position-absolute"></div>
                        <div href="google.com">
                            <img src={sponserImg} width="100%" height="100%" alt="hackathon icon"/>
                        </div>
                    </div>
                    <div className="member-desc position-absolute bottom-0 color-white w-100 py-2">
                        <div className="member-name ls-1 fw-bold py-1 fs-5 text-center">DU Bulletin</div>
                        <div className="member-position ls-1 fs-6 text-center">Media Partner</div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default EachSponser;