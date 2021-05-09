//jshint esversion: 8
import React, { useEffect } from 'react';
import EachSpeaker from './sub-components/EachSpeaker';

function Speakers() {

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://unpkg.com/swiper/swiper-bundle.min.js";
        script.async = true;
        document.body.appendChild(script);
    });


    return (
        <div className="py-5 position-relative speakers">
            <div className="container py-4">
                <div className="heading-font text-center color-white fw-bold">Our Speakers</div>
                <div className="pt-5 position-relative">
                    <div className="swiper-container ">
                        <div className="swiper-wrapper">
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                            <EachSpeaker />
                        </div>
                        {/* <div className="swiper-pagination"></div> */}
                    </div>
                    <div className="slider-buttons d-flex justify-content-between position-absolute">
                        <div className="next-speaker py-2 px-2 color-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#a13941" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                            </svg>
                        </div>
                        <div className="prev-speaker py-2 px-2 color-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#a13941" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Speakers;