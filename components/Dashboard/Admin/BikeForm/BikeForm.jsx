'use client'
import React, { useState } from "react";
import Select from "react-select";
import ImageUpload from "../../layout/ImageUploader/ImageUpload";

const BikeForm = () => {
  const [brand, setBrand] = useState(null);
  const [colors, setColors] = useState([]);
const [imageUrl,setImageUrl]=useState(null)
  const brandOptions = [
    { value: "Yamaha", label: "Yamaha" },
    { value: "Honda", label: "Honda" },
    { value: "Suzuki", label: "Suzuki" },
    { value: "Kawasaki", label: "Kawasaki" },
  ];

  const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Green", label: "Green" },
  ];
  console.log('this is image url this',imageUrl);
  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Bike
      </h2>

      <ImageUpload onUpload={(url) => setImageUrl( url)}/>
    </div>
  );
};

export default BikeForm;
