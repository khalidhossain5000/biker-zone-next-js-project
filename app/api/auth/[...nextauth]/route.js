import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare, hash } from "bcryptjs"; 
import { getUsersCollection } from "@/lib/dbcollections";

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
    }),

    //  Custom Email/Password Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],

  // 🔐 Session config
  session: { strategy: "jwt" },

  // 🧾 Callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      const usersCollection = await getUsersCollection();

      // If Google user signs in first time — save them
      if (account.provider === "google") {
        const existingUser = await usersCollection.findOne({ email: user.email });
        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            provider: "google",
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
