import CreatePostDashboard from "@/components/BlogComponents/CreatePostDashboard";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";

export default function CreatePost() {
  return <CreatePostDashboard />;
}

