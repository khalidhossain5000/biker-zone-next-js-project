import { getCartsCollection } from "@/lib/dbcollections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const data = await req.json(); //data from add bike form submission
//     const cartsCollection = await getCartsCollection();
//     const result = await cartsCollection.insertOne(data);
//     return NextResponse.json({ message: "item added to the Carts Added Successfully" }, result);
//   } catch (error) {
//     console.log("cart add error", error);
//     return NextResponse.json({ message: "Cart Adds Error" }, error);
//   }
// }

//New one
export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, product } = body; // product = single cart item

    const cartCollection = await getCartsCollection();

    // Check if user already has a cart
    const existingCart = await cartCollection.findOne({ userEmail });

    if (existingCart) {
      // user এর cart থাকলে নতুন item push করো
      await cartCollection.updateOne(
        { userEmail },
        { $push: { cartItems: product } }
      );
    } else {
      // না থাকলে নতুন cart তৈরি করো
      await cartCollection.insertOne({
        userEmail,
        cartItems: [product],
      });
    }

    return NextResponse.json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { message: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

//fetch cart data from the db
// 🟡 Get Cart by User (GET)
export async function GET(req) {
  const cartCollection = await getCartsCollection();
  const {searchParams} = new URL(req.url);
  const email = searchParams.get("email");
  console.log("this is email in cart get ", email);
  const result = await cartCollection.findOne({ userEmail: email });

  return NextResponse.json({
    message: "User cart data",
    result,
  });
}

//dlete cart item from the db

export async function DELETE(req) {
  const cartCollection = await getCartsCollection();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");
  const result = await cartCollection.deleteOne({
    _id: new ObjectId(productId),
  });
  return NextResponse.json({ success: true, result });
}
