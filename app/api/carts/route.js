import { getCartsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json(); //data from add bike form submission
    const cartsCollection = await getCartsCollection();
    const result = await cartsCollection.insertOne(data);
    return NextResponse.json({ message: "item added to the Carts Added Successfully" }, result);
  } catch (error) {
    console.log("cart add error", error);
    return NextResponse.json({ message: "Cart Adds Error" }, error);
  }
}



//fetch cart data from the db
export async function GET(){
    const cartCollection=await getCartsCollection()
    const result=await cartCollection.find().toArray()
    return NextResponse.json({message:'all cart data given',result})
}