import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthenticated = !!token;

  const { pathname } = req.nextUrl;

  // 🔒 Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/expenses",
    "/budget",
    "/reports",
    "/settings",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //Block access if NOT logged in
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Prevent access to login if already logged in
  if (pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/expenses/:path*",
    "/budget/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/login",
  ],
};