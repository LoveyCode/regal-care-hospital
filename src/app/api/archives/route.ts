import { getAllArchives } from "@/apiServices/postServices";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const archives = await getAllArchives();
    return NextResponse.json(archives);
  } catch (error: any) {
    console.error("❌ Error fetching archives:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch archives" },
      { status: 500 }
    );
  }
}