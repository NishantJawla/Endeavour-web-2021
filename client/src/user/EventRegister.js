//jshint esversion: 8
import React, { useEffect, useState, useRef}from "react";
import EventPopup from "./../core/components/sub-components/EventPopup";
import firebase from "../firebase"
import {getEventHandler, isAuthenticated} from "../auth/helper/index";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import {API} from "../backend";
const  EventRegister = (props) => {
    //evets ka data
    const eventParam = props.location.pathname.split("/")
    const idParam = eventParam[eventParam.length-1];
    const [showPopUp, setShowPopup] = useState(false);
    const [eventData, seteventData] = useState(true);
    const [eventPay, seteventPay] = useState({
        eventName: "",
        launched: "",
        membersCount:"",
        price: "",
        error: "",
        success: false,
      });
    const { eventName,launched,  membersCount,price,error, success } = eventPay;
    useEffect(() => {
    const eventRef = firebase.database().ref('eventsMain');
    eventRef.on('value', (snapshot) => {
    const events = snapshot.val();
    const eventData = [];
    for (let id in events) {
        
        if(events[id].eventId.toString() === idParam.toString()){
            eventData.push({ id, ...events[id] });
        }
    }
    seteventData(eventData);
    });
    }, []);

//  eventData.length === 0 && (
//     <Redirect
//     to={{
//         pathname: "/signin",
//     }}
//     />
//  )

    // var eventDataFromServer = undefined;
    // useEffect(() => {
    //     const  someFunction = async  () => {
    //         // var eventDataFromServer = await getEventHandler(idParam.toString())
    //         const {user, token} = isAuthenticated();
    //         await axios.get(`${API}event/getEvent/${idParam.toString()}`, {
    //             headers: {
    //             'Authorization': `${token}`
    //             }
    //         })
    //         .then((res) => {
    //             // eventDataFromServer= res.data.json();
    //             // console.log("qwertyuiop" + eventDataFromServer)
    //             seteventPay({
    //                 eventName: res.data.content.eventName,
    //                 launched: res.data.content.launched,
    //                 membersCount:res.data.content.membersCount,
    //                 price: res.data.content.price,
    //                 error: "",
    //                 success: true,
    //             })
    //         })
    //         .catch((error) => {
    //             return error
    //         })
    //     }
    //     someFunction();
    // }, []);
//   const {user, token} = isAuthenticated();
    var teamID = undefined;
//   if(typeof user.registered !== 'undefined' && user.registered.length === 0){
//       user.registered.forEach (p => {
//           if(p.eventId.toString() === props.id) {
//               console.log("team"+p.teams.toString())
//               teamID = p.teams.toString()
//           }
//       })
//   }
    function showButton(){
        const { user } = isAuthenticated();
        if(user){
            return (
                <button onClick={changeShowPopup} className="w-100 rounded bg-primary hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3">Register Now</button>
            );
        } else {
            return(
                <Link to="/signin" className="w-100 rounded bg-primary hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3 px-3 text-decoration-none">Register Now</Link>
            );
        }
    }
    function changeShowPopup(props){
        const {user} = isAuthenticated();
        if(user){
            setShowPopup(true);
        }
    }
    function hidePopup(props){
        setShowPopup(false);
    }
    const getEventStructure = () => {
        let result = eventData[0].eventStructure.split("--")
        return(
            result
            ? result.map((todo, index) => <li>{todo}</li>)
            : '')
    }

    const getRoundsStructure = () => {
        let results = eventData[0].eventRounds;
        return (
            results.map(round => {
                let roundData = round.content.split("--");

                return (
                    <React.Fragment>
                        <div className="fs-6 pt-3 fw-bold">{round.heading} ({round.title})</div>
                        {roundData.map(eachLine => {
                            return (<li className="py-2">{eachLine}</li>);
                        })}
                    </React.Fragment>
                );
            })
        );
    };
    const getEventRules = () => {
        let result = eventData[0].eventRules.split("--");
        return (
            result ?
            result.map(rule => {
                return (
                    <li className="py-2">{rule}</li>
                );
            }) : ""
        );
    };

    const getEventFaqs = () => {
        let results = eventData[0].eventFaq;
        return (
            results.map(faq => {
                return (
                    <div className="py-2">
                        <div className="fw-bold">Question: <span className="fw-normal">{faq.question}</span></div>
                        <div className="fw-bold">Answer: <span className="fw-normal">{faq.answer}</span></div>
                    </div>
                );
            })
        );
    };
    // eslint-disable-next-line
    const splitString = (s) => {
        let result = s.split("--")
        return(
            result
            ? result.map((todo, index) => <li>{todo}</li>)
            : '')
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    //   useEffect(() => {
    //     console.log("inhere!12345")
    //     const  someFunction = async  () => {
    //         console.log("inhere!")
    //         if(teamID){
    //             await axios.get(`${API}event/getTeam/${teamID}`, {
    //                 headers: {
    //                 'Authorization': `${token}`
    //                 }
    //             })
    //             .then((res) => {
    //                 console.log({
    //                     "response": res
    //                 });
    //             })
    //             .catch((error) => {
    //                 return error
    //             })
    //         }
    //     }
    //     someFunction();
    // }, []);

    function allowPopup(){
        const {user} = isAuthenticated();
        if(user){ 
            return (
                <EventPopup 
                    showSlowly={showPopUp}
                    hidePopup={hidePopup}
                    memberCount={eventData[0] ? eventData[0].memberCount :""}
                    id={idParam.toString()}
                    data={eventData[0] ? eventData[0] :""}
                />
            );
        } else {
            <Redirect
            to={{
                pathname: "/signin",
            }}
            />
        }
        
    }
    
    return (
        <React.Fragment>
            <div className="event-register py-5 bg-sec-pattern bg-norepeat">
                <div className="container py-5">
                    <div className="heading-font pt-3 text-center color-white fw-bold">{eventData[0] ? eventData[0].eventName :""}
                        <div className="fs-5">{eventData[0] ? eventData[0].eventTagline : ""}</div>
                    </div>
                    <div className="event-desc color-white pt-3 px-5 mx-5">
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Description</div>
                            <div className="fs-6 color-white ls-1">
                            {eventData[0] ? eventData[0].eventDesc.split("--").map(line => {
                                return (
                                    <div className="ls-1 py-1 fs-6">{line}</div>
                                );
                            }) : ""}
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Structure</div>
                            <div className="fs-6 color-white ls-1">
                            {eventData[0] ? getEventStructure() : ""}
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Rounds</div>
                            <div className="fs-6 color-white ls-1">
                                {eventData[0] ? getRoundsStructure() : ""}
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Rules</div>
                            <div className="fs-6 color-white ls-1">
                                {eventData[0] ? getEventRules() : ""}
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">FAQ's</div>
                            <div className="fs-6 color-white ls-1">
                                {eventData[0] ? getEventFaqs() : ""}
                            </div>
                        </div>
                        <div className="py-3 px-4">
                            {showButton()}
                        </div>
                    </div>
                </div>
            </div>
            {allowPopup()}
            
            {/* <EventPopup 
                showSlowly={showPopUp}
                hidePopup={hidePopup}
                memberCount={eventPay.membersCount}
                data = {eventPay}
                id={idParam.toString()}
            /> */}
        </React.Fragment>
    );
}

export default EventRegister;