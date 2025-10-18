import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (!process.env.mongoDB_uri) throw new Error("Missing MONGODB_URI");

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.mongoDB_uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.mongoDB_uri);
  clientPromise = client.connect();
}

console.log(client,clientPromise,'this are clietn and clietn promise in mongodb js file ')

export default clientPromise;
