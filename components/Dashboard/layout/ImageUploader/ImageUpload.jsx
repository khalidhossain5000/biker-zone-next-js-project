"use client";
import axios from "axios";
import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const ImageUpload = ({onUpload,imageUrl}) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    if(!imageUrl){
      setPreview(null)
    }
  },[imageUrl])
  const handleFileChange = async(e) => {
    e.preventDefault();
    const file=e.target.files[0]
    if(!file) return
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    const formData=new FormData()
    formData.append("image", file);
    try{
        const res=await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,formData)
        if (res.data.success) {
        const imageUrl = res.data.data.url;
        onUpload(imageUrl); 
        
      }
      
    }
    catch(error){
        console.log(error,'image upload eror');
    }
    finally{
        setUploading(false)
    }
  };
  
  const handleRemove=()=>{
    setPreview(null);
    onUpload("");

  }
  return (
    <div className="w-full flex flex-col    gap-3  h-full">
      {!preview ? (
        <label className="py-6 h-9/12 xl:py-0 container border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition dark:text-white">
          <Upload className="w-10 h-10 text-gray-400 dark:text-white" />
          <p className="text-sm text-gray-400 mt-2">
            {uploading ? "Uploading..." : "Upload Image"}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden "
          />
        </label>
      ) : (
        <div className="relative w-40 h-40">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-xl border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
