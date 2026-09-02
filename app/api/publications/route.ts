import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { publicationSchema } from "@/backend/validation/publicationSchemas";
import { getPublications, createPublication } from "@/backend/services/publicationService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract params
    const search = searchParams.get("search") || undefined;
    const region = searchParams.get("region") || undefined;
    const genre = searchParams.get("genre") || undefined;
    
    const priceMin = searchParams.has("priceMin") ? Number(searchParams.get("priceMin")) : undefined;
    const priceMax = searchParams.has("priceMax") ? Number(searchParams.get("priceMax")) : undefined;
    
    const sponsored = searchParams.has("sponsored") ? searchParams.get("sponsored") === "true" : undefined;
    const indexed = searchParams.has("indexed") ? searchParams.get("indexed") === "true" : undefined;
    const doFollow = searchParams.has("doFollow") ? searchParams.get("doFollow") === "true" : undefined;
    
    const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : 50;
    
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    // Allow seeing inactive publications only if logged in as ADMIN
    let activeOnly = true;
    const session = await getSession();
    if (session && session.role === "ADMIN") {
      activeOnly = searchParams.has("activeOnly") ? searchParams.get("activeOnly") === "true" : false;
    }

    const data = await getPublications({
      search,
      region,
      genre,
      priceMin,
      priceMax,
      sponsored,
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
    console.error("GET /api/publications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Authenticate and authorize (Admin only)
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse and validate body
    const body = await request.json();
    const result = publicationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    // 3. Create publication
    const publication = await createPublication(result.data);

    return NextResponse.json(
      { message: "Publication created successfully", publication },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/publications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
