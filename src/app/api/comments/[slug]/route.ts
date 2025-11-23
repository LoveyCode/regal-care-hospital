import { createComment, getCommentsForPost } from "@/apiServices/commentServices";
import { NextResponse } from "next/server";

export async function GET(
  { params }: { params: { slug: string } }
) {
  const comments = await getCommentsForPost(params.slug);
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const formData = await req.formData();
  
  const commenterName = formData.get("commenterName") as string;
  const content = formData.get("content") as string;

  if (!commenterName || !content ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newComment = await createComment({
    postSlug: params.slug,
    commenterName,
    content,
  });

  return NextResponse.json(newComment, { status: 201 });
}



