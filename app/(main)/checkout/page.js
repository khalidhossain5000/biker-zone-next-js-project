import PaymentsForm from "@/components/Payments/PaymentsForm";
import React from "react";

const Checkout = () => {
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
      <PaymentsForm />
    </div>
  );
};

export default Checkout;
