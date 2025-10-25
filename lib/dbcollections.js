import clientPromise from "./mongodb";



// Users collection
export async function getUsersCollection() {
  const client = await clientPromise;
  const db = client.db("bikerZoneDB");
  return db.collection("users");
}

// Bike Collection
export async function getBikesCollection(){
  const client=await clientPromise;
  const db=client.db("bikerZoneDB")
  return db.collection("bikes")
}

//News Collection
export async function getLatestNewsCollection(){
  const client=await clientPromise;
  const db=client.db('bikerZoneDB')
  return db.collection('latestNews')
}





//Carts Collection
export async function getCartsCollection(){
  const client=await clientPromise
  const db=client.db('bikerZoneDB')
  return db.collection('carts')
}