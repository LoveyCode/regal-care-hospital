import { getRecentComments } from "@/apiServices/commentServices";
import { NextResponse } from "next/server";



export async function GET() {
    const recentComments = await getRecentComments(5);
    return NextResponse.json(recentComments);
}