//jshint esversion: 8
import React,{useEffect,useState,useRef}from "react";
import EventPopup from "./../core/components/sub-components/EventPopup";
import firebase from "../firebase"
import {getEventHandler,isAuthenticated} from "../auth/helper/index";
import axios from "axios"
import {API} from "../backend"
const  EventRegister = (props) => {
    //evets ka data
    const eventParam = props.location.pathname.split("/")
    const idParam = eventParam[eventParam.length-1]
    console.log(idParam)
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
 var eventDataFromServer = undefined;
 useEffect(() => {
    const  someFunction = async  () => {
        // var eventDataFromServer = await getEventHandler(idParam.toString())
        const {user, token} = isAuthenticated();
        console.log("inhere!")
        await axios.get(`${API}event/getEvent/${idParam.toString()}`, {
            headers: {
              'Authorization': `${token}`
            }
          })
          .then((res) => {
            // eventDataFromServer= res.data.json();
            // console.log("qwertyuiop" + eventDataFromServer)
            console.log("inhere2!")
            console.log({
                "res": res.data.content
            });
            seteventPay({
                eventName: res.data.content.eventName,
                launched: res.data.content.launched,
                membersCount:res.data.content.membersCount,
                price: res.data.content.price,
                error: "",
                success: true,
            })
          })
          .catch((error) => {
            return error
          })
    }
    someFunction();
  }, []);
  console.log({
    "eventDataFromServer": eventDataFromServer
  })
    function changeShowPopup(props){
        setShowPopup(true);
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
    return (
        <React.Fragment>
            <div className="event-register py-5 bg-sec-pattern bg-norepeat">
                <div className="container py-5">
                    <div className="heading-font pt-3 text-center color-white fw-bold">{eventData[0] ? eventData[0].eventName :""}</div>
                    <div className="event-desc color-white pt-3 px-5 mx-5">
                        <div className="py-3 px-4">
                            <div className="fs-5 fw-bold pb-2 ls-1">Description</div>
                            <div className="fs-6 color-white ls-1">
                            {eventData[0] ? eventData[0].eventDesc : ""}
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
                            Pranav bhai write rounds logic here please!!!!
                            </div>
                        </div>
                        <div className="py-3 px-4">
                           {
                               success && ( <button onClick={changeShowPopup} className="w-100 rounded bg-primary hbg-dark color-white fs-6 border-0 ls-1 fw-bold py-3">Register Now</button>)
                           }
                        </div>
                    </div>
                </div>
            </div>
            <EventPopup 
                showSlowly={showPopUp}
                hidePopup={hidePopup}
                memberCount={2}
                data = {eventPay}
            />
        </React.Fragment>
    );
}

export default EventRegister;