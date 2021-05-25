//jshint esversion: 8
import React,{useEffect,useState} from "react";
import EachSponser from "./sub-components/EachSponser";
import firebase from "../../firebase"
const Sponsers = () => {
    const [sponsorData, setsponsorData] = useState();
  useEffect(() => {
    const sponsorRef = firebase.database().ref('sponsorsMain');
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
                <div className="heading-font text-center pb-3 color-white fw-bold">Our Sponsors</div>
                <div className="events-container">
                    <div className="">

                        {/* {
                            sponsorData
                            ? sponsorData.map((todo, index) => <EachSponser data={todo} key={index} />)
                            : ''
                        } */}
                        {
                            sponsorData
                            ? sponsorData.map((todo) => {
                                return (
                                    <div className="py-3">
                                        <div className="fs-5 fw-bold text-center color-white pb-3 ls-1">{todo.name}</div>
                                        <div className="d-flex justify-content-center flex-wrap">
                                            {
                                                todo.content ? 
                                                todo.content.map((eachsponser, index) => {
                                                    return (
                                                        <EachSponser data={eachsponser} key={`${index}at${todo.name}`} />
                                                    )
                                                }) : ""
                                            }
                                        </div>
                                    </div>
                                );
                            })
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Sponsers;