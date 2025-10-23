import { getUsersCollection } from "@/lib/dbcollections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.find().toArray();
    return NextResponse.json({ message: "All Users fetched", data: result });

  } catch (error) {
    console.log("all users get  error here", error);
    return NextResponse.json({ message: "All Users get" }, error);
  }
}

// make admin api


export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action"); // "make" or "remove"
console.log('this is id',id,'this is action',action)
    const usersCollection = await getUsersCollection();
    const role = action === "make" ? "admin" : "user";

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    return NextResponse.json({ success: true, updated: result });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ success: false, error });
  }
}










// export async function PATCH(req){
//   try{
//     const {searchParams}=new URL(req.url)
//     console.log(searchParams,'this is search params')
//     const userId=searchParams.get('id')
//      if (!userId) {
//       return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
//     }
//     const usersCollection=await getUsersCollection()
//     const result=await usersCollection.updateOne(
//       {_id:new ObjectId(userId)},
//       {$set:{role:'admin'}}
//     )
//     return NextResponse.json({ message: "User promoted to admin successfully" },result);
//   }
//   catch(error){
//         console.error("make-admin error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }