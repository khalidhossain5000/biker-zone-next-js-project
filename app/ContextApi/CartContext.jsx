"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

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

  

  const cartCount = cartData?.cartItems?.length;
  const finalCartData = cartData?.cartItems;
  const userCartEmail = cartData?.userEmail;
  console.log(userCartEmail,'this is in user context api of cart context');
  //total price
  const totalPrice = cartData?.cartItems?.reduce((sum, item) => {
    return sum + parseInt(item.productPrice);
  }, 0);

  //clear cart after the user make payment

  const handleClearUserCart = async () => {
    try {
      const res = await axios.delete(
        `/api/admin/clear-cart?email=${userCartEmail}`
      );

      if (res.data.success) {
        toast.success("Item removed");
        console.log(res, "this is res in handleclearcart user ucar");
        refetch(); // cart update
      } else {
        toast.error("Failed to remove item");
      }

      console.log("Deleted item response:", res);
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error("Something went wrong!");
    }
  };

  //reduce item quantity after payment success
  const reduceQuantity=async ()=>{
    
  }
  const info = {
    cartCount,
    finalCartData,
    refetch,
    totalPrice,
    userCartEmail,
    handleClearUserCart,
  };
  return <CartContext value={info}>{children}</CartContext>;
};

export const useCart = () => useContext(CartContext);
