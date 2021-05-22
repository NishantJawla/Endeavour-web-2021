//jshint esversion: 8
import React from "react";

const EachSponser = (props) => {
    return(
        <div className="mx-4 my-3 py-3 each-member each-sponser">
            <div className="position-relative overflow-hidden rounded">
                <a href={props.data.sponsorLink} target="_blank" rel="noreferrer">
                    <div className="member-img">
                        <div className="overlay bg-secondary w-100 h-100 position-absolute"></div>
                        <div >
                            <img src={props.data.imageSponsor} width="100%" height="100%" alt="hackathon icon"/>
                        </div>
                    </div>
                    <div className="member-desc position-absolute bottom-0 color-white w-100 py-2">
                        <div className="member-name ls-1 fw-bold py-1 fs-5 text-center">{props.data.sponsorName}</div>
                        {/* <div className="member-position ls-1 fs-6 text-center">{props.data.sponsorCategory}</div> */}
                    </div>
                </a>
            </div>
        </div>
    );
}

export default EachSponser;