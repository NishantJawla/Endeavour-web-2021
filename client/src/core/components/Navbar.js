//jshint esversion: 8
import React from 'react';
import EcellLogo from "./../../assets/img/logo.png";
import profileImg from "./../../assets/img/icons/user.png";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import {Redirect,Link} from "react-router-dom"
import {isAuthenticated, signout} from "../../auth/helper/index"


const Navbar = () =>  {
    const fun1 = () => {
        signout(() => {
            console.log("successfully logged out");
            fun2()
          }
          );
        fun3()
    }
    const fun2 = () => {
        !isAuthenticated() ? <Redirect to="/" /> : <Redirect to="/" />
    }
    const fun3 = () => {
        
        !isAuthenticated() && window.location.reload(false);
            
        
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-blur">
            {/* <div className="container-fluid px-5 mx-5"> */}
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={EcellLogo} width="50px" height="50px" alt="logo" />
                    <div className="color-white px-3 fs-6 ls-1 fw-bold">
                        <div className="fs-4">E-Summit'21</div>
                        Breakthrough the Excellence
                    </div>
                </Link>
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
                    <Link className="nav-link ls-1 fs-6 color-white fw-bold" to="/geteventpass">Get Event Pass</Link>
                    <Link className="nav-link ls-1 fs-6 color-white fw-bold active" to="/">Home</Link>
                    <Link className="nav-link ls-1 fs-6 color-white fw-bold" to="/guests">Speakers</Link>
                    <Link className="nav-link ls-1 fs-6 color-white fw-bold" to="/sponsers">Sponsers</Link>
                    <Link className="nav-link ls-1 fs-6 color-white fw-bold" to="/team">Team</Link>
                    {
                        isAuthenticated() && (
                            <React.Fragment>

                                <Dropdown as={ButtonGroup}>
                                    <Dropdown.Toggle id="dropdown-custom-1" className="bg-transparent border-0"><img src={profileImg} width="24px" alt="user profile img" /></Dropdown.Toggle>
                                    <Dropdown.Menu className="bg-secondary color-white">
                                    <Dropdown.Item className="color-white ls-1 profile-dropdown" eventKey="2">
                                        <Link to="/user/dashboard" className="color-white ls-1 profile-dropdown text-decoration-none"> 
                                        Profile
                                        </Link>
                                        </Dropdown.Item>
                                    <Dropdown.Item  eventKey="3" className="color-white ls-1 profile-dropdown"><Link to="/changepassword" className="color-white ls-1 profile-dropdown text-decoration-none">  Change Password</Link></Dropdown.Item>
                                <Dropdown.Item className="color-white ls-1 profile-dropdown" eventKey="1" 
                                    onClick={() => {
                                        fun1()
                                        fun2()
                                    
                                    }}
                                >Signout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </React.Fragment>
                        )
                    }
                    {
                        !isAuthenticated() && (
                            <React.Fragment>
                                <Link to="/signin" className="nav-link ls-1 fs-6 fw-bold br-7 bg-primary color-white">Login</Link>
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