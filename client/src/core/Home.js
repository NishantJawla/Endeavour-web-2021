//jshint esversion: 8
import React from 'react';
import "../styles.css";
import { API } from "../Backend";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Speakers from "./components/Speakers";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <Header />
            <AboutUs />
            <Speakers />
            <Events />
            <ContactUs />
            <Footer />
        </React.Fragment>
    );
}

export default Home;