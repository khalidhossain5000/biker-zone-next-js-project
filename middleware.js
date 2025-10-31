// /middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  // 🌍 Public routes
  if (path === "/" || path.startsWith("/login") || path.startsWith("/register") || path.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // 🔑 Get JWT token
  const token = await getToken({ req, secret: SECRET });

  // ❌ Not logged in → redirect to login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 🛡 Admin routes (page + API)
  if ((path.startsWith("/admin") || path.startsWith("/api/admin")) && token.role !== "admin") {
    url.pathname = "/unauthorized"; // custom unauthorized page
    return NextResponse.redirect(url);
  }

  // ✅ Logged-in user routes → allow
  return NextResponse.next();
}

// middleware কোন route এ কাজ করবে
export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/dashboard/:path*"],
};
