// import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export async function POST(req: NextRequest ) {
//   const { username, password } = await req.json();

//   if (
//     username === process.env.BLOGADMIN_USERNAME &&
//     password === process.env.BLOGADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
//       expiresIn: "1h",
//     });

//     const res = NextResponse.json({ success: true });
//     res.cookies.set("adminToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//     });
//     return res;
//   }

//   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// }

// // ✅ NEW: handle GET for verifying if admin is logged in
// export async function GET(req: NextRequest) {
//   const token = req.cookies.get("adminToken")?.value; 

//   if (!token) {
//     return NextResponse.json({ authenticated: false }, { status: 401 });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET!);
//     return NextResponse.json({ authenticated: true });
//   } catch {
//     return NextResponse.json({ authenticated: false });
//   }
// }
