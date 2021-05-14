//jshint esversion: 8
import React, {useEffect,useState} from "react";
import EachMember from "./sub-components/EachMember";
import firebase from "../../firebase"
function Team(){
  const [teamData, setteamData] = useState();
  useEffect(() => {

    const teamRef = firebase.database().ref('team');
    teamRef.on('value', (snapshot) => {
      const teams = snapshot.val();
      const teamData = [];
      for (let id in teams) {
        teamData.push({ id, ...teams[id] });
      }
      setteamData(teamData);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    return(
        <div className="team py-5 bg-sec-pattern bg-norepeat" id="events">
            <div className="container py-5 mt-5">
                <div className="heading-font text-center color-white fw-bold">Our Team</div>
                <div className="events-container">
                    <div className="d-flex justify-content-between flex-wrap">
                    {teamData
    ? teamData.map((todo, index) => <EachMember data={todo} key={index} />)
    : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;