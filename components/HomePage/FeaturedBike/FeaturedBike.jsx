"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const FeaturedBike = () => {
  // Fetch data
  const {
    data: featuredBikes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured bikes"],
    queryFn: async () => {
      const res = await axios.get("/api/global-bikes/featured");
      return res.data.data;
    },
  });

  if (isLoading) return <h2 className="text-white">Loading Bikesss...</h2>;
  if (error) return <h2 className="text-red-500">Error loading bikes</h2>;
  console.log(featuredBikes, "thi sis featured bikes here");
  return (
    <div className="py-12 lg:py-46">
      <h2 className="text-xl text-center md:text-2xl lg:text-4xl xl:text-5xl font-semibold text-[#000000] dark:text-white">
        Fetured Bikes In This Year
      </h2>
      <h5 className="text-sm lg:text-xl font-bold text-primary text-center py-3">
        Best bike collection
      </h5>
    </div>
  );
};

export default FeaturedBike;
