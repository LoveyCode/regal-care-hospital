import { NextResponse } from "next/server";
import { getAllCategories, createCategory } from "@/apiServices/categoryServices";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("❌ Error fetching categories:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const category = await createCategory(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating category:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create" },
      { status: 500 }
    );
  }
}