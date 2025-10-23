import { getBikesCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bikesCollection = await getBikesCollection();

    const featuredBikes = await bikesCollection
      .find({ isFeatured: "true" }) // filter
      .sort({ _id: -1 })             
      .toArray();

    return NextResponse.json({ data: featuredBikes });
  } catch (error) {
    console.error("Error fetching featured bikes:", error);
    return NextResponse.json({ error: "Failed to fetch featured bikes" }, { status: 500 });
  }
}
