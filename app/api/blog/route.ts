import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { blogPostSchema } from "@/backend/validation/blogSchemas";
import { getBlogPosts, createBlogPost } from "@/backend/services/blogService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;

    let activeOnly = true;
    const session = await getSession();
    if (session && session.role === "ADMIN") {
      activeOnly = searchParams.has("activeOnly") ? searchParams.get("activeOnly") === "true" : false;
    }

    const items = await getBlogPosts({ search, category, activeOnly });
    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (process.env.NODE_ENV === "production" && (!session || session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const body = await request.json();
    const result = blogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const blogPost = await createBlogPost(result.data);
    return NextResponse.json(
      { message: "Blog post created successfully", blogPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
