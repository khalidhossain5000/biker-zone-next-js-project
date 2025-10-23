"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LatestNewsTable = () => {
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

  if (isLoading) return <h2 className="text-white">Loading newss...</h2>;
  if (error) return <h2 className="text-red-500">Error loading newss</h2>;
  //admin actions functionality starts here
  console.log(AllLatestNews, "this is all latest news");

  const handleDeleteAdmin = async (newsId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this news permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/admin/newss?id=${newsId}`);

          if (res.data.success) {
            Swal.fire(
              "Deleted!",
              "news has been deleted successfully.",
              "success"
            );
            refetch();
          }
        } catch (error) {
          console.error("Error deleting news:", error);
          Swal.fire("Error!", "Failed to delete news.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto overflow-x-auto w-full p-6 mt-6 bg-white dark:bg-gray-900 rounded-lg">
      <Table className="">
        <TableHeader className="bg-white dark:bg-gray-800 text-black dark:text-gray-200">
          <TableRow className="lg:text-xl">
            <TableHead className={`font-bold`}>S/L</TableHead>
            <TableHead className={`font-bold`}>Cover Image</TableHead>
            <TableHead className={`font-bold`}>News Title</TableHead>
            <TableHead className={`font-bold`}>Description</TableHead>
            <TableHead className={`font-bold`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllLatestNews.map((news, index) => (
            <TableRow key={news._id} className="">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={news.coverImage}
                  className="w-14 lg:w-22 rounded-full"
                  alt=""
                />
              </TableCell>
              <TableCell>
                <h2 className="">{news.newsName}</h2>
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer rounded">
                      View Description
                    </button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-lg xl:max-w-xl">
                    <DialogHeader>
                      <DialogTitle>News Description</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      {news.description}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="flex gap-2">
                <button
                  onClick={() => handleDeleteAdmin(news._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestNewsTable;
