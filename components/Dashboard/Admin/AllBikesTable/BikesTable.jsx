"use client";

import React, { useState } from "react";
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
import { Trash } from "lucide-react";
import ViewDescriptions from "./ViewDescriptions";

const BikesTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch data
  const {
    data: AllBikes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-bikes"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/bikes");
      return res.data.allBikes;
    },
  });

  if (isLoading) return <h2 className="text-white">Loading bikes...</h2>;
  if (error) return <h2 className="text-red-500">Error loading bikes</h2>;
  //admin actions functionality starts here
  console.log(AllBikes);

  const handleDeleteAdmin = async (bikeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this bike permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/admin/bikes?id=${bikeId}`);

          if (res.data.success) {
            Swal.fire(
              "Deleted!",
              "bike has been deleted successfully.",
              "success"
            );
            refetch();
          }
        } catch (error) {
          console.error("Error deleting bike:", error);
          Swal.fire("Error!", "Failed to delete bike.", "error");
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
            <TableHead className={`font-bold`}>Bike Name</TableHead>
            <TableHead className={`font-bold`}>Image</TableHead>
            <TableHead className={`font-bold`}>Brand </TableHead>
            <TableHead className={`font-bold`}>Category</TableHead>
            <TableHead className={`font-bold`}>isFeatured</TableHead>
            <TableHead className={`font-bold`}>Weight</TableHead>
            <TableHead className={`font-bold`}>Engine</TableHead>
            <TableHead className={`font-bold`}>Colors</TableHead>
            <TableHead className={`font-bold`}>Price</TableHead>
            <TableHead className={`font-bold`}>Quantity</TableHead>
            <TableHead className={`font-bold`}>Milegate</TableHead>
            <TableHead className={`font-bold`}>Descriptions</TableHead>
            <TableHead className={`font-bold`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllBikes.map((bike, index) => (
            <TableRow key={bike._id} className="">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{bike.model}</TableCell>

              <TableCell>
                <img
                  src={bike.image}
                  alt="bike image"
                  className="w-14 rounded-full"
                />
              </TableCell>
              <TableCell>{bike.brand}</TableCell>
              <TableCell>{bike.category}</TableCell>
              <TableCell>{bike.isFeatured}</TableCell>
              <TableCell>{bike.weight}</TableCell>
              <TableCell>{bike.engine}</TableCell>
              <TableCell>
                {bike.colors.map((color, i) => (
                  <h2 key={i}>{color}</h2>
                ))}
              </TableCell>
              <TableCell>{bike.price}</TableCell>
              <TableCell>{bike.quantity}</TableCell>
              <TableCell>{bike.mileage}</TableCell>
              <TableCell>
                <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        View Description
      </button>
       <ViewDescriptions
        description={bike.description}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      
              </TableCell>
              <TableCell className="flex gap-2">
                <button
                  title="Click to delete"
                  onClick={() => handleDeleteAdmin(bike._id)}
                  className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <Trash />
                </button>
              </TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
     
    </div>
  );
};

export default BikesTable;
