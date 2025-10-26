"use client";
import React, { useState } from "react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [transactionId, setTransactionId] = useState("");

  const guidelines = {
    bKash: "Send payment to 01634933390 and enter the transaction ID above.",
    Rocket: "Send payment to 01934933399 and enter the transaction ID above.",
    Nagad: "Send payment to 01712345678 and enter the transaction ID above.",
    Upay: "Send payment to 01898765432 and enter the transaction ID above.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transactionId) {
      alert("Please enter your transaction ID.");
      return;
    }
    alert(`Payment submitted for ${paymentMethod} with ID: ${transactionId}`);
    setTransactionId("");
  };

  return (
    <div className="w-full">
      {/* Banner Section - original style kept intact */}
      <section className="w-full py-20 text-center bg-gradient-to-r from-[#06283D] to-[#00A3E0] text-white rounded-b-3xl shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            Checkout
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90">
            Review your order carefully — confirm items, choose payment, and
            complete your purchase securely.
          </p>
        </div>
      </section>

      {/* Form Section - completely separate */}
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
              className="w-full bg-[#fa8207] hover:bg-orange-600 text-white font-bold py-2 rounded transition-colors"
            >
              Complete Payment
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <h3 className="text-lg font-semibold mb-2">Payment Guidelines:</h3>
            <p>{guidelines[paymentMethod]}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
