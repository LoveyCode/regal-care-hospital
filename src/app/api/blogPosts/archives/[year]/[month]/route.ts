import { NextResponse } from "next/server"; 
import { connectDB } from "@/lib/mongodb"; 
import { Post } from "@/models/post";

export async function GET(
  req: Request,
  { params }: { params: { year: string; month: string } }
) {
  try {
    await connectDB();

    const year = Number(params.year);
    const month = Number(params.month);

    const posts = await Post.find({
      published: true,
      createdAt: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0, 23, 59, 59),
      },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Archive fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
