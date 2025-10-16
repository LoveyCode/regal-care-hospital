import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  published?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    content: { type: String, required: true }, // markdown
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    coverImage: { type: String },
    author: { type: String, default: "Regal Care" },
 
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite errors in Next.js
 export const Post = models.Post || model<IPost>("Post", PostSchema);
