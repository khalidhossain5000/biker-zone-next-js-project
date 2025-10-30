import { getPaymentsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orderCollections = await getPaymentsCollection();
    const paymentMethodStats =await orderCollections.aggregate([
      { $group: { _id: "$paymentMethod", count: { $sum: 1 } } },
    ]).toArray()
    return NextResponse.json({
      message: "Payment method stats fetched successfully",
      paymentMethodStats,
    });
  } catch (error) {
    console.error("Error fetching payment method stats:", error);
    return NextResponse.json(
      { message: "Error fetching payment stats", error: error.message },
      { status: 500 }
    );
  }
}
