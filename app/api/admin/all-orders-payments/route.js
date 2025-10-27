// import { getPaymentsCollection } from "@/lib/dbcollections";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const orderCollections = await getPaymentsCollection();
//   const result = await orderCollections.find().toArray();
//    return NextResponse.json({
//     message: "All Payment and Order Data Successfully",
//     result, // <-- এখানে result পাঠানো হচ্ছে
//   });
// }




import { NextResponse } from "next/server";
import { getPaymentsCollection } from "@/lib/dbcollections";
import { ObjectId } from "mongodb";

// 🟢 GET: Fetch all orders/payments
export async function GET() {
  try {
    const orderCollections = await getPaymentsCollection();
    const result = await orderCollections.find().toArray();

    return NextResponse.json({
      success: true,
      message: "All payment and order data fetched successfully.",
      result,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order data." },
      { status: 500 }
    );
  }
}

// 🟡 PATCH: Update payment status to 'completed'
export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    const orderCollections = await getPaymentsCollection();
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { paymentStatus: "completed" },
    };

    const result = await orderCollections.updateOne(filter, updateDoc);

    if (result.modifiedCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Payment status updated to completed.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No matching order found or already completed.",
      });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update payment status." },
      { status: 500 }
    );
  }
}

// 🔴 DELETE: Delete order by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    const orderCollections = await getPaymentsCollection();
    const query = { _id: new ObjectId(id) };
    const result = await orderCollections.deleteOne(query);

    if (result.deletedCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Order deleted successfully.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No matching order found to delete.",
      });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order." },
      { status: 500 }
    );
  }
}
