"use client";

import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Archive } from "../../../types/blog";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function ArchivesClient() {
  const { data: archives, error, isLoading } = useSWR(
    "/api/archives",
    fetcher,
    {
      refreshInterval: 0, 
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <div>Loading archives…</div>;
  if (error) return <div>Failed to load archives</div>;
  if (!archives || archives.length === 0)
    return (
      <Card>
        <CardContent className="flex min-h-[200px] items-center justify-center">
          <p className="text-muted-foreground">No archives available</p>
        </CardContent>
      </Card>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Archives</h1>
        <p className="text-muted-foreground">
          Browse posts by publication date
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {archives.map((archive: Archive) => (
          <Card key={`${archive._id.year}-${archive._id.month}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {monthNames[archive._id.month - 1]} {archive._id.year}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{archive.count}</div>
              <p className="text-xs text-muted-foreground">
                {archive.count === 1 ? "post" : "posts"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
