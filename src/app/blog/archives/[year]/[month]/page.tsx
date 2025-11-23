"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "../../../../../../types/blog";
import SectionHeading from "@/components/sectionHeading";



const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArchivePage({
  params,
}: {
  params: { year: string; month: string };
}) {
  const { year, month } = params;

  const { data, error, isLoading } = useSWR(
    `/api/blogPosts/archives/${year}/${month}`,
    fetcher
  );

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const monthLabel = monthNames[Number(month) - 1];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-[200px] bg-gray-300 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (error || !data?.posts) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        Failed to load posts.
      </div>
    );
  }

  const posts: IPost[] = data.posts;

  return (
    <div className="p-6">
       <SectionHeading title={<h1 className="header mt-20 text-left">{monthLabel} {year} Archives</h1>} />

      {posts.length === 0 && (
        <p className="text-gray-500">No posts found in this archive.</p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-[150px] relative">
              <Image
                src={post.coverImage || "/placeholder.jpg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <p className="uppercase text-xs text-gray-500">
                {post.category}
              </p>
              <h2 className="font-semibold text-lg line-clamp-2">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
