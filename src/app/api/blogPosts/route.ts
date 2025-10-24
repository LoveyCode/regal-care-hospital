// app/api/blog/route.ts
import { validateCreatePost } from "@/lib/validation";
import { createPost, getPosts } from "@/apiServices/postServices";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const limit = Number(url.searchParams.get("limit") ?? 10);
  const search = url.searchParams.get("search") ?? undefined;

  const result = await getPosts({ page, limit, search, publishedOnly: true });
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const validated = validateCreatePost(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const created = await createPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    tags: body.tags || [],
    published: !!body.published,
    coverImage: body.coverImage,
    author: body.author,
    category: body.category,
  });

  return NextResponse.json(created, { status: 201 });
}
