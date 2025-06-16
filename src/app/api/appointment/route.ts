import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { NextResponse } from 'next/server';
 // adjust as needed

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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
