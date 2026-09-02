import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { updateBestSellerSchema } from "@/backend/validation/bestSellerSchemas";
import { getBestSellerById, updateBestSeller, deleteBestSeller } from "@/backend/services/bestSellerService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getBestSellerById(params.id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/best-sellers/[id] error:", error);
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
    const result = updateBestSellerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await updateBestSeller(params.id, result.data);

    return NextResponse.json(
      { message: "Best Seller updated successfully", item },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/best-sellers/[id] error:", error);
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

    await deleteBestSeller(params.id, !hardDelete);

    return NextResponse.json(
      { message: `Best Seller ${hardDelete ? "hard" : "soft"} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/best-sellers/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
