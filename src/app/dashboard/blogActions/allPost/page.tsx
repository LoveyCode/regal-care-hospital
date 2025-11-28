import AllPostDashboard from "@/components/BlogComponents/AllPostDashboard";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";

export default function AllPosts() {
  return <AllPostDashboard />;
}

