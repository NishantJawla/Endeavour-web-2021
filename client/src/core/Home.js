//jshint esversion: 8
import React, {useEffect,useState} from 'react';
import "../styles.css";
import { API } from "../backend";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Speakers from "./components/Speakers";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import firebase from "../firebase";
const Home = () => {
  
    return (
        <React.Fragment>
            <Header />
            <AboutUs />
            <Speakers />
            <Events />
            <ContactUs />
        </React.Fragment>
    );
}

export default Home;