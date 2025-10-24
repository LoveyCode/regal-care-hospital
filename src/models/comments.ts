import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IComment extends Document {
  postId: Types.ObjectId;
  commenterName: string;
  commenterEmail?: string;
  content: string;
  published?: boolean; // admin can moderate
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
    commenterName: { type: String, required: true },
    commenterEmail: { type: String, required: false },
    content: { type: String, required: true },
    published: { type: Boolean, default: true }, // default true or false based on moderation policy
  },
  { timestamps: true }
);

export const Comment = models.Comment || model<IComment>("Comment", CommentSchema);
export default Comment;
