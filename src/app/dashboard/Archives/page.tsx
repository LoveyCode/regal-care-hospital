export const revalidate = 60; // valid now


import ArchivesClient from "@/components/BlogComponents/ArchivesClient";
import { Archive } from "../../../../types/blog";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/archives`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch archives");
    return <div>Error loading archives</div>;
  }

  const archives: Archive[] = await res.json();

  return <ArchivesClient archives={archives} />;
}
