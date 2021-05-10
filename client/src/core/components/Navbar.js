//jshint esversion: 8
import React from 'react';
import EcellLogo from "./../../assets/img/logo.png";
import profileImg from "./../../assets/img/icons/user.png";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {isAuthenticated, signout} from "../../auth/helper/index"


const Navbar = () =>  {
    return (
        <nav className="navbar navbar-expand-lg navbar-blur">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={EcellLogo} width="50px" height="50px" alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <svg className="nav-lines" width="24" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>
                    <svg className="nav-lines" width="24" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>
                    <svg className="nav-lines" width="24" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>                                          
                </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav w-100 d-flex justify-content-end">
                    <a className="nav-link ls-1 fs-6 color-white fw-bold active" href="/">Home</a>
                    <a className="nav-link ls-1 fs-6 color-white fw-bold" href="/speakers">Speakers</a>
                    <a className="nav-link ls-1 fs-6 color-white fw-bold" href="/sponsers">Sponsers</a>
                    <a className="nav-link ls-1 fs-6 color-white fw-bold" href="/team">Team</a>
                    {
                        isAuthenticated() && (
                            <React.Fragment>

                                <Dropdown as={ButtonGroup}>
                                    <Dropdown.Toggle id="dropdown-custom-1" className="bg-transparent border-0"><img src={profileImg} width="24px" alt="user profile img" /></Dropdown.Toggle>
                                    <Dropdown.Menu className="bg-secondary color-white">
                                    <Dropdown.Item className="color-white ls-1 profile-dropdown" eventKey="1" 
                                    onClick={() => {
                                        signout(() => {
                                          console.log("successfully logged out");
                                          window.location.reload(false);
                                          console.log("after reload")
                                        });
                                      }}
                                   >Signout</Dropdown.Item>
                                    <Dropdown.Item className="color-white ls-1 profile-dropdown" eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Item className="color-white ls-1 profile-dropdown" eventKey="3">Active Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </React.Fragment>
                        )
                    }
                    {
                        !isAuthenticated() && (
                            <React.Fragment>
                                <a href="/signin" className="nav-link ls-1 fs-6 fw-bold br-7 bg-primary color-white">Login</a>
                            </React.Fragment>
                        )
                    }
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;