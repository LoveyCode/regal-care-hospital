import { getPostsByCategory } from "@/apiServices/postServices";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const posts = await getPostsByCategory(params.category);
return NextResponse.json({ posts });
}