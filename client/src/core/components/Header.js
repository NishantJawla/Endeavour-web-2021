//jshint esversion: 8
import React from 'react';
import {isAuthenticated} from "../../auth/helper/index"
function Header(){

    const style = {
        zIndex : 5
    };

    return (
        <div className="header container-fluid position-relative">
            <div className="header-overlay position-absolute w-100 h-100"></div>
            <div style={style} className="container">
                <div className="header-content w-100 ">
                    <div className="fw-bold head color-white">
                        E-Summit 2021
                        <div className="fs-6 ls-1">
                            Breakthrough the Excellence
                        </div>
                    </div>
                    <div className="content color-white ls-2">
                        KIET Group Of Institutions
                    </div>
                   {
                    !isAuthenticated() && (<React.Fragment>
                        <a href="/SignUp" className="text-decoration-none br-7 ls-1 bg-primary py-3 fw-bold px-4 hbg-dark color-white join-us-button">Register </a>
                        </React.Fragment>)
                   }
                   {
                    isAuthenticated() && (<React.Fragment>
                        <a href="#events" className="text-decoration-none br-7 ls-1 bg-primary py-3 fw-bold px-4 hbg-dark color-white join-us-button">Events </a>
                        </React.Fragment>)
                   }
                </div>
            </div>
        </div> 
    );
}

export default Header;