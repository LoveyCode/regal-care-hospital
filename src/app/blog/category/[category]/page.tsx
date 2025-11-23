// app/categories/[category]/page.tsx

import CategoryGrid from "@/components/BlogComponents/CategoryGrid";
import SectionHeading from "@/components/sectionHeading";
import Link from "next/link";

export const revalidate = 60;

async function fetchPostsByCategory(category: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogPosts/category/${category}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // throw so Next can render error.tsx for this route
    throw new Error("Failed to fetch posts");
  }
  const json = await res.json();
  return json.posts ?? [];
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  try {
    const posts = await fetchPostsByCategory(params.category);

    return (
      <main className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <SectionHeading title={<h2 className="header mt-20 ">{params.category} Posts</h2>} />
          <Link href="/blog" className="text-sm text-blue-600 hover:underline">← Back to blog</Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts available in this category yet.</p>
        ) : (
          // Pass posts to a client-only presentational component
          <CategoryGrid posts={posts} />
        )}
      </main>
    );
  } catch (err) {
    // rethrow to allow error.tsx to render or you could return custom inline UI
    throw err;
  }
}
