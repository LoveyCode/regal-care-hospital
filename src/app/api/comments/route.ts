// app/api/comments/route.ts
import { NextResponse } from "next/server";
import { getComments } from "@/apiServices/commentServices";

export async function GET() {
    const Comments = await getComments();
    return NextResponse.json(Comments);
}