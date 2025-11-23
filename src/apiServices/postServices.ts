import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/post";
import { IPost, PostListOptions } from "../../types/blog";



export async function createPost(payload: Partial<IPost>) {
  await connectDB();
  const p = new Post(payload);
  return p.save();
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



export async function getPostBySlug(slug: string) {
  await connectDB();
  return Post.findOne({ slug }).lean<IPost>().exec();
}

export async function getPostsByCategory(category: string) {
  await connectDB();

  if (!category) return []; // prevent empty queries

  return Post.find({ category, published: true })
    .sort({ createdAt: -1 })
    .lean()                                                                 
    .exec();
}

export async function getRecentPosts(options: PostListOptions = {}) {
  await connectDB();
 const limit = Math.min(10, options.limit ?? 7);

  return Post.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<IPost>()
    .exec();
}



export async function updatePostBySlug(slug: string, updates: Partial<IPost>) {
  await connectDB();
  const post = await Post.findOneAndUpdate(
    { slug },
    { $set: updates },
    { new: true, upsert: true } // 👈 this is the key fix
  ).exec();
  return post;
}

export async function deletePostBySlug(slug: string) {
  await connectDB();
  return Post.findOneAndDelete({ slug }).exec();
}


export async function getAllArchives() {
  await connectDB();

  const archives = await Post.aggregate([
    { $match: { published: true } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);
  return archives;
}


