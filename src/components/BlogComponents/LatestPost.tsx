"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";
import { IPost } from "../../../types/blog";
import { motion } from "framer-motion";
import BlogSkeleton from "./BlogSkeleton";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LatestPost() {
  // Fetch posts with SWR
  const { data, isLoading, error } = useSWR(
    "/api/blogPosts?limit=5&publishedOnly=true",
    fetcher,
    { revalidateOnFocus: false }
  );

  // Fetch comment counts with React Query
  const { data: commentCounts } = useQuery({
    queryKey: ["commentCounts"],
    queryFn: async () => {
      const res = await fetch(`/api/comments/counts`);
      if (!res.ok) throw new Error("Failed to fetch comment counts");
      return res.json();
    },
  });

  const { data: recentCommentsRes } = useQuery({
    queryKey: ["recentComments"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/recent`);
      if (!res.ok) throw new Error("Failed to fetch recent comment");
      return res.json();
    },
  });

  const { data: archivesRes } = useQuery({
    queryKey: ["archives"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/archives`);
      if (!res.ok) throw new Error("Failed to fetch archives");
      return res.json();
    },
  });

  // Handle loading
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Handle SWR error
  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px] text-red-500">
        Failed to load posts.
      </div>
    );
  }

  // Handle empty data
  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-400">
        No posts available yet.
      </div>
    );
  }

  // Safely extract arrays
  const archives = archivesRes || [];
  const recentComments = recentCommentsRes || [];

  // Posts
  const posts: IPost[] = data.posts;
  const [latest, ...others] = posts;

const getCount = (slug?: string) => {
  if (!slug) return 0;
  return commentCounts?.[slug] ?? 0;
};


  return (
      <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className=" rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
    > 
    <div className="w-full mx-2 my-20 grid grid-cols-1 lg:grid-cols-[2fr_1fr_2fr] gap-6 lg:h-[600px]">
      {/* --- Big Box (Latest Post) --- */}
      <Link
        href={`/blog/${latest.slug}`}
        className="relative rounded-2xl overflow-hidden group"
      >
        <div className="flex flex-1 lg:hidden w-full h-[300px] lg:h-[600px]"> 
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
          className="absolute inset-0 w-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* --- Right Column (2 Smaller Boxes) --- */}
      <div className="grid grid-rows-4 lg:grid-rows-2 gap-4">
        {others.slice(0, 4).map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="relative rounded-xl overflow-hidden group"
          >
            {/* MOBILE VERSION */}
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
              <h3 className="text-md lg:text-2xl font-semibold   dark:text-zinc-200 text-gray-700 leading-tight mt-1">
                {post.title}
              </h3>

              <div className="flex items-center gap-2 text-sm mt-2 dark:text-zinc-200 text-gray-700">
                <span>💬 {getCount(post.slug)}</span>
              </div>
            </div>
            </div>
            </div>
        
        {/* DESKTOP VERSION*/}

          {/* --- Right Column (2 Smaller Boxes) --- */}
        <div className="hidden lg:block">   
              <Image
              src={post.coverImage || "/placeholder.jpg"}
              alt={post.title}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
           
            <div className=" absolute inset-0 bg-black/50"></div>

             <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
              <p className="text-sm uppercase text-gray-300">
                {post.category || "Uncategorized"} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h3 className="text-md lg:text-2xl font-semibold leading-tight mt-1">
                {post.title}
              </h3>

              <div className="flex items-center gap-2 text-sm mt-2 text-gray-300">
                <span>💬 {getCount(post.slug)}</span>
              </div>
            </div>
            </div>
          </Link>
        ))}
      </div>

           {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block space-y-10 mx-20 min-h-[600px] overflow-y-auto">
          {/* ARCHIVES */}
          <div>
           <h1 className="font-condensed text-xl lg:text-2xl xl:text-3xl  font-bold text-left">Archives</h1>
            {archives.length > 0 ? (
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">

      {isLoading && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={14}
              height={14}
              className="animate-spin"
            />
            Loading...
          </div>
        )}

             {archives.map((archive: any) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const monthLabel = `${monthNames[archive._id.month - 1]} ${archive._id.year}`;
                  return (
          <li key={`${archive._id.year}-${archive._id.month}`}>
            <Link
              href={`/blog/archives/${archive._id.year}/${archive._id.month}`}
              className="hover:text-yellow-600 cursor-pointer"
            >
              {monthLabel} ({archive.count})
            </Link>
          </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No Archieves Available</p>
            )}
          </div>

          {/* Recent Comments */}
          <div>
           <h1 className="font-condensed text-xl lg:text-2xl xl:text-3xl  font-bold text-left">Recent Comments</h1>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

      {isLoading && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={14}
              height={14}
              className="animate-spin"
            />
            Loading...
          </div>
        )}

              {recentComments.length > 0 ? (
                recentComments.slice(0, 10).map((c: any) => (
                  <li key={c._id}>
                    <span className="font-medium">{c.commenterName}:</span>{" "}
                    “{c.content.length > 40 ? c.content.slice(0, 40) + "..." : c.content}”
                  </li>
                ))
              ) : (
                <p>No Recent Comment</p>
              )}
            </ul>
          </div>
        </aside>
      
    </div>
    </motion.article>
  );
}
