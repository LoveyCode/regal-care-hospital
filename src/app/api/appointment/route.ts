import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { NextResponse } from "next/server";
// your function

export async function GET() {
  try {
    const data = await getRecentAppointmentList();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
  }
