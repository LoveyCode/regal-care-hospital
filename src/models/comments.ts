import mongoose, { Schema } from "mongoose";



const CommentSchema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    postTitle: { type: String, required: false },
    postCategory: { type: String, required: false },
    commenterName: { type: String, required: true },
    commenterEmail: { type: String, required: false },
    content: { type: String, required: true },
    approved: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

