"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../layout/ImageUploader/ImageUpload";

const LatestNewsForm = () => {
    const [imageUrl, setImageUrl] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newsData={
      ...data,
      coverImage:imageUrl
    }
    console.log("News Data:", newsData);
    alert("News added successfully!");
    reset();
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
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Politics">Politics</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Read More URL */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">
            Read More URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/read-more"
            {...register("readMore", {
              required: "Read More URL is required",
            })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.readMore && (
            <p className="text-red-500 text-sm mt-1">
              {errors.readMore.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition duration-200"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default LatestNewsForm;
