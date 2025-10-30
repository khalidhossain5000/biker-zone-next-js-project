import { getUsersCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCollection = await getUsersCollection();

    // MongoDB aggregation: count users by role
    const roleStats = await usersCollection
      .aggregate([
        {
          $group: {
            _id: "$role", // role: 'user', 'admin'
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // total users
    const totalUsers = await usersCollection.countDocuments();

    return NextResponse.json({
      message: "User role stats fetched successfully",
      roleStats,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching user role stats:", error);
    return NextResponse.json(
      { message: "Error fetching user role stats", error: error.message },
      { status: 500 }
    );
  }
}
