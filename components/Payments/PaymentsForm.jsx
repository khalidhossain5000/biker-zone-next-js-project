"use client";
import { useCart } from "@/app/ContextApi/CartContext";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const PaymentsForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [transactionId, setTransactionId] = useState("");
  const { finalCartData, totalPrice,userCartEmail } = useCart();
  const guidelines = {
    bKash: "Send payment to 01634933390 and enter the transaction ID above.",
    Rocket: "Send payment to 01934933399 and enter the transaction ID above.",
    Nagad: "Send payment to 01712345678 and enter the transaction ID above.",
    Upay: "Send payment to 01898765432 and enter the transaction ID above.",
  };
  const cartItem = { ...finalCartData };
  console.log("this is cartItem", cartItem,'final cart item',finalCartData,userCartEmail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId) {
      alert("Please enter your transaction ID.");
      return;
    }
    const paymentData = {
      userCartEmail,
      paymentItem: [...finalCartData],
      transactionId,
      paymentMethod,
      paymentStatus:'pending'
    };
    const res = await axios.post("/api/payments", paymentData);
    if (res.data.message) {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment has been completed successfully!",
        confirmButtonColor: "#fa8207",
      });
    }
    console.log(res, "this is payemtn success res");
    setTransactionId("");
  };
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Complete Your Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="bKash">bKash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Upay">Upay</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter your transaction ID"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fa8207] hover:bg-orange-600 text-black dark:text-white font-bold py-2 rounded transition-colors"
          >
            Pay $ {totalPrice}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h3 className="text-lg font-semibold mb-2">Payment Guidelines:</h3>
          <p>{guidelines[paymentMethod]}</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentsForm;
