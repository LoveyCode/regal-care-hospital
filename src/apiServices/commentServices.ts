// src/services/commentService.ts
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/comments";
import { Post } from "@/models/post";
import { IComment, IPost } from "../../types/blog";



export async function createComment(payload: {
  postSlug: string;
  commenterName: string;
  commenterEmail?: string;
  content: string;
}) {
  const { postSlug, commenterName, commenterEmail, content } = payload;

  await connectDB();

  
  // Fetch the post to get title + category
const post = await Post.findOne({ slug: postSlug }).lean<IPost>();

  const comment = new Comment({
    slug: postSlug,   // <-- save as plain string
    postTitle: post?.title || "Untitled Post",
    postCategory: post?.category || "Uncategorized",
    commenterName,
    commenterEmail,
    content,
    approved: false,
  });

  return comment.save();
}


export async function getRecentComments(limit = 5) {
  await connectDB();
  return Comment.find({ approved: true }).sort({ createdAt: -1 }).limit(limit).lean().exec();
}

export async function getComments() {
  await connectDB();
  return Comment.find({ approved: false }).sort({ createdAt: -1 }).lean().exec();
}

export async function getCommentsForPost(slug: string) {
  await connectDB();
  return Comment.find({ slug, approved: true })
    .sort({ createdAt: 1 })
    .lean()
    .exec();
}



export async function updateComment(id: string, data: Partial<IComment>) {
  await connectDB();
  return Comment.findByIdAndUpdate(id, data, { new: true })
    .lean<IComment>()
    .exec();
}

export async function deleteComment(id: string) {
  await connectDB();
  return Comment.findByIdAndDelete(id)
    .lean<IComment>()
    .exec();
}

