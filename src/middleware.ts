import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/dashboard/auth/login"],
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token: string) {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (err) {
    console.error("JWT verify failed:", err);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("adminToken")?.value;

  // 🚫 Skip JWT check for login route
  if (pathname === "/dashboard/auth/login") {
    if (token && (await verifyJWT(token))) {
      // Already logged in → go to dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect all /dashboard routes except /dashboard/auth/login
  if (pathname.startsWith("/dashboard")) {
    if (!token || !(await verifyJWT(token))) {
      return NextResponse.redirect(new URL("/dashboard/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
