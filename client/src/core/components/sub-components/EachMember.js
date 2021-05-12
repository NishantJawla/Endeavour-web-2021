//jshint esversion: 8
import React from "react";
import teamImg from "./../../../assets/img/team-img/nishant.jpeg";
import facebookIcon from "./../../../assets/img/icons/facebook.png";
import linkedinIcon from "./../../../assets/img/icons/linkedin.png";

function EachMember(){
    return(
        <div className="m-4 py-3 each-member">
            <div className="position-relative">
                <div className="p-2 bg-primary rounded-3">
                    <div className="member-img rounded-circle overflow-hidden">
                        <img src={teamImg} alt="team member" width="100%" />
                    </div>
                    <div className="member-desc py-3 text-center">
                        <div className="fs-6 ls-1 fs-bold color-white">Nishant Jawla</div>
                        <div className="fs-7 ls-1 color-white py-1">Technical Team</div>
                    </div>
                </div>
                <div className="each-speaker-social-icons py-2 bg-primary my-1 py-3 triangle-dn">
                    <div className="d-flex justify-content-center">
                        <a href="https://google.com" className="mx-2">
                            <img src={facebookIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                        <a href="https://google.com" className="mx-2">
                            <img src={linkedinIcon} width="17px" className="color-primary" alt="facebook icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EachMember;