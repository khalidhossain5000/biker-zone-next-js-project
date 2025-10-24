import { getLatestNewsCollection } from "@/lib/dbcollections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req){
    const newsCollection=await getLatestNewsCollection()
    const newsData=await req.json()
    const result=await newsCollection.insertOne(newsData)
    return NextResponse.json({message:'news added successfully',result})
}



export async function GET() {
  try {
    const newsCollection = await getLatestNewsCollection();

    // Sort by  descending to get latest first
    const latestNews = await newsCollection
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json({
      message: "Latest news fetched successfully",
      data: latestNews,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

//delete api
export async function DELETE(req){
 const newsCollection = await getLatestNewsCollection();
  const {searchParams}=new URL(req.url)
  
  const id=searchParams.get("id")
  const result=await newsCollection.deleteOne({_id:new ObjectId(id)})
  return NextResponse.json({message:'Delete success',result})
}