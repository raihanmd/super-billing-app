import { NextRequest, NextResponse } from "next/server";
import { customResponse } from "./utils/customResponse";

const allowedOrigins = process.env.NODE_ENV === "production" ? ["https://www.ecomerce.raihanmd.site", "https://ecomerce.raihanmd.site", "https://next-auth.js.org"] : ["http://localhost:3000"];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return customResponse({ statusCode: 400, payload: "Bad request.", message: "Bad request." });
  }

  if (request.nextUrl.pathname.startsWith("/api") && !request.nextUrl.pathname.startsWith("/api/auth") && request.method === "POST") {
    if (request.headers.get("API-Key") !== process.env.API_KEY) {
      return customResponse({ statusCode: 403, payload: "Guest can't do the POST request.", message: "Forbidden." });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
