import clientPromise from "./mongodb";



// Users collection
export async function getUsersCollection() {
  const client = await clientPromise;
  const db = client.db("bikerZoneDB");
  return db.collection("users");
}