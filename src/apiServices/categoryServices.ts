import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/category";
import { ICategory } from "../../types/blog";
import { Post } from "@/models/post";

export async function getAllCategories() {
  await connectDB();
  return Category.find({}, "name postCount") // only fetch name + postCount
    .sort({ createdAt: -1 })
    .lean<ICategory>()
    .exec();
}

export async function getCategoryById(id: string) {
  await connectDB();
  return Category.findById(id, "name postCount").lean<ICategory>().exec();
}

export async function createCategory(data: { name: string }) {
  await connectDB();

  // ✅ Prevent duplicates by name
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error("Category already exists");

    const postCount = await Post.countDocuments({ category: data.name });

  const category = new Category({
    name: data.name,
    postCount,
  });

  await category.save();
  return category.toObject();
}

export async function updateCategory(id: string, data: Partial<ICategory>) {
  await connectDB();
  return Category.findByIdAndUpdate(id, data, { new: true })
    .lean<ICategory>()
    .exec();
}

export async function deleteCategory(id: string) {
  await connectDB();
  return Category.findByIdAndDelete(id).lean<ICategory>().exec();
}
