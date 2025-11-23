"use client";

import useSWR from "swr";
import Link from "next/link";
import { IPost } from "../../../types/blog";
import BlogSkeleton from "./BlogSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategorySection({ category }: { category: string }) {
  // 🔹 Fetch posts
  const {
    data,
    isLoading
  } = useSWR(
    `/api/blogPosts/category/${category}?limit=6&publishedOnly=true`,
    fetcher,
    { revalidateOnFocus: false }
  );

  // 🔹 Fetch comment counts using SWR instead of useQuery
  const { data: commentCounts } = useSWR("/api/comments/counts", fetcher, {
    revalidateOnFocus: false,
  });

  const posts: IPost[] = data?.posts || [];
  const [latest, ...others] = posts;

  const getCount = (id: string) => commentCounts?.[id] ?? 0;

  // 🔹 Loading state
  if (isLoading) {

    return (
      <section className="w-full flex flex-col mx-2 my-20">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-6 h-[600px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // 🔹 No posts
  if (!posts.length) {
    return (
      <section className="w-full flex justify-center items-center h-[300px] text-gray-400">
        No posts available yet.
      </section>
    );
  }

 return (
  <section className="w-full flex flex-col gap-5 mx-2 my-20">

    {/* GRID WRAPPER */}
    <div className="
      grid 
      grid-cols-1 
      gap-6
      md:grid-cols-3
      min-h-[600px]
    ">
      {/* ========== BIG FIRST POST (TAKES FULL WIDTH ON MOBILE) ========== */}
      <div className="h-[350px] md:h-full">
        {latest && (
          <Link
            href={`/blog/${latest.slug}`}
            className="relative w-full h-full rounded-2xl overflow-hidden group"
          >
            <img
              src={latest.coverImage || "/placeholder.jpg"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-md uppercase tracking-wide text-gray-300">
                {latest.category} • {new Date(latest.createdAt).toLocaleDateString()}
              </p>

              <h2 className="text-4xl md:text-6xl font-bold mt-2">{latest.title}</h2>

              <p className="text-sm mt-2 line-clamp-3 opacity-90">
                {latest.excerpt ?? latest.content?.slice(0, 120) + "..."}
              </p>
            </div>
          </Link>
        )}
      </div>



      {/* ========== 2 MEDIUM POSTS (COLUMN 2) ========== */}
      <div className="flex flex-col gap-4">
        {others.slice(0, 2).map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="relative rounded-xl overflow-hidden group h-[180px] md:h-1/2"
          >
            <img
              src={post.coverImage || "/placeholder.jpg"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>



      {/* ========== 3 SMALL POSTS (COLUMN 3) ========== */}
      <div className="flex flex-col gap-4">
        {others.slice(2, 5).map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="relative rounded-xl overflow-hidden group h-[150px] md:h-1/3"
          >
            <img
              src={post.coverImage || "/placeholder.jpg"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>

    <p className="text-right mt-4 text-2xl text-gray-600 hover:text-blue-300 cursor-pointer">
      More Posts on {category}
    </p>
  </section>
);

}
