// app/api/blog/route.ts
import { createPost, getPosts } from "@/apiServices/postServices";
import { validateCreatePost } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const limit = Number(url.searchParams.get("limit") ?? 10);
  const search = url.searchParams.get("search") ?? undefined;

  const publishedOnlyParam = url.searchParams.get("publishedOnly");
  const publishedOnly =
    publishedOnlyParam === null ? true : publishedOnlyParam !== "false";

  const result = await getPosts({ page, limit, search, publishedOnly });

   return NextResponse.json({
    posts: result.items,  
    total: result.total,
    page: result.page,
    limit: result.limit,
    pages: result.pages,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  // ✅ Only validate when explicitly publishing
  if (body.published) {
    const validated = validateCreatePost(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }
  }

  const created = await createPost({
    title: body.title || "Untitled Post",
    slug: body.slug || `draft-${Date.now()}`,
    excerpt: body.excerpt || "",
    content: body.content || "",
    tags: body.tags || [],
    published: !!body.published,
    coverImage: body.coverImage || "",
    author: body.author || "Admin",
    category: body.category || "Uncategorized",
  });

  return NextResponse.json(created, { status: 201 });
}

