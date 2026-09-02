import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateListicleSchema } from "@/backend/validation/listicleSchemas";
import { getListicleById, updateListicle, deleteListicle } from "@/backend/services/listicleService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getListicleById(params.id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/listicles/[id] error:", error);
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
    const result = updateListicleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await updateListicle(params.id, result.data);

    return NextResponse.json(
      { message: "Listicle updated successfully", item },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/listicles/[id] error:", error);
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

    await deleteListicle(params.id, !hardDelete);

    return NextResponse.json(
      { message: `Listicle ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/listicles/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
