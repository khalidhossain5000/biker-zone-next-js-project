import { getPaymentsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }

    const orderCollection = await getPaymentsCollection();

    // Get all orders for that user
    const orders = await orderCollection.find({ userCartEmail: email }).toArray();

    // Calculate counts
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o) => o.paymentStatus?.toLowerCase() === "completed"
    ).length;
    const pendingOrders = orders.filter(
      (o) => o.paymentStatus?.toLowerCase() === "pending"
    ).length;

    return NextResponse.json({
      message: "Order stats fetched successfully",
      stats: {
        totalOrders,
        completedOrders,
        pendingOrders,
      },
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return NextResponse.json(
      { message: "Error fetching order stats", error: error.message },
      { status: 500 }
    );
  }
}
