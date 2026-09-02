import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updatePrintMagazineSchema } from "@/backend/validation/printMagazineSchemas";
import { getPrintMagazineById, updatePrintMagazine, deletePrintMagazine } from "@/backend/services/printMagazineService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getPrintMagazineById(params.id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/print-magazines/[id] error:", error);
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
    const result = updatePrintMagazineSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await updatePrintMagazine(params.id, result.data);

    return NextResponse.json(
      { message: "Print Magazine updated successfully", item },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/print-magazines/[id] error:", error);
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

    await deletePrintMagazine(params.id, !hardDelete);

    return NextResponse.json(
      { message: `Print Magazine ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/print-magazines/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
