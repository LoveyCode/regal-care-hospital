import { deletePostBySlug, updatePostBySlug } from "@/apiServices/postServices";
import { getPostBySlug } from "@/apiServices/postServices";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug);
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const body = await req.json();
  const updated = await updatePostBySlug(params.slug, body);
  return NextResponse.json(updated);
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const updated = await updatePostBySlug(params.slug, body);
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const result = await deletePostBySlug(params.slug);
  return NextResponse.json({ message: "Post deleted", result });
}