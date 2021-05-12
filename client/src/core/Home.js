//jshint esversion: 8
import React, {useEffect} from 'react';
import "../styles.css";
import { API } from "../backend";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Speakers from "./components/Speakers";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import firebase from "../firebase";
function Home() {
  useEffect(() => {
    const todoRef = firebase.database().ref('team');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      console.log({"content":todos});
    });
  }, []);
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