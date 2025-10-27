"use client";

import ImageUpload from "@/components/Dashboard/layout/ImageUploader/ImageUpload";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfileForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const { data: session, status } = useSession();

  const userCartEmail = session?.user?.email;
  //fetch data

  const {
    data: singleUserData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/admin/single-users?email=${userCartEmail}`
      );
      return res.data.data;
    },
    enabled: !!userCartEmail,
  });

  if (isLoading || status !== "authenticated")
    return (
      <h2 className="text-gray-800 dark:text-gray-100 text-center mt-10 text-xl">
        Loading bikes...
      </h2>
    );
  console.log(
    singleUserData,
    "this is singleu ser data",
    userCartEmail,
    "this is cart email here"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your username"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            Profile Image
          </label>
          <ImageUpload
            onUpload={(url) => setImageUrl(url)}
            imageUrl={imageUrl}
          />
          {imageUrl && (
            <p className="text-[#e76f51] text-sm mt-2">
              Image uploaded successfully!
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
