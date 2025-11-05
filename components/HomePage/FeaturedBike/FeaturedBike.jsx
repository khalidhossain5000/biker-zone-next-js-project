"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
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

      <div className="py-6 xl:py-20 mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {featuredBikes.slice(0, 3).map((bike) => (
    <div
      key={bike._id}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Image */}
      <div className="relative group">
        <img
          src={bike.image || "https://i.ibb.co/5WJVM6cs/hrnets.jpg"}
          alt={bike.model}
          className="w-full h-60 sm:h-64 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
          {bike.brand}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight hover:text-orange-500 transition-colors duration-300">
          {bike.model}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 font-semibold">
          Price: ৳{bike.price.toLocaleString()}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Brand: {bike.brand}
        </p>
        <Link href={`shop/${bike._id}`}>
        <Button className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl shadow-md transition-all duration-300">
          View Details
        </Button>
        </Link>
      </div>
    </div>
  ))}
</div>








    </div>
  );
};

export default FeaturedBike;
