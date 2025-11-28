import PostCategoryDashboard from "@/components/BlogComponents/PostCategoryDashboard";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";

export default function PostCategories() {
  return <PostCategoryDashboard />;
}

