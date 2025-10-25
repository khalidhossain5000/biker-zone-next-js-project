import AllBikesCard from "@/components/All-Bikes/AllBikesCard";
import React from "react";

const AllBikes = () => {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <h2 className="text-xl text-center pt-6 lg:text-3xl xl:text-5xl font-bold  xl:font-extrabold text-gray-900 dark:text-gray-100 mb-6 inline-block pb-2 container mx-auto">
        All Products
      </h2>

      <div className="container mx-auto">
        <AllBikesCard />
      </div>
    </div>
  );
};

export default AllBikes;
