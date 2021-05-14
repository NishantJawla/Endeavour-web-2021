//jshint esversion: 8
// eslint-disable-next-line
import React, { useRef, useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EachSpeaker from "./../sub-components/EachSpeaker";
import firebase from "../../../firebase"
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const SpeakerSwiper = () => {
  const [speakerData, setspeakerData] = useState();
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

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    function changeSlideCount() {
        if(window.innerWidth <= 576){
            return 1;
        } else if(window.innerWidth > 576 && window.innerWidth <= 995){
            return 2;
        } else if(window.innerWidth > 996 && window.innerWidth <= 1200){
          return 3
        } else {
            return 4;
        }
    }

  return (
    <>
      <Swiper
        slidesPerView={changeSlideCount()}
        spaceBetween={100}
        navigation={{
            "prevEl": navigationPrevRef.current,
            "nextEl": navigationNextRef.current,
          }}
        autoplay={{
          "delay": 1000,
          "disableOnInteraction": false
        }}
        loop={true}
        className="mySwiper"
      >
        {speakerData
    ? speakerData.map((todo, index) => 
    <SwiperSlide><EachSpeaker data={todo} key={index} /></SwiperSlide>
  )
    : ''}

      </Swiper>
      {/* <div className="slider-buttons d-flex justify-content-between position-absolute">
            <div className="next-speaker py-2 px-2 color-white" ref={navigationPrevRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#a13941" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                </svg>
            </div>
            <div className="prev-speaker py-2 px-2 color-white" ref={navigationNextRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#a13941" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                </svg>
            </div>
        </div> */}
    </>
  );
}

export default SpeakerSwiper;