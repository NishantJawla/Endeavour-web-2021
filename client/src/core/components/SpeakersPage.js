//jshint esversion: 8
import React, {useEffect,useState} from "react";
import EachSpeakerCard from "./sub-components/EachSpeakerCard";
import EachSpeakerPopup from "./sub-components/EachSpeakerPopup";
import firebase from "../../firebase";
const SpeakersPage = () => {
    
    const [speakerData, setspeakerData] = useState();
    const [popupData, setPopupData] = useState();
    const [showSlowly, setShowSlowly] = useState(false);

    useEffect(() => {

      const speakerRef = firebase.database().ref('speakers');
      speakerRef.on('value', (snapshot) => {
        const speakers = snapshot.val();
        const speakerData = [];
        for (let id in speakers) {
          speakerData.push({ id, ...speakers[id] });
        }
        setspeakerData(speakerData);
      });
    }, []);
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);
    return (
        <div className="py-5 position-relative speakers bg-sec-pattern">
            <div className="container py-5">
            <div className="heading-font pt-5 pb-3 text-center color-white fw-bold">Our Guests</div>
                <div className="speaker-outer-box d-flex justify-content-between flex-wrap">
                    {
                        speakerData
                        ? speakerData.map((todo, index) => <EachSpeakerCard data={todo} setPopupData={setPopupData} setShowSlowly={setShowSlowly} key={index} />)
                        : ''
                    }
                </div>
            </div>
            <EachSpeakerPopup showSlowly={showSlowly} setShowSlowly={setShowSlowly} data={popupData} />
        </div>
    );
}

export default SpeakersPage;