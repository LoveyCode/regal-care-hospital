"use client";
import { useQuery} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, MessageSquare, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  loading 
}: { 
  title: string; 
  value: number | string; 
  icon: any; 
  loading?: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {loading ? (
        <Skeleton className="h-8 w-20" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

  
const Overview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
  queryFn: async () => {
    const res = await fetch("/api/dashboard/stats");
    if (!res.ok) throw new Error("Failed to load stats");
    return res.json();
  },
  });


  return (

    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your blog admin panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts || 0}
          icon={FileText}
          loading={isLoading}
        />
        <StatCard
          title="Categories"
          value={stats?.totalCategories || 0}
          icon={FolderOpen}
          loading={isLoading}
        />
        <StatCard
          title="Comments"
          value={stats?.totalComments || 0}
          icon={MessageSquare}
          loading={isLoading}
        />
        <StatCard
          title="Total Views"
          value={stats?.totalViews || "N/A"}
          icon={Eye}
          loading={isLoading}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="/dashboard/blogActions/createPost"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Create New Post</h3>
                <p className="text-sm text-muted-foreground">
                  Write a new blog article
                </p>
              </div>
            </a>
            <a
              href="/dashboard/blogActions/postCategories"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <FolderOpen className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Manage Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your content
                </p>
              </div>
            </a>
            <a
              href="/dashboard/blogActions/postComments"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Review Comments</h3>
                <p className="text-sm text-muted-foreground">
                  Moderate discussions
                </p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>

  );
};

export default Overview;
