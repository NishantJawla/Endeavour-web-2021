//jshint esversion: 8
import React from 'react';
import {isAuthenticated} from "../../auth/helper/index"
import {Link} from "react-router-dom"
import discordImg from "../../assets/discord.png";
function Header(){

    const style = {
        zIndex : 5
    };

    return (
        <div className="header container-fluid position-relative">
            <div className="header-overlay position-absolute w-100 h-100"></div>
            <div style={style} className="container">
                <div className="d-flex" style={{height: "100vh"}}>
                    <div className="header-content align-self-center w-100 ">
                        <div className="fw-bold head color-white">
                            E-Summit 2021
                            <div className="fs-6 ls-1">
                            COHORT OF PATHFINDERS
                            </div>
                            <div className="fs-6 py-3 ls-1">
                                June 12-13, 2021
                            </div>
                        </div>
                        <div className="content color-white ls-2">
                            KIET Group Of Institutions
                        </div>
                    {
                        !isAuthenticated() && (<React.Fragment>
                            <Link to="/signup" className="text-decoration-none br-7 ls-1 bg-primary py-3 fw-bold px-4 hbg-dark color-white join-us-button">Register </Link>
                            </React.Fragment>)
                    }
                    {
                        isAuthenticated() && (<React.Fragment>
                            <a href="https://discord.gg/KwSKQb62Hv" className="text-decoration-none br-7 ls-1 bg-primary py-3 fw-bold px-4 hbg-dark color-white join-us-button">Join Discord 
                            <img className="mx-2"src={discordImg} alt="discord icon" width="25px"/>
                            </a>
                            </React.Fragment>)
                    }
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Header;