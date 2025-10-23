import BikesTable from "@/components/Dashboard/Admin/AllBikesTable/BikesTable";
import React from "react";

const AllBikes = () => {
  return (
    <div className="p-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 ">
        All Bikes
      </h2>
      <BikesTable/>
    </div>
  );
};

export default AllBikes;
