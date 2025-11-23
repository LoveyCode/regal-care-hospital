// app/api/uploads/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ⚡ Simple in-memory cache to prevent Cloudinary overuse
let cache: { data: any[]; timestamp: number } = { data: [], timestamp: 0 };
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

// ✅ GET: Fetch uploaded images (with caching)
export async function GET() {
  try {
    const now = Date.now();
    const isCacheValid = now - cache.timestamp < CACHE_DURATION;

    if (isCacheValid && cache.data.length > 0) {
      // Return from cache instead of Cloudinary
      return NextResponse.json(cache.data);
    }

    let expression = "folder:blog_covers";
    const { resources } = await cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const images = resources.map((r: any) => ({
      _id: r.asset_id,
      url: r.secure_url,
      filename: r.public_id,
      created_at: r.created_at,
      tags: r.tags,
    }));

    // 🧠 Store in cache
    cache = { data: images, timestamp: now };

    return NextResponse.json(images);
  } catch (err: any) {
    console.error("Cloudinary GET error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ POST: Upload new image to Cloudinary (refreshes cache)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary (to blog_covers folder)
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "blog_covers",
            resource_type: "image",
            public_id: `blog_${Date.now()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // 🔄 Invalidate cache after upload
    cache = { data: [], timestamp: 0 };

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      id: uploadResult.asset_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
