import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateDigitalTelevisionSchema } from "@/backend/validation/digitalTelevisionSchemas";
import { getDigitalTelevisionById, updateDigitalTelevision, deleteDigitalTelevision } from "@/backend/services/digitalTelevisionService";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await getDigitalTelevisionById(id);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/digital-television/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const result = updateDigitalTelevisionSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });

    const item = await updateDigitalTelevision(id, result.data);
    return NextResponse.json({ message: "Updated successfully", item }, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/digital-television/[id] error:", error);
    if (error.code === "P2025") return NextResponse.json({ error: "Item not found" }, { status: 404 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const url = new URL(request.url);
    const hardDelete = url.searchParams.get("hard") === "true";
    await deleteDigitalTelevision(id, !hardDelete);
    return NextResponse.json({ message: `Item ${hardDelete ? "deleted" : "deactivated"}` }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE /api/digital-television/[id] error:", error);
    if (error.code === "P2025") return NextResponse.json({ error: "Item not found" }, { status: 404 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
