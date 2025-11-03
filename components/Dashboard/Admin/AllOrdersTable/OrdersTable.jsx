"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import logo from '../../../../assets/logo/logo-go.png'
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

const OrdersTable = () => {
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

  const handleSendEmail = async (order) => {
    console.log(order, "📦 Order data before sending email");

    const cartMail = order?.userCartEmail;
    if (!cartMail) {
      alert("❌ User email not found!");
      return;
    }

    // ✅ Build professional invoice HTML
    const invoiceHtml = `
    <div style="
      background-color: #ec8927;
      padding: 20px;
      color: #333;
    ">
      <div style="
        max-width: 900px;
        margin: auto;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        overflow: hidden;
      ">
        <!-- Header -->
        <div style="
          background-color: #1e40af;
          color: #fff;
          padding: 25px;
          text-align: center;
        ">
          <h1 style="margin: 0; font-size: 26px;">Order Invoice</h1>
          <p style="margin: 5px 0 0; font-size: 15px; opacity: 0.9;">
            Thank you for shopping with us!
          </p>
        </div>

        <!-- Order Info -->
        <div style="padding: 25px;">
          <h2 style="font-size: 20px; color: #1e40af; margin-bottom: 15px;">Order Summary</h2>

          <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> 
            <span style="
              color: ${
                order.paymentStatus === "completed" ? "green" : "orange"
              };
              font-weight: bold;
            ">
              ${order.paymentStatus}
            </span>
          </p>
          <p><strong>Email:</strong> ${order.userCartEmail}</p>
        </div>

        <!-- Product Details -->
        <div style="padding: 0 25px 25px;">
          <h3 style="font-size: 18px; color: #1e40af; margin-bottom: 10px;">Purchased Item</h3>
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left;">
                <th style="padding: 10px;">Image</th>
                <th style="padding: 10px;">Product</th>
                <th style="padding: 10px;">Quantity</th>
                <th style="padding: 10px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.paymentItem
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px;">
                    <img src="${item.productImage}" alt="${item.productName}" width="70" style="border-radius: 8px;"/>
                  </td>
                  <td style="padding: 10px;">${item.productName}</td>
                  <td style="padding: 10px;">${item.prodcutQuantity}</td>
                  <td style="padding: 10px;">$${item.productPrice}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <!-- Total -->
        <div style="
          padding: 20px 25px;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <strong style="font-size: 18px;">Total Amount:</strong>
          <span style="font-size: 18px; font-weight: bold; color: #1e40af;">
            $${order.paymentItem
              .reduce((sum, item) => sum + Number(item.productPrice), 0)
              .toFixed(2)}
          </span>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #1e3a8a;
          color: #fff;
          text-align: center;
          padding: 20px;
          font-size: 13px;
        ">
          <p style="margin: 0;">If you have any questions about your order, contact us at
            <a href="mailto:support@yourcompany.com" style="color: #93c5fd;">support@yourcompany.com</a>
          </p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

    try {
      const { data } = await axios.post("/api/emailsend/invoice-send", {
        to: cartMail,
        subject: `🧾 Invoice for Order ${order.transactionId}`,
        html: invoiceHtml,
      });

      alert(data.message || "✅ Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "❌ Failed to send email");
    }
  };





// const handleSendEmail = async (order) => {
//   console.log(order, "📦 Order data before sending email");
//   const cartMail = order?.userCartEmail;
//   if (!cartMail) {
//     alert("❌ User email not found!");
//     return;
//   }

// const invoiceHtml = `
// <div style="background:#f4f6f8;padding:40px 0;font-family:Arial,sans-serif;">
//   <div style="max-width:900px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.15);position:relative;">

//     <!-- Header -->
//     <div style="display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#0371a2,#04c6f8);color:#fff;padding:30px 0px;border-bottom:4px solid #0371a2;flex-wrap:wrap;">
//       <div style="display:flex;align-items:center;gap:15px;flex:1;">
//         <img src="https://i.ibb.co.com/SDVK7yPN/logo-go.png" style="width:80px;height:auto;border-radius:12px;background:#fff;padding:5px;" />
//         <div style="text-align:left;">
//           <h1 style="margin:0;font-size:26px;font-weight:bold;">BikeShop</h1>
//           <p style="margin:2px 0 0;font-size:14px;opacity:0.9;">Premium Motorcycle Store</p>
//         </div>
//       </div>
//       <div style="text-align:right;flex:1;margin-top:10px;">
//         <h2 style="margin:0;font-size:22px;font-weight:bold;">INVOICE</h2>
//         <p style="margin:5px 0 0;font-size:14px;opacity:0.9;">Invoice No-${order.transactionId}</p>
//         <p style="margin:2px 0 0;font-size:14px;opacity:0.9;">${new Date().toLocaleDateString()}</p>
//       </div>
//     </div>

//     <!-- Customer & Payment Info -->
//     <div style="padding:30px 40px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;text-align:left;">
//       <div style="flex:1;">
//         <h3 style="margin:0 0 10px;font-size:18px;color:#0371a2;border-bottom:2px solid #e5e7eb;padding-bottom:5px;">Customer Info</h3>
//         <p style="margin:5px 0;font-size:14px;"><strong>Email:</strong> ${order.userCartEmail}</p>
//       </div>
//       <div style="flex:1;">
//         <h3 style="margin:0 0 0px;font-size:18px;color:#0371a2;border-bottom:2px solid #e5e7eb;padding-bottom:5px;">Payment Info</h3>
//         <p style="margin:5px 0;font-size:14px;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
//         <p style="margin:5px 0;font-size:14px;"><strong>Status:</strong> 
//           <span style="background-color:${order.paymentStatus==='completed'?'#10b981':'#f59e0b'};color:#fff;padding:4px 10px;border-radius:5px;font-weight:600;text-transform:uppercase;">${order.paymentStatus}</span>
//         </p>
//       </div>
//     </div>

//     <!-- Product Table -->
//     <div style="padding:0 40px 30px;text-align:center;">
//       <h3 style="font-size:18px;color:#0371a2;margin-bottom:12px;">Purchased Items</h3>
//       <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:14px;text-align:center;">
//         <thead style="background:#f0f4f8;">
//           <tr>
//             <th style="padding:10px;border-bottom:1px solid #e5e7eb;">Image</th>
//             <th style="padding:10px;border-bottom:1px solid #e5e7eb;">Product</th>
//             <th style="padding:10px;border-bottom:1px solid #e5e7eb;">Qty</th>
//             <th style="padding:10px;border-bottom:1px solid #e5e7eb;">Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${order.paymentItem.map(item => `
//             <tr>
//               <td style="padding:10px;border-top:1px solid #e5e7eb;">
//                 <img src="${item.productImage}" style="width:60px;border-radius:6px;border:1px solid #ddd;" />
//               </td>
//               <td style="padding:10px;border-top:1px solid #e5e7eb;">${item.productName}</td>
//               <td style="padding:10px;border-top:1px solid #e5e7eb;text-align:center;">${item.prodcutQuantity}</td>
//               <td style="padding:10px;border-top:1px solid #e5e7eb;color:#0371a2;font-weight:600;">$${item.productPrice}</td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>
//     </div>

//     <!-- Total + Status -->
//     <div style="display:flex;justify-content:space-around;align-items:center;background:#f3f6f8;border-top:2px solid #e5e7eb;padding:25px;position:relative;flex-wrap:wrap;">
//       <div style="flex:1;min-width:150px;text-align:center;margin-bottom:10px;">
//         <p style="margin:0 0 5px;font-size:14px;">Order Status:</p>
//         <span style="background:#0371a2;color:#fff;padding:6px 12px;border-radius:6px;font-weight:600;font-size:14px;letter-spacing:0.5px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">RECEIVED</span>
//       </div>
//       <div style="flex:1;text-align:center;min-width:150px;margin-bottom:10px;">
//         <strong style="font-size:18px;">Total:</strong>
//         <span style="font-size:20px;font-weight:bold;color:#0371a2;margin-left:10px;">
//           $${order.paymentItem.reduce((sum,item)=>sum+Number(item.productPrice),0).toFixed(2)}
//         </span>
//       </div>

//       <!-- 3D Embossed Stamp -->
//       <div style="position:absolute;bottom:20px;right:20px;color:rgba(3,113,162,0.15);border:3px solid rgba(3,113,162,0.2);padding:10px 18px;font-size:26px;font-weight:900;text-transform:uppercase;transform:rotate(-12deg);border-radius:8px;text-align:center;white-space:nowrap;
//           box-shadow: 2px 2px 5px rgba(0,0,0,0.2), inset 0 0 5px rgba(255,255,255,0.3);">
//         RECEIVED
//       </div>
//     </div>

//     <!-- Footer -->
//     <div style="background:linear-gradient(135deg,#0371a2,#04c6f8);color:#fff;text-align:center;padding:25px;">
//       <p style="margin:0 0 6px;">Need help? Contact us at <a href="mailto:support@bikeshop.com" style="color:#b7e3ef;text-decoration:none;">support@bikeshop.com</a></p>
//       <p style="margin:0;font-size:13px;opacity:0.85;">© ${new Date().getFullYear()} BikeShop. All rights reserved.</p>
//     </div>

//   </div>
// </div>
// `;


//   try {
//     const { data } = await axios.post("/api/emailsend/invoice-send", {
//       to: cartMail,
//       subject: `🧾 Invoice No-${order.transactionId}`,
//       html: invoiceHtml,
//     });
//     alert(data.message || "✅ Email sent successfully!");
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.error || "❌ Failed to send email");
//   }
// };




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
                      onClick={() => handleSendEmail(order)}
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
