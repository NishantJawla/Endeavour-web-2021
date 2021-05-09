//jshint esversion: 8
import React from 'react';
import EcellLogo from "./../../assets/img/logo.png";

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-secondary">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src={EcellLogo} width="50px" height="50px" alt="logo" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">
                    <svg class="nav-lines" width="24" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>
                    <svg class="nav-lines" width="24" height="3" viewBo x="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>
                    <svg class="nav-lines" width="24" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.560547" y="0.419922" width="23" height="2" fill="#AE0E2B"/>
                    </svg>                                          
                </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav w-100 d-flex justify-content-end">
                    <a class="nav-link ls-1 fs-6 color-white fw-bold active" href="/">Home</a>
                    <a class="nav-link ls-1 fs-6 color-white fw-bold" href="/speakers">Speakers</a>
                    <a class="nav-link ls-1 fs-6 color-white fw-bold" href="/sponsers">Sponsers</a>
                    <a class="nav-link ls-1 fs-6 color-white fw-bold" href="/team">Team</a>
                    <a class="nav-link ls-1 fs-6 fw-bold br-7 bg-primary color-white" href="/login">Login</a>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;