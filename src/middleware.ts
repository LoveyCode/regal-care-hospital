import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};

const SECRET = process.env.JWT_SECRET!;

async function verify(token: string) {
  try {
    const [header, payload, signature] = token.split(".");
    const encoder = new TextEncoder();

    const data = `${header}.${payload}`;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      Uint8Array.from(atob(signature), c => c.charCodeAt(0)),
      encoder.encode(data)
    );

    return isValid;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard/auth")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("adminToken")?.value;

  if (!token || !(await verify(token))) {
    return NextResponse.redirect(new URL("/dashboard/auth/login", req.url));
  }

  return NextResponse.next();
}
