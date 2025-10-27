import { getUsersCollection } from "@/lib/dbcollections";
import { hash } from "bcryptjs";

export async function POST(req) {
  // Extract data from the request body
  const { name, email, password, role,image } = await req.json();
  
  console.log(name,email,password,role,image,'this is si image' ,"this is req hjsib fuke");
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
    role,
    provider: "credentials",
    image:image || 'https://i.ibb.co/zVB99J4d/DEFAULT.jpg'
  });

  //  Return a success message
  return Response.json({ message: "User created successfully" });
}
