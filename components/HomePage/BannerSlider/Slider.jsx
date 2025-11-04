// "use client";
// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "./styles.css";

// import { Navigation } from "swiper/modules";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import gsap from "gsap";

// import img1 from "../../../assets/slider/bike2.png";
// import img2 from "../../../assets/slider/bike1.png";
// import img3 from "../../../assets/slider/bike3.png";
// import img4 from "../../../assets/slider/bike4.png";
// import img5 from "../../../assets/slider/bike-5.png";

// const Slider = () => {
//   const swiperRef = useRef(null);

//   // Function to create spark particles
//   const createParticles = (container) => {
//     for (let i = 0; i < 15; i++) {
//       const particle = document.createElement("div");
//       particle.className = "particle";
//       particle.style.left = `${Math.random() * 100}%`;
//       particle.style.bottom = "0px";
//       particle.style.width = `${Math.random() * 8 + 2}px`;
//       particle.style.height = particle.style.width;
//       particle.style.background = "rgba(255,200,50,0.8)";
//       particle.style.position = "absolute";
//       particle.style.borderRadius = "50%";
//       container.appendChild(particle);

//       gsap.to(particle, {
//         y: -Math.random() * 100 - 50,
//         x: (Math.random() - 0.5) * 100,
//         opacity: 0,
//         scale: 0,
//         duration: Math.random() * 0.8 + 0.5,
//         ease: "power1.out",
//         onComplete: () => particle.remove(),
//       });
//     }
//   };

//   // Animate bike + particles
//   const animateBike = (slide) => {
//     const bikeContainer = slide.querySelector(".bike-img");
//     const bike = bikeContainer.querySelector("img");

//     if (!bike) return;

//     // Slide + bounce + rotation animation
//     gsap.fromTo(
//       bike,
//       {
//         x: Math.random() > 0.5 ? -800 : 800,
//         rotation: Math.random() > 0.5 ? -30 : 30,
//         scale: 0,
//         opacity: 0,
//       },
//       {
//         x: 0,
//         rotation: 0,
//         scale: 1,
//         opacity: 1,
//         duration: 1.2,
//         ease: "elastic.out(1, 0.5)",
//         onUpdate: () => createParticles(bikeContainer),
//         onComplete: () => gsap.set(bike, { clearProps: "all" }),
//       }
//     );
//   };

//   useEffect(() => {
//     // Animate first slide on mount
//     if (swiperRef.current) {
//       const firstSlide = swiperRef.current.swiper.slides[swiperRef.current.swiper.activeIndex];
//       animateBike(firstSlide);
//     }
//   }, []);

//   return (
//     <Swiper
//       ref={swiperRef}
//       navigation={true}
//       modules={[Navigation]}
//       loop={true}
//       className="mySwiper bg-[#fdf1ee] dark:bg-[#1e1412] rounded-2xl shadow-md mt-6 lg:mt-14"
//       onSlideChange={(swiper) => {
//         const activeSlide = swiper.slides[swiper.activeIndex];
//         animateBike(activeSlide);
//       }}
//     >
//       {[img1, img2, img3, img4, img5].map((img, index) => (
//         <SwiperSlide key={index}>
//           <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-2xl font-semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
//                 Ride-on R15 V4 with Smile
//               </h2>
//               <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
//                 Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
//               </p>
//               <div className="text-center lg:text-left mb-6 lg:mb-0">
//                 <Button className="cursor-pointer">Purchase</Button>
//               </div>
//             </div>
//             <div className="flex-1 pt-6 lg:pt-0 relative">
//               <div className="bike-img relative mx-auto">
//                 <Image src={img} width={500} height={500} alt={`bike-slider-${index}`} />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Slider;


//New simple animation for now


"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";

import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";

import img1 from "../../../assets/slider/bike2.png";
import img2 from "../../../assets/slider/bike1.png";
import img3 from "../../../assets/slider/bike3.png";
import img4 from "../../../assets/slider/bike4.png";
import img5 from "../../../assets/slider/bike-5.png";

const slidesData = [
  {
    title: "Ride-on R15 V4 with Smile",
    desc: "Feel the speed and thrill with R15 V4. Experience smooth rides.",
    img: img1,
  },
  {
    title: "Powerful Street Bike X100",
    desc: "Unleash the beast on the streets. Style meets performance.",
    img: img2,
  },
  {
    title: "Lightning Bolt Z7 Edition",
    desc: "Fast, furious, and futuristic. The ride of your dreams.",
    img: img3,
  },
  {
    title: "Mountain Explorer 500",
    desc: "Conquer every path with comfort and speed on any terrain.",
    img: img4,
  },
  {
    title: "Urban Cruiser 300",
    desc: "City rides never looked so stylish. Smooth & sleek.",
    img: img5,
  },
];

const Slider = () => {
  const swiperRef = useRef(null);

  console.log(swiperRef,'this is swiper ref container in the slider here')
  const animateBike = (slide) => {
    const bike = slide.querySelector(".bike-img img");
    if (!bike) return;

    // Spin + Zoom animation
    gsap.fromTo(
      bike,
      { scale: 0, rotation: 0, opacity: 0 },
      { scale: 1, rotation: 360, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  };

  useEffect(() => {
    if (swiperRef.current) {
      const firstSlide =
        swiperRef.current.swiper.slides[
          swiperRef.current.swiper.activeIndex
        ];
      animateBike(firstSlide);
    }
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      navigation={true}
      modules={[Navigation]}
      loop={true}
      className="mySwiper bg-[#fdf1ee] dark:bg-[#1e1412] rounded-2xl shadow-md mt-6 lg:mt-14"
      onSlideChange={(swiper) => {
        const activeSlide = swiperRef.current.swiper.slides[swiper.activeIndex];
        animateBike(activeSlide);
      }}
    >
      {slidesData.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex flex-col lg:flex-row items-center p-12 md:p-16 lg:p-36">
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl lg:text-6xl lg:font-bold text-text-primary max-w-xl lg:text-left text-center">
                {slide.title}
              </h2>
              <p className="lg:text-xl max-w-xl leading-9 lg:text-left text-center">
                {slide.desc}
              </p>
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <Button className="cursor-pointer">Purchase</Button>
              </div>
            </div>
            <div className="flex-1 pt-6 lg:pt-0 relative">
              <div className="bike-img relative mx-auto">
                <Image
                  src={slide.img}
                  width={500}
                  height={500}
                  alt={`bike-${idx}`}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
