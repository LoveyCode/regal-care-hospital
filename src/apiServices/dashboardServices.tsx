import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/post";
import { Comment } from "@/models/comments";
import { Category } from "@/models/category";

export interface DashboardStats {
  totalPosts: number;
  totalCategories: number;
  totalComments: number;
  publishedPosts: number;
  pendingComments: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [totalPosts, totalCategories, totalComments, publishedPosts, pendingComments] =
    await Promise.all([
      Post.countDocuments(),
      Category.countDocuments(),
      Comment.countDocuments(),
      Post.countDocuments({ published: true }),
      Comment.countDocuments({ approved: false }),
    ]);

  return {
    totalPosts,
    totalCategories,
    totalComments,
    publishedPosts,
    pendingComments,
  };
}
