import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "rank_partner_super_secret_jwt_key_change_in_production_2024";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes
  const isAdminRoute = path.startsWith("/admin");
  const isAuthRoute = path === "/login";

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

  // Redirect to login if accessing admin without session
  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to login if user is not an admin
  if (isAdminRoute && session && session.role !== "ADMIN") {
    // Alternatively, we could redirect to /pricing for CLIENT role
    return NextResponse.redirect(new URL("/login", request.url));
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
