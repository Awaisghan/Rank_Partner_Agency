import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { bestSellerSchema } from "@/backend/validation/bestSellerSchemas";
import { getBestSellers, createBestSeller } from "@/backend/services/bestSellerService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || undefined;
    const region = searchParams.get("region") || undefined;
    const genre = searchParams.get("genre") || undefined;
    
    const indexed = searchParams.has("indexed") ? searchParams.get("indexed") === "true" : undefined;
    const doFollow = searchParams.has("doFollow") ? searchParams.get("doFollow") === "true" : undefined;
    
    const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : 50;
    
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    let activeOnly = true;
    const session = await getSession();
    if (session && session.role === "ADMIN") {
      activeOnly = searchParams.has("activeOnly") ? searchParams.get("activeOnly") === "true" : false;
    }

    const data = await getBestSellers({
      search,
      region,
      genre,
      indexed,
      doFollow,
      page,
      limit,
      sortBy,
      sortOrder,
      activeOnly,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/best-sellers error:", error);
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
    const result = bestSellerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const item = await createBestSeller(result.data);

    return NextResponse.json(
      { message: "Best Seller created successfully", item },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/best-sellers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
