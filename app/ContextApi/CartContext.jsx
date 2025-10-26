'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { createContext, useContext } = require("react");

//create context
const CartContext=createContext()

//context provider
export const CartProvider=({children})=>{
    // Fetch data
      const {
        data: cartData = [],
        isLoading,
        error,
        refetch
      } = useQuery({
        queryKey: ["all-carts"],
        queryFn: async () => {
          const res = await axios.get("/api/carts");
          return res.data.result;
        },
      });
    
      if (isLoading)
        return (
          <h2 className="text-gray-800 dark:text-gray-100 text-center mt-10 text-xl">
            Loading bikes...
          </h2>
        );
      if (error)
        return (
          <h2 className="text-red-500 text-center mt-10 text-xl">
            Error loading bikes
          </h2>
        );
   
    const cartCount=cartData.length
    //total price
    const totalPrice=cartData.reduce((sum,item)=>{
      return sum+parseInt(item.productPrice)
    },0)
    const info={
        cartCount,
        cartData,
        refetch,
        totalPrice
    }
    return (
        <CartContext value={info}>
            {children}
        </CartContext>
    )
}

export const useCart=()=>useContext(CartContext
)