// src/lib/mongodb.ts
import mongoose from "mongoose";

const DATABASE_URI = process.env.MONGODB_URI as string;

if (!DATABASE_URI) {
  throw new Error("❌ Missing DATABASE_URI in .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(DATABASE_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected in Next.js app");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
