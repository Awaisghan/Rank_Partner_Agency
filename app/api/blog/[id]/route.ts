import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateBlogPostSchema } from "@/backend/validation/blogSchemas";
import { getBlogPostBySlugOrId, updateBlogPost, deleteBlogPost } from "@/backend/services/blogService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogPost = await getBlogPostBySlugOrId(id);
    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json({ blogPost }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/blog/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (process.env.NODE_ENV === "production" && (!session || session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const { id } = await params;
    const body = await request.json();
    const result = updateBlogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateBlogPost(id, result.data);
    return NextResponse.json(
      { message: "Blog post updated successfully", blogPost: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/blog/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (process.env.NODE_ENV === "production" && (!session || session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const { id } = await params;
    await deleteBlogPost(id);
    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
