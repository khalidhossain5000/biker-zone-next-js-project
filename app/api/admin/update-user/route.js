// app/api/admin/update-user/route.js
import { getUsersCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const { name, image } = await req.json();

    if (!name && !image) {
      return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
    }

    const usersCollection = await getUsersCollection();

    // MongoDB $set automatically adds field if it doesn't exist
    const updateFields = {};
    if (name) updateFields.name = name;
    if (image) updateFields.image = image;

    const result = await usersCollection.updateOne(
      { email },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await usersCollection.findOne({ email });

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ message: "Failed to update user", error: error.message }, { status: 500 });
  }
}
