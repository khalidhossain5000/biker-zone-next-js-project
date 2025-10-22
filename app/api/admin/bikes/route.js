import { getBikesCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json(); //data from add bike form submission
    const bikesCollections = await getBikesCollection();
    const result = await bikesCollections.insertOne(data);
    return NextResponse.json({ message: "Bike Added Successfully" }, result);
  } catch (error) {
    console.log("add bike error", error);
    return NextResponse.json({ message: "Bike Adds Error" }, error);
  }
}
