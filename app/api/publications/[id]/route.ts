import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updatePublicationSchema } from "@/backend/validation/publicationSchemas";
import { getPublicationById, updatePublication, deletePublication } from "@/backend/services/publicationService";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const publication = await getPublicationById(id);

    if (!publication) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    return NextResponse.json(publication, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/publications/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const result = updatePublicationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const publication = await updatePublication(id, result.data);

    return NextResponse.json(
      { message: "Publication updated successfully", publication },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/publications/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const url = new URL(request.url);
    const hardDelete = url.searchParams.get("hard") === "true";

    await deletePublication(id, !hardDelete);

    return NextResponse.json(
      { message: `Publication ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/publications/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
