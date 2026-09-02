import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateBroadcastTelevisionSchema } from "@/backend/validation/broadcastTelevisionSchemas";
import { getBroadcastTelevisionById, updateBroadcastTelevision, deleteBroadcastTelevision } from "@/backend/services/broadcastTelevisionService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getBroadcastTelevisionById(params.id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/broadcast-television/[id] error:", error);
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
    const result = updateBroadcastTelevisionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await updateBroadcastTelevision(params.id, result.data);

    return NextResponse.json(
      { message: "Broadcast Television item updated successfully", item },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/broadcast-television/[id] error:", error);
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

    await deleteBroadcastTelevision(params.id, !hardDelete);

    return NextResponse.json(
      { message: `Broadcast Television item ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/broadcast-television/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
