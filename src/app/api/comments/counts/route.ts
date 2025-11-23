import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/comments";

export async function GET() {
  await connectDB();

const counts = await Comment.aggregate([
  { $match: { approved: true } },
  { $group: { _id: "$slug", count: { $sum: 1 } } },
]);

  const result: Record<string, number> = {};
  counts.forEach((c) => {
    result[c._id] = c.count;
  });

  return NextResponse.json(result);
}

