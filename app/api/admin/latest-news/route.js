import { getLatestNewsCollection } from "@/lib/dbcollections";
import { NextResponse } from "next/server";

export async function POST(req){
    const newsCollection=await getLatestNewsCollection()
    const newsData=await req.json()
    const result=await newsCollection.insertOne(newsData)
    return NextResponse.json({message:'news added successfully',result})
}