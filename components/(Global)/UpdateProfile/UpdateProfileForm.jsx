"use client";

import ImageUpload from "@/components/Dashboard/layout/ImageUploader/ImageUpload";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateProfileForm = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
console.log(imageUrl,'image url this is si ');
  // Fetch current user data
  const {
    data: singleUserData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["single-user", userEmail],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/single-users?email=${userEmail}`);
      return res.data.data;
    },
    enabled: !!userEmail,
  });

  // Set default values
  useEffect(() => {
    if (singleUserData) {
      setUsername(singleUserData.name || "");
      setImageUrl(singleUserData.image || "");
    }
  }, [singleUserData]);

  if (isLoading || status !== "authenticated")
    return (
      <h2 className="text-gray-800 dark:text-gray-100 text-center mt-10 text-xl">
        Loading user...
      </h2>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        name: username,
        image: imageUrl,
      };

      await axios.put(`/api/admin/update-user?email=${userEmail}`, updatedData);
      toast.success("Profile updated successfully!");
      refetch();
      queryClient.invalidateQueries(["single-user", userEmail]);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-[#f2730f] dark:text-orange-400 text-center">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username Input */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-[#f2730f] focus:ring-2 focus:ring-[#f2730f] rounded-lg dark:bg-gray-800 dark:border-orange-400 dark:text-gray-100 transition-colors duration-300"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Profile Image
          </label>
          <ImageUpload onUpload={(url) => setImageUrl(url)} imageUrl={imageUrl} />
          {imageUrl && (
            <p className="text-[#f2730f] dark:text-orange-400 text-sm mt-2">
              Image uploaded successfully!
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-[#f2730f] hover:bg-[#e26300] text-white font-semibold transition-colors duration-300 dark:bg-orange-500 dark:hover:bg-orange-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
