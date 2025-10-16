import { Post } from "@/models/post";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";


async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    await Post.deleteMany({});
    await Post.insertMany([
      {
        title: "Welcome to Regal Care Blog",
        slug: "welcome-to-regal-care-blog",
        content: "This is our first post!",
        published: true,
      },
      {
        title: "Understanding Preventive Healthcare",
        slug: "understanding-preventive-healthcare",
        content: "Learn about preventive care and its benefits.",
        published: true,
      },
    ]);

    console.log("🌱 Seeded posts successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed error:", error);
  }
}

seed();
