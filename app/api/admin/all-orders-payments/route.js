import { getPaymentsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET() {
  const orderCollections = await getPaymentsCollection();
  const result = await orderCollections.find().toArray();
  return NextResponse.json(
    { message: "All Payment and Order Data Successfully" },
    result
  );
}
