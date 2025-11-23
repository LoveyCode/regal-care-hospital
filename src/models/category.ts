import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    postCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = models.Category || mongoose.model("Category", CategorySchema);
