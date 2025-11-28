import { deleteComment, updateComment } from "@/apiServices/commentServices";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }  // MUST include req
) {
  const updated = await updateComment(params.id, { approved: true });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }  // MUST include req
) {
  const result = await deleteComment(params.id);
  return NextResponse.json({
    message: "Comment deleted",
    result,
  });
}
