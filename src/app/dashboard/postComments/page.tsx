import CommentsClient from "@/components/BlogComponents/CommentsClient";


export const dynamic = "force-dynamic"; // 🔥 ensures always fresh data on Vercel

export default function CommentsPage() {
  return <CommentsClient />;
}
