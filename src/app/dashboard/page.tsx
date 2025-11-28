import DashboardPage from "@/components/BlogComponents/DashboardPage";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";

export default function Overview() {
  return (
 <DashboardPage />
  );
}
