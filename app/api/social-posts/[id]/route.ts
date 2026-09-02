import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateSocialPostSchema } from "@/backend/validation/socialPostSchemas";
import { getSocialPostById, updateSocialPost, deleteSocialPost } from "@/backend/services/socialPostService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getSocialPostById(params.id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/social-posts/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateSocialPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await updateSocialPost(params.id, result.data);

    return NextResponse.json(
      { message: "Social Post updated successfully", item },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/social-posts/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const hardDelete = url.searchParams.get("hard") === "true";

    await deleteSocialPost(params.id, !hardDelete);

    return NextResponse.json(
      { message: `Social Post ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/social-posts/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
