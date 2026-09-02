// ============================================================
// backend/auth/session.ts
// Cookie-based session helpers for Next.js API routes
// ============================================================

import { cookies } from "next/headers";
import { signJWT, verifyJWT, type JWTPayload } from "./jwt";

const COOKIE_NAME = "rank_partner_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Set session cookie after login
export async function setSessionCookie(payload: JWTPayload): Promise<void> {
  const token = await signJWT(payload);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

// Get current session from cookie
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyJWT(token);
}

// Clear session cookie on logout
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

// Require auth — returns session or throws 401 error payload
export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) {
    throw { status: 401, message: "Unauthorized — please login" };
  }
  return session;
}

// Require admin — returns session or throws 403 error payload
export async function requireAdmin(): Promise<JWTPayload> {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw { status: 403, message: "Forbidden — admin access required" };
  }
  return session;
}
