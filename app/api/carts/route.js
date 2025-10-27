import { getCartsCollection } from "@/lib/dbcollections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


//New one
export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, product } = body; 
    
    // product = single cart item
    if (!product || !userEmail) {
      return NextResponse.json(
        { success: false, message: "Product  or User email missing" },
        { status: 400 }
      );
    }

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
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  console.log("this is email in cart get ", email);
  const result = await cartCollection.findOne({ userEmail: email });

  return NextResponse.json({
    message: "User cart data",
    result,
  });
}

//dlete cart item from the db

// export async function DELETE(req) {
//   const cartCollection = await getCartsCollection();
//   const { searchParams } = new URL(req.url);
//   const productId = searchParams.get("id");
//   const result = await cartCollection.deleteOne({
//     _id: new ObjectId(productId),
//   });
//   return NextResponse.json({ success: true, result });
// }

export async function DELETE(req) {
  try {
    const cartCollection = await getCartsCollection();

    // URL থেকে query params নেওয়া
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
    const userEmail = searchParams.get("email"); // ইউজারের email নেওয়া
    console.log(userEmail, "this is user email in dlete ");
    if (!productId || !userEmail) {
      return NextResponse.json(
        { success: false, message: "Product ID or User email missing" },
        { status: 400 }
      );
    }

    // Delete query: একই সাথে productId এবং userEmail match করতে হবে
    const result = await cartCollection.updateOne(
      { userEmail }, // ইউজারের cart
      { $pull: { cartItems: { productId } } } // items array থেকে remove
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete cart item error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
