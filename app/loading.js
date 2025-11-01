"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import bikeLogo from "../assets/loadingImgs/bike-logs.png"; // demo path - change if needed


const Loading = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate outer ring continuously
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 6,
        ease: "linear",
        repeat: -1,
        transformOrigin: "center center",
      });

      // Slight pulsing for bike logo
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "easeInOut",
      });

      // Soft glowing animation
      gsap.to(containerRef.current, {
        boxShadow: "0 0 40px #3b82f6, 0 0 80px #1e40af",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1115] text-white overflow-hidden">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-[#0f1115] border-4 border-blue-600 shadow-[0_0_25px_#2563eb] overflow-hidden"
      >
        {/* Outer glowing rotating ring */}
        <div
          ref={ringRef}
          className="absolute inset-0 border-[6px] border-t-blue-400 border-r-transparent border-b-blue-600 border-l-transparent rounded-full"
        ></div>

        {/* Bike Logo */}
        <Image
          ref={logoRef}
          src={bikeLogo}
          alt="Bike Loader"
          width={110}
          height={110}
          className="relative drop-shadow-[0_0_15px_#60a5fa] rounded-full"
        />
      </div>

      <div className="mt-10 text-blue-400 text-lg tracking-widest font-semibold">
        Loading<span className="animate-pulse">...</span>
      </div>
    </div>
  );
};

export default Loading;
