import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET!;

const BLOGADMIN_USERNAME = process.env.BLOGADMIN_USERNAME!;
const BLOGADMIN_PASSWORD = process.env.BLOGADMIN_PASSWORD!;

export async function POST(req: NextRequest) {
   const { username, password } = await req.json();

if (username !== BLOGADMIN_USERNAME || password !== BLOGADMIN_PASSWORD) {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

  const token = jwt.sign({ role: username }, JWT_SECRET, { expiresIn: "1h" });

const res = NextResponse.json({ success: true });
res.cookies.set({
  name: "adminToken",
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",      // IMPORTANT
  path: "/",
  maxAge: 60 * 60, 
});


  return res;
}
