import CommentsClient from "@/components/BlogComponents/CommentsClient";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";



export default function CommentsPage() {
  return <CommentsClient />;
}
