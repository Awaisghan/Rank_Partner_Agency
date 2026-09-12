import { NextResponse } from "next/server";
import { getSession } from "@/backend/auth/session";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
];

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: Request) {
  try {
    // 1. Auth check — Admin only
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: PNG, JPG, WEBP, SVG" },
        { status: 400 }
      );
    }

    // 4. Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 2MB" },
        { status: 400 }
      );
    }

    // 5. Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const uniqueName = `logo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // 6. Ensure logos directory exists
    const logosDir = path.join(process.cwd(), "public", "logos");
    await mkdir(logosDir, { recursive: true });

    // 7. Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(logosDir, uniqueName);
    await writeFile(filePath, buffer);

    // 8. Return public URL
    const publicUrl = `/logos/${uniqueName}`;

    return NextResponse.json(
      { message: "File uploaded successfully", url: publicUrl },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
