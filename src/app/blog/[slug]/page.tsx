// app/blog/[slug]/page.tsx

import MarkdownRenderer from "@/components/BlogComponents/MarkdownRenderer";
import { getPostBySlug } from "@/apiServices/postServices";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.published) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">Oops — the article either doesn't exist or hasn't been published.</p>
        <p className="mt-4"><Link href="/blog">← Back to blog</Link></p>
      </main>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-muted mt-2">
          {new Date(post.createdAt).toLocaleDateString()} • {post.author} • {post.tags?.join(", ")}
        </p>
      </header>

      {post.coverImage && 
      <img src={post.coverImage} 
      alt={post.title} 
      className="w-full rounded-lg mb-6" />}

      <section className="prose max-w-none">
        <MarkdownRenderer content={post.content} />
      </section>
    </article>
  );
}

