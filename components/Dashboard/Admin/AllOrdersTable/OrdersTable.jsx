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
import { Loader2 } from "lucide-react";

const OrdersTable = () => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/all-orders");
      return res.data.result;
    },
  });

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

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        All Orders
      </h2>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-100">
                #
              </TableHead>
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
                Items
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.userCartEmail}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {order.paymentItem.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 border-b dark:border-gray-700 pb-2"
                      >
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
                    ))}
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
