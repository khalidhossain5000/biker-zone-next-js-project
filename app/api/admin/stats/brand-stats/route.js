import { getBikesCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bikesCollections = await getBikesCollection();
    // performing mongodb aggregration for getting data
    const brandStats = await bikesCollections
      .aggregate([
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();
    return NextResponse.json({
      message: "brand wise stats data sended",
      brandStats,
    });
  } catch (error) {
    console.error("Error fetching brand stats:", error);
    return NextResponse.json(
      { message: "Error fetching brand stats", error: error.message },
      { status: 500 }
    );
  }
}
