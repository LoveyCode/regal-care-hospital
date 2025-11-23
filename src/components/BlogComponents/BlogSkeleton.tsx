export default function BlogSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
      <div className="h-52 bg-zinc-300 dark:bg-zinc-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 w-3/4 rounded"></div>
        <div className="h-3 bg-zinc-300 dark:bg-zinc-700 w-1/2 rounded"></div>
        <div className="h-3 bg-zinc-300 dark:bg-zinc-700 w-full rounded"></div>
        <div className="h-3 bg-zinc-300 dark:bg-zinc-700 w-5/6 rounded"></div>
      </div>
    </div>
  );
}
