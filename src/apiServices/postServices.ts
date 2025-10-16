// services/postService.ts


import { connectDB } from "@/lib/mongodb";
import { Post, IPost } from "@/models/post";

export type PostListOptions = {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  publishedOnly?: boolean;
  category?: string;
};

export async function createPost(payload: Partial<IPost>) {
  await connectDB();
  const p = new Post(payload);
  return p.save();
}

export async function getPostBySlug(slug: string) {
  await connectDB();
  return Post.findOne({ slug }).lean<IPost>().exec();
}

export async function getPosts(options: PostListOptions = {}) {
  await connectDB();
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(50, options.limit ?? 10);
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (options.publishedOnly !== false) filter.published = true;
  if (options.search) {
    filter.$or = [
      { title: new RegExp(options.search, "i") },
      { excerpt: new RegExp(options.search, "i") },
      { content: new RegExp(options.search, "i") },
    ];
  }
  if (options.tags && options.tags.length) filter.tags = { $in: options.tags };

  const [items, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    Post.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1,
  };
}

export async function updatePostBySlug(slug: string, updates: Partial<IPost>) {
  await connectDB();
  return Post.findOneAndUpdate({ slug }, updates, { new: true }).exec();
}

export async function deletePostBySlug(slug: string) {
  await connectDB();
  return Post.findOneAndDelete({ slug }).exec();
}
