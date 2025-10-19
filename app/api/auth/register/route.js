
import { getUsersCollection } from "@/lib/dbcollections";
import { hash } from "bcryptjs";

export async function POST(req) {
  // Extract data from the request body
  const { name, email, password } = await req.json();

  // Connect to the MongoDB 'users' collection
  const usersCollection = await getUsersCollection();

  // Check if a user already exists with this email
  const existing = await usersCollection.findOne({ email });
  if (existing) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  //  Hash the password for security
  const hashedPassword = await hash(password, 10);

  //  Insert the new user into the database
  await usersCollection.insertOne({
    name,
    email,
    password: hashedPassword,
    provider: "credentials",
  });


  //  Return a success message
  return Response.json({ message: "User created successfully" });
}
