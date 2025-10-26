import { getPaymentsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json(); //data from add bike form submission
    console.log(data,'paymen data this is');
    const paymentCollection = await getPaymentsCollection();
    const result = await paymentCollection.insertOne(data);
    return NextResponse.json(
      { message: "Payment data Added Successfully" },result
    );
  } catch (error) {
    console.log("add payment info to the db error", error);
    return NextResponse.json({ message: "payment Adds Error" }, error);
  }
}
