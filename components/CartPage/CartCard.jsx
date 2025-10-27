"use client";
import { useCart } from "@/app/ContextApi/CartContext";
import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const CartCard = () => {
  const { finalCartData, totalPrice, refetch } = useCart();
console.log(finalCartData,'this is final cartdata inside cartcard');
  // Remove item handler
  const handleRemove = async (id) => {
    const res = await axios.delete(`/api/carts?id=${id}`);
    if (res.data.success) {
      toast.success("Item removed");
      refetch();
    }
    console.log("this is res from delte hndle", res,'thsi is id',id);
  };

  return (
    <div className="container mx-auto  px-4 md:px-10 py-10 transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold text-gray-800 dark:text-gray-100 mb-8">
        Your Cart Items
      </h2>


      {finalCartData?.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          Your cart is empty
        </p>
      ) : (
        <div className="space-y-5">
          {finalCartData?.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
            >
              {/* Left: Image */}
              <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-24 md:w-40 xl:w-44 object-contain rounded-lg bg-gray-100 p-2"
                />
              </div>

              {/* Right: Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-5/5">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-lg xl:text-2xl lg:font-bold font-semibold text-gray-800 dark:text-gray-100">
                    {item.productName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Quantity: {item.prodcutQuantity}
                  </p>
                  <p className="text-xl font-bold text-[#fa8207]">
                    ৳ {item.productPrice}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="mt-3 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-1 transition"
                >
                  <X size={18} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Section */}
      {finalCartData?.length > 0 && (
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-lg mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Total:
            <span className="text-[#fa8207] font-bold ml-2">
              ৳ {totalPrice}
            </span>
          </h3>
          <Link href={`checkout`}>
          <button className="bg-[#fa8207] hover:bg-[#e67405] text-white font-semibold px-6 py-3 rounded-xl w-full transition">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartCard;
