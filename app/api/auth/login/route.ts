import { NextResponse } from "next/server";
import { prisma } from "@/backend/db/prisma";
import { comparePassword } from "@/backend/auth/password";
import { setSessionCookie } from "@/backend/auth/session";
import { loginSchema } from "@/backend/validation/authSchemas";
import { checkRateLimit } from "@/backend/security/rateLimit";

export async function POST(request: Request) {
  try {
    // 1. Get Client IP (for rate limiting)
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown-ip";

    // 2. Check Rate Limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Body
    const body = await request.json();
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email or password format", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 4. Find User
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      // Return generic error to prevent email enumeration
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 5. Verify Password
    const isValid = await comparePassword(password, user.passwordHash);
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 6. Set Session Cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
