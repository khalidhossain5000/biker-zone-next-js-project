"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const AllBikesCard = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBrand, setFilterBrand] = useState("all");

  // Fetch data
  const {
    data: AllBikes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-bikes"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/bikes");
      return res.data.allBikes;
    },
  });

  if (isLoading)
    return (
      <h2 className="text-gray-800 dark:text-gray-100 text-center mt-10 text-xl">
        Loading bikes...
      </h2>
    );
  if (error)
    return (
      <h2 className="text-red-500 text-center mt-10 text-xl">
        Error loading bikes
      </h2>
    );

  // Filter bikes
  const filteredBikes = AllBikes.filter(
    (bike) =>
      (filterCategory === "all" || bike.category === filterCategory) &&
      (filterBrand === "all" || bike.brand === filterBrand)
  );

  // Unique categories & brands
  const categories = Array.from(new Set(AllBikes.map((b) => b.category)));
  const brands = Array.from(new Set(AllBikes.map((b) => b.brand)));

  return (
    <div className="flex flex-col lg:flex-row  p-6 gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 lg:mb-0 lg:sticky top-6 self-start">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Filters
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="all">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Brand
          </label>
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="all">All</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setFilterCategory("all");
            setFilterBrand("all");
          }}
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Bikes Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg  hover:shadow-2xl transition-shadow duration-300 pb-6 flex flex-col justify-between"
          >
            <div className="relative">
              <img
                src={bike.image}
                alt={bike.model}
                className="w-full h-48 object-cover"
              />
              {bike.isFeatured === "true" && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 font-bold px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {bike.model}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {bike.brand} - {bike.category}
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
                Price: ${bike.price}
              </p>

              <div className="mt-3">
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                  Engine: {bike.engine} cc
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                  Mileage: {bike.mileage} km/l
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                  Weight: {bike.weight} kg
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                  Quantity: {bike.quantity}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 font-medium">
                  Available Colors:
                </p>
                <div className="flex flex-wrap gap-2">
                  {bike.colors.map((color, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-sm">
                      <span
                        className="w-5 h-5 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="text-gray-700 dark:text-gray-200 capitalize">
                        {color}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                {bike.description}
              </p>
            </div>
            <div className="text-center">
              <Link
                href={`/all-bikes/${bike._id}`}
                className="w-9/12 mx-auto bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBikesCard;
