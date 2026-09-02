import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { socialPostSchema } from "@/backend/validation/socialPostSchemas";
import { getSocialPosts, createSocialPost } from "@/backend/services/socialPostService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const platform = searchParams.get("platform") || undefined;

    const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : 50;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    let activeOnly = true;
    const session = await getSession();
    if (session && session.role === "ADMIN") {
      activeOnly = searchParams.has("activeOnly") ? searchParams.get("activeOnly") === "true" : false;
    }

    const data = await getSocialPosts({
      search,
      category,
      platform,
      page,
      limit,
      sortBy,
      sortOrder,
      activeOnly,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/social-posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = socialPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await createSocialPost(result.data);

    return NextResponse.json(
      { message: "Social Post created successfully", item },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/social-posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
