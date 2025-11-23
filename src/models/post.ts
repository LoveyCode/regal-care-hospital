import mongoose, { Schema } from "mongoose";


// Define schema
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
   content: {type: String, required: false, default: "", },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    coverImage: { type: String },
    author: { type: String, default: "Regal Care" },
    category: { type: String, required: true },
 
  },
  { timestamps: true }
);


export const Post =
  mongoose.models.Post || mongoose.model("Post", PostSchema);

