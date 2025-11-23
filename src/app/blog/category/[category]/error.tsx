// app/categories/[category]/error.tsx
"use client"; // error.tsx is a client component so you can use hooks if needed

import { useEffect } from "react";

export default function CategoryError({ error }: { error: Error }) {
  useEffect(() => {
    console.error("CategoryPage error:", error);
  }, [error]);

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-600">We couldn&apos;t load posts for this category. Try refreshing or come back later.</p>
      <p className="mt-4 text-sm text-red-500">{error?.message}</p>
    </main>
  );
}
