// components/CategoryGrid.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { IPost } from "../../../types/blog";


type Props = { posts: IPost[] };

export default function CategoryGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((p) => (
        <motion.article
          key={p._id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow"
        >
          <Link href={`/blog/${p.slug}`} className="block relative h-44">
            <img
              src={p.coverImage || "/placeholder.jpg"}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="p-4">
            <Link href={`/blog/${p.slug}`}>
              <h2 className="font-semibold text-lg line-clamp-2">{p.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.excerpt ?? ""}</p>
            <div className="mt-3 text-xs text-gray-400">
              {p.category} • {new Date(p.createdAt).toLocaleDateString()}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
