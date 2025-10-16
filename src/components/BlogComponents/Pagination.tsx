// components/Pagination.tsx
import Link from "next/link";

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < pages ? page + 1 : null;

  return (
    <nav className="flex gap-3 items-center justify-center">
      {prev ? <Link href={`/blog?page=${prev}`} className="px-3 py-1 rounded bg-slate-100">Prev</Link> : <span className="px-3 py-1 text-muted">Prev</span>}
      <span className="text-sm text-muted">Page {page} of {pages}</span>
      {next ? <Link href={`/blog?page=${next}`} className="px-3 py-1 rounded bg-slate-100">Next</Link> : <span className="px-3 py-1 text-muted">Next</span>}
    </nav>
  );
}
