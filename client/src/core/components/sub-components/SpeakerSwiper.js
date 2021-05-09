//jshint esversion: 8
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function SpeakerSwiper() {

    function changeSlideCount() {
        if(window.innerWidth <= 576){
            return 1;
        } else if(window.innerWidth > 576 && window.innerWidth <= 1200){
            return 3;
        } else {
            return 4;
        }
    }

  return (
    <>
      <Swiper
        slidesPerView={changeSlideCount()}
        spaceBetween={20}
        Navigation={true}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
