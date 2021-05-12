//jshint esversion: 8
import React, { useEffect } from 'react';
import SpeakerSwiper from "./sub-components/SpeakerSwiper";

function Speakers() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/swiper/swiper-bundle.min.js";
        script.async = true;
        document.body.appendChild(script);
    });


    return (
        <div className="py-5 position-relative speakers bg-sec-pattern">
            <div className="container py-4">
                <div className="heading-font text-center color-white fw-bold">Our Guests</div>
                <div className="pt-5 position-relative">
                    <SpeakerSwiper />
                </div>
            </div>
        </div> 
    );
}

export default Speakers;