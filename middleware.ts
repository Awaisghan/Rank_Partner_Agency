import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Route categories
  const isAdminRoute = path.startsWith("/admin");
  const isAuthRoute = path === "/login";
  const isApiRoute = path.startsWith("/api");
  const isAuthApiRoute = path.startsWith("/api/auth");

  // Get the session cookie
  const token = request.cookies.get("rank_partner_session")?.value;

  let session: any = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      session = payload;
    } catch (error) {
      // Token is invalid or expired
      session = null;
    }
  }

  const isPublicApiRoute = path.startsWith("/api/contact");

  // --- API ROUTE PROTECTION (Phase 11) ---
  // If it's a data API (not auth API or public contact API) and the method modifies data (POST/PUT/DELETE), require ADMIN
  if (isApiRoute && !isAuthApiRoute && !isPublicApiRoute) {
    if (request.method !== "GET") {
      if (!session || session.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Unauthorized: Admin access required" },
          { status: 401 }
        );
      }
    }
    // Allow GET requests and Auth API requests to proceed
    return NextResponse.next();
  }

  // --- PAGE ROUTE PROTECTION ---
  const isPricingRoute = path.startsWith("/pricing");

  // Redirect to login if accessing pricing without session
  if (isPricingRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to login if accessing admin without session
  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect CLIENT users away from admin to pricing
  if (isAdminRoute && session && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  // Redirect to admin dashboard if accessing login page while already logged in (as ADMIN)
  if (isAuthRoute && session && session.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/publications", request.url));
  }
  
  // If user is a client and goes to /login, redirect them to pricing
  if (isAuthRoute && session && session.role === "CLIENT") {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
