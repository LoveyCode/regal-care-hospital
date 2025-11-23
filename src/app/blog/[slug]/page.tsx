import MarkdownRenderer from "@/components/BlogComponents/MarkdownRenderer";
import SectionHeading from "@/components/sectionHeading";
import { getPostBySlug } from "@/apiServices/postServices";
import Link from "next/link";
import CommentForm from "@/components/BlogComponents/CommentForm";
import { getCommentsForPost } from "@/apiServices/commentServices";
import Image from "next/image";

// Fetch comments by slug
async function getComments(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${slug}`,
  );

  if (!res.ok) return [];
  return res.json();
}

export const revalidate = 60;


export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.published) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  // Fetch comments using slug (same field your model uses)
  const comments = await getCommentsForPost(post.slug);

  return (
    <main className="w-full bg-mode py-10 px-4">
      <article className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <SectionHeading 
          title={<h1 className="header text-left">{post.title}</h1>} 
        />

        {/* META */}
        <p className="text-sm text-muted">
          {new Date(post.createdAt).toLocaleDateString()} • {post.author} •{" "}
          {post.tags?.join(", ")}
        </p>

        {/* FEATURE IMAGE */}
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-lg shadow mb-2"
          />
        )}

        {/* POST CONTENT */}
      <section className="prose max-w-none dark:prose-invert prose-dark-white">
          <MarkdownRenderer content={post.content} />
        </section>


        {/* COMMENTS SECTION */}
        <section className="mt-20">
          <SectionHeading title={<h2 className="header text-left">Comments</h2>} />

          {/* EXISTING COMMENTS */}
          <div className="space-y-4 mt-6">
            {comments.length > 0 ? (
              comments.map((c: any) => (   
                <div
                  key={c._id}   
                  className="p-4 bg-white dark:bg-zinc-800 rounded border border-gray-300 dark:border-gray-700"
                >
                  <p className="font-semibold">{c.commenterName}</p>
                  <p className="text-sm mt-1">{c.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>

          {/* ADD COMMENT FORM */}
       <CommentForm slug={post.slug} />
        </section>

      </article>
    </main>
  );
}
