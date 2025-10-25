'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BikeDetailsCard = ({ bikeId }) => {
  const { data: allBikes = [], isLoading, error } = useQuery({
    queryKey: ['all-bikes'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/bikes');
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

  const bike = allBikes.find((bike) => bike._id === bikeId);

  if (!bike)
    return (
      <h2 className="text-red-500 text-center mt-10 text-xl">
        Bike not found
      </h2>
    );

  return (
    <div className="container mx-auto px-4 mt-10 py-6">
      <div className="bg-[#fdf1ee] dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row lg:py-14">
        
        {/* Left: Bike Image */}
        <div className="lg:flex-1 w-full h-80 lg:h-auto p-6">
          <Image
            src={bike.image}
            alt={bike.model}
            width={900}
            height={150}
            className="w-9/12 mx-auto  "
          />
        </div>

        {/* Right: Info */}
        <div className="lg:flex-1 w-full p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {bike.model}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Brand: {bike.brand} | Category: {bike.category}
            </p>
            <p className="text-primary-light dark:text-primary-dark font-bold text-2xl mt-3">
              ${bike.price}
            </p>

            <p className="mt-4 text-gray-700 dark:text-gray-200">{bike.description}</p>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <div><span className="font-semibold">Engine:</span> {bike.engine} cc</div>
              <div><span className="font-semibold">Mileage:</span> {bike.mileage}</div>
              <div><span className="font-semibold">Weight:</span> {bike.weight} kg</div>
              <div><span className="font-semibold">Quantity:</span> {bike.quantity}</div>
            </div>

            {/* Colors */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Colors:</span>
              {bike.colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="capitalize text-gray-700 dark:text-gray-300">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Now Button */}
          <div className="">
            <Link href={``}>
            <button className="w-9/12 mx-auto bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer">
              Buy Now
            </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BikeDetailsCard;
