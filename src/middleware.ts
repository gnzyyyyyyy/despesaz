import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  let isValid = false;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isValid = true;
    } catch {
      isValid = false;
    }
  }

  // Protect dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Prevent login if already authenticated (ONLY if valid)
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (isValid) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}