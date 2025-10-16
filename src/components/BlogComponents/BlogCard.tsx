// components/CategorySection.tsx
import Link from "next/link";

type CategorySectionProps = {
  posts: any[];
};

export default function BlogCard({ posts }: CategorySectionProps) {
  if (!posts || posts.length === 0) return null;

  const [latest, ...others] = posts;

  return (
    <section className="w-full lg:w-[70%]  grid grid-cols-[2fr_1fr] gap-6 h-[600px]">
      {/* --- Big Box (Latest Post) --- */}
      <Link
        href={`/blog/${latest.slug}`}
        className="relative rounded-2xl overflow-hidden group"
      >
        <img
          src={latest.coverImage}
          alt={latest.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Text content */}
        <div className="absolute bottom-0 p-6 text-white">
          <p className="text-xs uppercase tracking-wide text-gray-300">
            {latest.category} •{" "}
            {new Date(latest.createdAt).toLocaleDateString()}
          </p>
          <h2 className="text-2xl font-bold mt-2">{latest.title}</h2>
          <p className="text-sm mt-2 line-clamp-3 opacity-90">
            {latest.excerpt ?? latest.content.slice(0, 120) + "..."}
          </p>
        </div>
      </Link>

      {/* --- Right Column (2 Smaller Boxes) --- */}
      <div className="grid grid-rows-2 gap-4">
        {others.slice(0, 2).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="relative rounded-xl overflow-hidden group"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Transparent bottom overlay */}
            <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
              <p className="text-xs uppercase text-gray-300">
                {post.category} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold leading-tight mt-1">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
