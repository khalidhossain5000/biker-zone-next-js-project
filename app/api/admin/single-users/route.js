// app/api/getUser/route.js
import { getUsersCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract email from query params
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
console.log(email,'this is get email here');
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email });
console.log('this is user single',user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 });
  }
}
