//jshint esversion: 8
import React,{useEffect,useState} from 'react';
import EachEvent from './sub-components/EachEvent';
import firebase from "../../firebase"
const Event = () => {
 //require events data form firebase
const [eventData, seteventData] = useState();
useEffect(() => {
const eventRef = firebase.database().ref('eventsMain');
eventRef.on('value', (snapshot) => {
const events = snapshot.val();
const eventData = [];
for (let id in events) {
    eventData.push({ id, ...events[id] });
}
seteventData(eventData);
});
}, []);
    // console.log({
    //     "events": eventData
    // })
    return (
        <React.Fragment>
            <div className="events py-5 bg-main-pattern" id="events">
                <div className="container">
                    <div className="heading-font text-center color-white fw-bold">Our Events</div>
                    <div className="events-container">
                        <div className="d-flex justify-content-between flex-wrap">
                            {eventData
    ? eventData.map((todo, index) => <EachEvent data={todo} key={index} />)
    : ''}
                        </div>
                    </div>
                </div>
            </div>
            {/* <ConfRegistration /> */}
        </React.Fragment>
    );
}

export default Event;