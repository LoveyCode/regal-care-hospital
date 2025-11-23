"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Ticker() {
  // Fetch latest 8 posts
  const { data, error, isLoading } = useSWR("/api/blogPosts?limit=8&publishedOnly=true", fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-6 bg-yellow-600 shadow-2xl flex items-center px-4">
        Loading...
      </div>
    );
  }

  if (error || !data?.posts) {
    return (
      <div className="w-full h-6 bg-yellow-600 shadow-2xl flex items-center px-4">
        Failed to load posts
      </div>
    );
  }

  const posts = data.posts;

  return (
    <div className="block w-full h-6 mt-0">
      <div className="w-full h-6 bg-yellow-600 shadow-2xl overflow-hidden relative">
        <div className="ticker-viewport">
          <div className="ticker-track whitespace-nowrap animate-marquee">
            {[...posts, ...posts].map((post: any, i: number) => (
              <span key={i} className="ticker-item mx-8">
                {post.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
