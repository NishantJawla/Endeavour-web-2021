//jshint esversion: 8
import React,{useEffect,useState} from "react";
import EachSponser from "./sub-components/EachSponser";
import firebase from "../../firebase"
const Sponsers = () => {
    const [sponsorData, setsponsorData] = useState();
  useEffect(() => {
    const sponsorRef = firebase.database().ref('sponsors');
    sponsorRef.on('value', (snapshot) => {
    const sponsors = snapshot.val();
    const sponsorData = [];
    for (let id in sponsors) {
        sponsorData.push({ id, ...sponsors[id] });
    }
    setsponsorData(sponsorData);
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    return(
        <div className="team py-5 bg-sec-pattern bg-norepeat" id="events">
            <div className="container py-5 mt-5">
                <div className="heading-font text-center color-white fw-bold">Our Sponsors</div>
                <div className="events-container">
                    <div className="d-flex justify-content-between flex-wrap">
                        {sponsorData
    ? sponsorData.map((todo, index) => <EachSponser data={todo} key={index} />)
    : ''}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Sponsers;