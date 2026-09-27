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

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin login required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed: PNG, JPG, JPEG, WEBP, SVG",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    const ext =
      file.name.split(".").pop()?.toLowerCase() || "png";

    const uniqueName = `img_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const blogDir = "/var/www/uploads/blog";

    await mkdir(blogDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(blogDir, uniqueName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json(
      {
        message: "Blog image uploaded successfully",
        url: publicUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST /api/upload/blog error:", error);

    return NextResponse.json(
      { error: "Blog image upload failed" },
      { status: 500 }
    );
  }
}
