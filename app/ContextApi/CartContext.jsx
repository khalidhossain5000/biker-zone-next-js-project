"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const { createContext, useContext } = require("react");

//create context
const CartContext = createContext();

//context provider
export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();

  // Fetch data
  const {
    data: cartData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-carts"],
    queryFn: async () => {
      const res = await axios.get(`/api/carts?email=${session?.user?.email}`);
      return res.data.result;
    },
    enabled: !!session?.user?.email,
  });

  if (isLoading || status !== "authenticated")
    return (
      <h2 className="text-gray-800 dark:text-gray-100 text-center mt-10 text-xl">
        Loading bikes...
      </h2>
    );
  console.log(
    cartData,
    "this is cartdata this is what ",
    session.user.email,
    status
  );
  if (error)
    return (
      <h2 className="text-red-500 text-center mt-10 text-xl">
        Error loading bikes
      </h2>
    );

  const cartCount = cartData?.cartItems?.length;
  const finalCartData=cartData?.cartItems;
  const userCartEmail=cartData?.userEmail
  //total price
  const totalPrice = cartData?.cartItems?.reduce((sum, item) => {
    return sum + parseInt(item.productPrice);
  }, 0);
  const info = {
    cartCount,
    finalCartData,
    refetch,
    totalPrice,
    userCartEmail
  };
  return <CartContext value={info}>{children}</CartContext>;
};

export const useCart = () => useContext(CartContext);
