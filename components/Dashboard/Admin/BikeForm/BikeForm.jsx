"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
const Select = dynamic(() => import("react-select"), { ssr: false });
import ImageUpload from "../../layout/ImageUploader/ImageUpload";
import axios from "axios";
import dynamic from "next/dynamic";

const BikeForm = () => {
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [colors, setColors] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Detect dark theme dynamically (shadcn uses dark class on <html>)
  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const brandOptions = [
    { value: "yamaha", label: "Yamaha" },
    { value: "honda", label: "Honda" },
    { value: "suzuki", label: "Suzuki" },
    { value: "kawasaki", label: "Kawasaki" },
    { value: "ducati", label: "Ducati" },
    { value: "harley-davidson", label: "Harley-Davidson" },
    { value: "ktm", label: "KTM" },
    { value: "royal enfield", label: "Royal Enfield" },
    { value: "hero", label: "Hero" },
    { value: "bajaj", label: "Bajaj" },
    { value: "tvs", label: "TVS" },
  ];

  const categoryOptions = [
    { value: "sports", label: "Sports" },
    { value: "cruiser", label: "Cruiser" },
    { value: "scooter", label: "Scooter" },
    { value: "adventure", label: "Adventure" },
    { value: "standard", label: "Standard" },
    { value: "electric", label: "Electric" },
  ];

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "green", label: "Green" },
  ];

  const reactSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "white",
      borderColor: isDark ? "#374151" : "#d1d5dc",
      "&:hover": { borderColor: "#e76f51" },
      boxShadow: "none",
      color: isDark ? "#f9fafb" : "#111827",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#f9fafb" : "#111827",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#374151" : "#e5e7eb",
      color: isDark ? "#f9fafb" : "#111827",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#f9fafb" : "#111827",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "#f9fafb" : "#111827",
      "&:hover": { backgroundColor: "#e76f51", color: "white" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? "#4b5563"
          : "#f3f4f6"
        : state.isSelected
        ? "#e76f51"
        : isDark
        ? "#1f2937"
        : "white",
      color: state.isSelected ? "white" : isDark ? "#f9fafb" : "#111827",
      "&:hover": { backgroundColor: "#e76f51", color: "white" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "white",
    }),
  };

  const onSubmit = async (data) => {
    data.brand = brand?.value;
    data.category = category?.value;
    data.colors = colors.map((c) => c.value);
    data.image = imageUrl;
    console.log("Bike Data Submitted:", data);
    // data saving to the db start
    try {
      const res = await axios.post("/api/admin/bikes", data);
      alert("bike added");
      
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // data saving to the db ends
    reset();
    setBrand(null);
    setCategory(null);
    setColors([]);
    setImageUrl(null);
  };

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-gray-900/60 shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
        Add New Bike
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Bike Model + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Bike Name / Model
            </label>
            <input
              {...register("model", { required: true })}
              placeholder="Enter bike name or model"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">Model name is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Category
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={category}
                  onChange={(val) => {
                    field.onChange(val);
                    setCategory(val);
                  }}
                  options={categoryOptions}
                  placeholder="Select category"
                  styles={reactSelectStyles}
                  isClearable
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Brand + Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Brand
            </label>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={brand}
                  onChange={(val) => {
                    field.onChange(val);
                    setBrand(val);
                  }}
                  options={brandOptions}
                  placeholder="Select brand"
                  styles={reactSelectStyles}
                  isClearable
                />
              )}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Colors
            </label>
            <Select
              isMulti
              value={colors}
              onChange={setColors}
              options={colorOptions}
              placeholder="Select colors"
              styles={reactSelectStyles}
            />
          </div>
        </div>

        {/* Engine + Mileage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Engine CC
            </label>
            <input
              {...register("engine", { required: true })}
              placeholder="e.g. 150cc"
              type="number"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
            {errors.engine && (
              <p className="text-red-500 text-sm">Engine CC is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Mileage (km/l)
            </label>
            <input
              {...register("mileage")}
              type="number"
              placeholder="e.g. 45 km/l"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
          </div>
        </div>

        {/* Price + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Price (৳)
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Enter price"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              {...register("weight")}
              placeholder="e.g. 140"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
          </div>
        </div>

        {/* Quantity + Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", { required: true,valueAsNumber: true })}
              placeholder="Available quantity"
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">Quantity is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Is Featured?
            </label>
            <select
              {...register("isFeatured")}
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51]"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>

        {/* Description + Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Write bike details..."
              rows={5}
              className="w-full p-3 border rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#e76f51] focus:border-[#e76f51] resize-none"
            />
          </div>

           <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Bike Image
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
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-[#e76f51] hover:bg-[#d65e46] text-white rounded-lg font-semibold transition w-9/12"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BikeForm;
