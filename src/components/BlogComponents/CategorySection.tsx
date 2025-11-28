"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "../../../types/blog";
import Image from "next/image";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategorySection({ category }: { category: string }) {
// Fetch posts with SWR
    const { data, isLoading, error } = useSWR(
      `/api/blogPosts/category/${category}?limit=6&publishedOnly=true`,
      fetcher,
      { revalidateOnFocus: false }
    );
  

  // 🔹 Fetch comment counts
  const { data: commentCounts } = useQuery({
    queryKey: ["commentCounts"],
    queryFn: async () => {
      const res = await fetch(`/api/comments/counts`);
      if (!res.ok) throw new Error("Failed to fetch comment counts");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-500">
        Loading posts...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[300px] text-red-500">
        Failed to load posts.
      </div>
    );

  if (!data?.posts || data.posts.length === 0)
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-400">
        No posts available yet.
      </div>
    );

  const posts: IPost[] = data.posts;
  const [latest, ...others] = posts;

  // const getCount = (postId: string) => commentCounts?.[postId] ?? 0;
  const getCount = (slug?: string) => {
  if (!slug) return 0;
  return commentCounts?.[slug] ?? 0;
};

  return (
    <section className="w-full flex flex-col mx-2 my-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6 h-auto lg:h-[500px]">
        {/* --- Big Box (Latest Post) --- */}
        <Link
          href={`/blog/${latest.slug}`}
          className="relative rounded-2xl overflow-hidden group"
        >
           <div className="flex flex-1  w-full h-[300px]"> 
          <Image
            src={latest.coverImage || "/placeholder.jpg"}
            alt={latest.title}
            width={800} 
            height={400}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          </div>

               <Image
            src={latest.coverImage || "/placeholder.jpg"}
            alt={latest.title}
            width={800}
            height={400}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
         
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

       <div className="absolute bottom-0 p-6 text-white">
          <p className="text-md uppercase tracking-wide text-gray-300">
            {latest.category || "Uncategorized"} •{" "}
            {new Date(latest.createdAt).toLocaleDateString()}
          </p>
          <h2 className="text-xl lg:text-6xl font-bold mt-2">{latest.title}</h2>
          <div className="flex items-center gap-2 text-sm mt-2 text-gray-300">
            <span>💬 {getCount(latest.slug)}</span>
          </div>

          <p className="text-sm mt-2 line-clamp-3 opacity-90">
            {latest.excerpt ??
              (latest.content ? latest.content.slice(0, 80) + "..." : "")}
          </p>
        </div>
        </Link>

        {/* --- Middle Column (2 Smaller Boxes) --- */}
       
        <div className="hidden lg:grid lg:grid-rows-2 gap-4">
          {others.slice(0, 2).map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="relative rounded-xl overflow-hidden group"
            >
              <Image
                src={post.coverImage || "/placeholder.jpg"}
                alt={post.title}
                width={800}
                height={400}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                <p className="text-sm uppercase text-gray-300">
                  {post.category || "Uncategorized"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-2xl font-semibold leading-tight mt-1">
                  {post.title}
                </h3>

                <div className="flex items-center gap-2 text-sm mt-2 text-gray-300">
                  <span>💬 {getCount(post.slug)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      

        {/* --- Right Column (3 Smaller Boxes) --- */}
        <div className="hidden lg:grid lg:grid-rows-3 gap-4">
          {others.slice(3, 6).map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="relative rounded-xl overflow-hidden group"
            >
              <Image
                src={post.coverImage || "/placeholder.jpg"}
                alt={post.title}
                width={800}
                height={400}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                <p className="text-sm uppercase text-gray-300">
                  {post.category || "Uncategorized"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-2xl font-semibold leading-tight mt-1">
                  {post.title}
                </h3>

                <div className="flex items-center gap-2 text-sm mt-2 text-gray-300">
                  <span>💬 {getCount(post.slug)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
       

 {/* Mobile Version */}
   <div className="lg:hidden grid grid-rows-6 gap-4">
        {others.slice(0, 6).map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="relative rounded-xl overflow-hidden group">

          <div className="block lg:hidden">
            <div className="relative grid grid-cols-[1fr_2fr] ">   
            <div className="relative flex flex-1 w-[100px] h-[100px] lg:h-full lg:w-full">
            <Image
              src={post.coverImage || "/placeholder.jpg"}
              alt={post.title}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            </div>
            <div className="hidden lg:block absolute inset-0 bg-black/50"></div>

            <div className=" lg:absolute bottom-0 flex flex-col w-full bg-transparent lg:bg-black/60 text-white p-4">
              <p className="text-sm uppercase text-yellow-600">
                {post.category || "Uncategorized"} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h3 className="text-md lg:text-2xl font-semibold leading-tight mt-1 dark:text-zinc-200 text-gray-700">
                {post.title}
              </h3>

              <div className="flex items-center gap-2 text-sm mt-2 dark:text-zinc-200 text-gray-700">
                <span>💬 {getCount(post.slug)}</span>
              </div>
            </div>
            </div>
            </div>
      </Link>
        ))}
      </div>
      </div>
      <p className="text-right mt-4 text-lg lg:text-2xl text-gray-600 hover:text-blue-300 cursor-pointer">
            <Link
         href={`/blog/category/${encodeURIComponent(category)}`}
         >   
         More Posts on {category}
        </Link>
      </p>
    </section>
  );
}
