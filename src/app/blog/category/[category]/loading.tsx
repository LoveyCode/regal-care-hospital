// app/categories/[category]/loading.tsx
export default function LoadingCategory() {
  return (
    <main className="container mx-auto py-10">
      <div className="text-xl font-semibold mb-4">Loading posts…</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-zinc-800 rounded-lg h-56" />
        ))}
      </div>
    </main>
  );
}
