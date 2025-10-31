"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MdEmojiEvents, MdSell } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

const UserHome = () => {
  // ✅ Replace this with your logged-in user's email dynamically later
  const {data:session}=useSession()
  const userEmail = session?.user?.email;
  // ✅ Fetch order stats data using Tanstack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-order-stats", userEmail],
    queryFn: async () => {
      const res = await axios.get(`/api/user-order-data-stats?email=${userEmail}`);
      return res.data.stats;
    },
    enabled:!!userEmail
  });

  if (isLoading)
    return (
      <h2 className="text-center text-black dark:text-white">Loading stats...</h2>
    );

  if (error)
    return <h2 className="text-center text-red-500">Error loading stats</h2>;

  const { totalOrders = 0, completedOrders = 0, pendingOrders = 0 } = data || {};

  return (
    <div className="container mx-auto">
      <div className="py-3 lg:py-6 flex flex-col md:flex-row justify-between">
        <h1 className="text-xl font-bold">My Order Overview</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* ✅ Total Orders */}
        <div className="relative w-full max-w-xs sm:max-w-lg rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl h-full">
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <MdEmojiEvents className="w-40 h-40 text-white rotate-12" />
          </div>
          <div className="relative flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
                  Total Orders
                </h2>
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <MdEmojiEvents className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 flex items-center pt-2">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold opacity-90">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Completed Orders */}
        <div className="relative w-full max-w-xs sm:max-w-lg rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl h-full">
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <MdSell className="w-40 h-40 text-white rotate-12" />
          </div>
          <div className="relative flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
                  Completed Orders
                </h2>
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <MdSell className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 flex items-center pt-2">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {completedOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Pending Orders */}
        <div className="relative w-full max-w-xs sm:max-w-lg rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl h-full">
          <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
            <FaRegMoneyBillAlt className="w-40 h-40 text-white rotate-12" />
          </div>
          <div className="relative flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
                  Pending Orders
                </h2>
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <FaRegMoneyBillAlt className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 flex items-center pt-2">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {pendingOrders}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
