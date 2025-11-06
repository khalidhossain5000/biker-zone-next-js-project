import { getBikesCollection, getCartsCollection, getPaymentsCollection } from "@/lib/dbcollections";
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

export async function DELETE(req) {
  try {
    const cartCollection = await getCartsCollection();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
    const userEmail = searchParams.get("email");

    if (!productId || !userEmail) {
      return NextResponse.json(
        { success: false, message: "Product ID or User email missing" },
        { status: 400 }
      );
    }

    const result = await cartCollection.updateOne(
      { userEmail },
      { $pull: { cartItems: { productId } } }
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

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId)
      return NextResponse.json({ success: false, message: "Order ID missing" }, { status: 400 });

    const orders = await getPaymentsCollection();
    const bikes = await getBikesCollection();

    const order = await orders.findOne({ _id: new ObjectId(orderId) });
    if (!order)
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });

    // mark payment as success
    await orders.updateOne({ _id: new ObjectId(orderId) }, { $set: { paymentStatus: "success" } });

    // reduce quantity safely
    const updates = order.paymentItem.map((item) =>
      bikes.updateOne(
        { _id: new ObjectId(item.productId), quantity: { $gte: Number(item.quantity) } },
        { $inc: { quantity: -Number(item.quantity) } }
      )
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true, message: "All product quantities updated successfully." });
  } catch (error) {
    console.error("Update order products error:", error);
    return NextResponse.json({ success: false, message: "Failed to update quantities" }, { status: 500 });
  }
}
