"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const LatestNewsCard = () => {
  // Fetch data
  const {
    data: AllLatestNews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-newss"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/latest-news");
      return res.data.data;
    },
  });

  if (isLoading) return <h2 className="text-black">Loading newss...</h2>;
  if (error) return <h2 className="text-red-500">Error loading newss</h2>;
  console.log(AllLatestNews, "from all latest enws here");
  return (
    <div>
      <h2 className="text-xl text-center md:text-2xl lg:text-4xl xl:text-5xl font-semibold text-[#000000] dark:text-white">
        Latest News
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 py-6 lg:py-9 xl:py-14">
        {AllLatestNews.map((news) => (
          <div key={news._id}>
            <img className="pb-3" src={news.coverImage} alt="" />
            <h2 className="text-center lg:text-left text-xl lg:text-2xl font-semibold lg:text-bold text-black py-3 ">
              {news.newsName}
            </h2>
            <p className="lg:text-lg text-[#6C6C6C] pb-5">{news.description}</p>
            <button className="py-2 px-6 rounded-lg lg:py-3 lg:px-9 bg-[#ffffff] text-[#E76F51] border  border-[#E76F51] font-bold hover:bg-[#E76F51] hover:text-white transition duration-300 cursor-pointer">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNewsCard;
