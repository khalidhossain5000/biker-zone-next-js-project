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

const UsersTable = () => {
  // Fetch data
  const {
    data: AllUsers = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/users");
      return res.data.data;
    },
  });

  if (isLoading) return <h2 className="text-white">Loading users...</h2>;
  if (error) return <h2 className="text-red-500">Error loading users</h2>;
//admin actions functionality starts here 

const handleMakeAdmin = async (userId) => {
  try {
    const res = await axios.patch(`/api/admin/users?id=${userId}&action=make`);
    console.log(res.data);
    refetch()
    toast.success("User promoted to Admin successfully!");
  } catch (error) {
    console.error("Error promoting user:", error);
    toast.error("Failed to make admin!");
  }
};
const handleRemoveAdmin = async (userId) => {
  try {
    const res = await axios.patch(`/api/admin/users?id=${userId}&action=remove`);
    console.log(res.data);
    refetch()
    toast.success("Admin removed successfully!");
  } catch (error) {
    console.error("Error removing admin:", error);
    toast.error("Failed to remove admin!");
  }
};
  return (
    <div className="container mx-auto overflow-x-auto w-full p-6 mt-6 bg-white dark:bg-gray-900 rounded-lg">
      <Table className="">
        <TableHeader className="bg-white dark:bg-gray-800 text-black dark:text-gray-200">
          <TableRow className='lg:text-xl'>
            <TableHead className={`font-bold`}>S/L</TableHead>
            <TableHead className={`font-bold`}>ID</TableHead>
            <TableHead className={`font-bold`}>Name</TableHead>
            <TableHead className={`font-bold`}>Email</TableHead>
            <TableHead className={`font-bold`}>Role</TableHead>
            <TableHead className={`font-bold`}>Provider</TableHead>
            <TableHead className={`font-bold`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllUsers.map((user, index) => (
            <TableRow
              key={user._id}
             className=''
            >
              <TableCell>{index+1}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.provider}</TableCell>
              <TableCell className="flex gap-2">
  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
    Delete
  </button>
  <button onClick={()=>handleMakeAdmin(user._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
    Make Admin
  </button>
  <button onClick={() => handleRemoveAdmin(user._id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
    Remove Admin
  </button>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
