"use client";
import Loading from "@/app/loading";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for at least 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading/>; // show loader
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1115] text-white">
      <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
      <p className="text-gray-400 text-lg">We’d love to hear from you!</p>
    </div>
  );
};

export default Page;
