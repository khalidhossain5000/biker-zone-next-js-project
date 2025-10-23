"use client";
import { Button } from "@/components/ui/button";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredBikes.slice(0, 3).map((bike) => (
          <div
            key={bike._id}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden flex flex-col pt-6 xl:pt-16"
          >
            <img
              src={bike.image || "https://i.ibb.co.com/5WJVM6cs/hrnets.jpg"}
              alt={bike.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {bike.model}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Price: ৳{bike.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Brand: {bike.brand}
              </p>
              <Button className="mt-auto cursor-pointer">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBike;
