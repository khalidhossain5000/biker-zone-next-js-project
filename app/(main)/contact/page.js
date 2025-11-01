"use client";
import Loading from "@/app/loading";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
const divRef=useRef(null)

console.log('this is div ref in contact',divRef);
  useEffect(() => {
    // Show loader for at least 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading/>; // show loader
  }

  return (
    <div ref={divRef} className="flex flex-col items-center justify-center h-screen bg-[#0f1115] text-white">
      <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
      <p className="text-gray-400 text-lg">We’d love to hear from you!</p>
    </div>
  );
};

export default Page;
