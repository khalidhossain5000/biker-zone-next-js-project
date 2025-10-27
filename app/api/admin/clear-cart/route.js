import { getCartsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "User email is required" },
        { status: 400 }
      );
    }

    const cartCollection = await getCartsCollection();

    const result = await cartCollection.deleteOne({ userEmail });

    if (result.deletedCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Cart deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No cart found for this user",
      });
    }
  } catch (error) {
    console.error("Delete cart failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
