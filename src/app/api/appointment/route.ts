export const dynamic = 'force-dynamic';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getRecentAppointmentList();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message); // <-- Add this
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("API Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
