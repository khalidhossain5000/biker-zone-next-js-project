"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../layout/ImageUploader/ImageUpload";
import axios from "axios";
import { Button } from "@/components/ui/button";

const LatestNewsForm = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newsData = {
      ...data,
      coverImage: imageUrl,
    };
    console.log("News Data:", newsData);
    const res = await axios.post("/api/admin/latest-news", newsData);
    console.log("this is res", res);
    alert("News added successfully!");
    reset();
    setImageUrl(null);
  };

  return (
    <div className="w-full container bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* News Name */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
            News Name
          </label>
          <input
            type="text"
            placeholder="Enter news headline"
            {...register("newsName", { required: "News name is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.newsName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newsName.message}
            </p>
          )}
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
            Cover Image URL
          </label>
          <ImageUpload
            onUpload={(url) => setImageUrl(url)}
            imageUrl={imageUrl}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Write the news description..."
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}

        {/* Submit Button */}
        <Button type="submit" className={`cursor-pointer lg:w-full`}>
          Add News
        </Button>
      </form>
    </div>
  );
};

export default LatestNewsForm;
