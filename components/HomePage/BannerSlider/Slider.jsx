"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import img1 from "../../../assets/slider/bike2.png";
import img2 from '../../../assets/slider/bike1.png'
import img3 from '../../../assets/slider/bike3.png'
import img4 from '../../../assets/slider/bike4.png'
import img5 from '../../../assets/slider/bike-5.png'
import Image from "next/image";
const Slider = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper bg-[#fdf1ee] dark:bg-primary rounded-2xl shadow-md"
    >
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
          <div className="flex-1 space-y-6 ">
            <h2 className="text-2xl font semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
              Ride-on R15 V4 with Smile
            </h2>
            <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className=" text-center lg:text-left mb-6 lg:mb-0">

            <Button className={`cursor-pointer`}>Purchase</Button>
            </div>
          </div>
          <div className="flex-1 pt-6 lg:pt-0">
            <Image src={img1} width={500} height={500} className="mx-auto "></Image>
          </div>
        </div>
      </SwiperSlide>
      {/* slide 2 */}
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
          <div className="flex-1 space-y-6 ">
            <h2 className="text-2xl font semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
              Ride-on R15 V4 with Smile
            </h2>
            <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className=" text-center lg:text-left mb-6 lg:mb-0">

            <Button className={`cursor-pointer`}>Purchase</Button>
            </div>
          </div>
          <div className="flex-1 pt-6 lg:pt-0">
            <Image src={img2} width={500} height={500} className="mx-auto "></Image>
          </div>
        </div>
      </SwiperSlide>
      {/* slide 3 */}
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
          <div className="flex-1 space-y-6 ">
            <h2 className="text-2xl font semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
              Ride-on R15 V4 with Smile
            </h2>
            <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className=" text-center lg:text-left mb-6 lg:mb-0">

            <Button className={`cursor-pointer`}>Purchase</Button>
            </div>
          </div>
          <div className="flex-1 pt-6 lg:pt-0">
            <Image src={img3} width={500} height={500} className="mx-auto "></Image>
          </div>
        </div>
      </SwiperSlide>
      {/* slide 4 */}
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
          <div className="flex-1 space-y-6 ">
            <h2 className="text-2xl font semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
              Ride-on R15 V4 with Smile
            </h2>
            <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className=" text-center lg:text-left mb-6 lg:mb-0">

            <Button className={`cursor-pointer`}>Purchase</Button>
            </div>
          </div>
          <div className="flex-1 pt-6 lg:pt-0">
            <Image src={img4} width={500} height={500} className="mx-auto "></Image>
          </div>
        </div>
      </SwiperSlide>
      {/* slide 5 */}
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
          <div className="flex-1 space-y-6 ">
            <h2 className="text-2xl font semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
              Ride-on R15 V4 with Smile
            </h2>
            <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className=" text-center lg:text-left mb-6 lg:mb-0">

            <Button className={`cursor-pointer`}>Purchase</Button>
            </div>
          </div>
          <div className="flex-1 pt-6 lg:pt-0">
            <Image src={img5} width={500} height={500} className="mx-auto "></Image>
          </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Slider;
