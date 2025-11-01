"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";
// import { useCart } from "@/app/ContextApi/CartContext";

const OrdersTable = () => {
  const userCartEmail=''
  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/all-orders-payments");
      return res.data.result;
    },
  });

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(`/api/admin/all-orders-payments?id=${id}`);
      if (res.data.success) {
        toast.success("Order marked as completed!");
        refetch();
      } else {
        toast.error("Something went wrong while completing order!");
      }
    } catch (err) {
      console.error("Complete failed:", err);
      toast.error("Failed to complete order!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/admin/all-orders-payments?id=${id}`);
      if (res.data.success) {
        toast.success("Order deleted successfully!");
        refetch();
      } else {
        toast.error("Something went wrong while deleting order!");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete order!");
    }
  };

  
 const handleSendEmail = async (orderId) => {
    if (!userCartEmail) {
      alert("User email not found!");
      return;
    }

    try {
      const { data } = await axios.post("/api/emailsend/invoice-send", {
        orderId,
        to: userCartEmail, 
      });

      alert(data.message || "Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to send email");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          Loading Orders...
        </span>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load orders!
      </p>
    );

  //  If no orders found
  if (!orders || orders.length === 0)
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <Info className="w-10 h-10 text-blue-500 mb-3" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          No Orders Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there are no orders to display right now.
        </p>
      </div>
    );

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        All Orders
      </h2>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-100">#</TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100">
                User Email
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100">
                Payment Method
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100">
                Transaction ID
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100">
                Payment Status
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100">
                Items
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-100 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.userCartEmail}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.transactionId}</TableCell>

                {/* ✅ Payment Status */}
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.paymentStatus === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                        : order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                    }`}
                  >
                    {order.paymentStatus || "Unknown"}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="space-y-2 min-w-[220px]">
                    {order.paymentItem.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b dark:border-gray-700 pb-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                              {item.productName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Price: ৳{item.productPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>

                {/* ✅ Actions column */}
                <TableCell className="text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => handleComplete(order._id)}
                      className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition w-full sm:w-auto"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleSendEmail(order._id)}
                      className="cursor-pointer bg-slate-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition w-full sm:w-auto"
                    >
                      Send Invoice To User Email
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default OrdersTable;
