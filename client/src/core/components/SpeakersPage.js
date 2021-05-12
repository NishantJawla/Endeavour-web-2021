//jshint esversion: 8
import React from "react";
import EachSpeakerCard from "./sub-components/EachSpeakerCard";

function SpeakersPage(){
    return (
        <div className="py-5 position-relative speakers bg-sec-pattern">
            <div className="container py-5">
            <div className="heading-font pt-5 pb-3 text-center color-white fw-bold">Our Guests</div>
                <div className="speaker-outer-box d-flex justify-content-between flex-wrap">
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                    <EachSpeakerCard />
                </div>
            </div>
        </div>
    );
}

export default SpeakersPage;