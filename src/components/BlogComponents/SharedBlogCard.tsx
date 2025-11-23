"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IPost } from "../../../types/blog";

type SharedBlogCardProps = {
  post: IPost;
  size?: "large" | "medium" | "small";
  className?: string;
  commentCount?: number; // <-- add commentCount here
};

export default function SharedBlogCard({
  post,
  size = "small",
  className = "",
  commentCount = 0,
}: SharedBlogCardProps) {
  if (!post) return null;

  /* ----- HEIGHT SETTINGS ----- */
  let heightClass = "h-48";
  if (size === "large") heightClass = "h-[400px] md:h-[550px]";
  if (size === "medium") heightClass = "h-64";

  /* ----- TEXT SIZE SETTINGS ----- */
  const titleSize =
    size === "large"
      ? "text-4xl md:text-5xl font-bold"
      : size === "medium"
      ? "text-2xl font-semibold"
      : "text-lg font-semibold";

  const showExcerpt = size === "large";
  const showMeta = size !== "small";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition ${className}`}
    >
      {/* IMAGE */}
      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={post.coverImage || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* TEXT AREA */}
      <div className="absolute bottom-0 p-5 w-full text-white">
        {/* CATEGORY + DATE */}
        {showMeta && (
          <p className="text-sm uppercase text-gray-300">
            {post.category || "Uncategorized"} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        )}

        {/* TITLE */}
        <h2 className={`${titleSize} mt-1 leading-tight`}>{post.title}</h2>

        {/* COMMENT COUNT */}
        {showMeta && (
          <div className="flex items-center gap-2 text-sm mt-2 text-gray-300">
            <span>💬 {commentCount}</span>
          </div>
        )}

        {/* EXCERPT only for large */}
        {showExcerpt && (
          <p className="text-sm mt-3 line-clamp-3 opacity-90">
            {post.excerpt ??
              (post.content ? post.content.slice(0, 120) + "..." : "")}
          </p>
        )}
      </div>

      {/* CLICK AREA */}
      <Link href={`/blog/${post.slug}`} className="absolute inset-0"></Link>
    </motion.article>
  );
}
