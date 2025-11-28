import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"], // this covers /dashboard and all children
};

const SECRET = process.env.JWT_SECRET!;

// Safe Base64 decoder
function decodeB64(str: string) {
  return Uint8Array.from(Buffer.from(str, "base64"));
}

async function verifyToken(token: string) {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return false;

    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      decodeB64(signature),
      encoder.encode(`${header}.${payload}`)
    );

    return valid;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("---- MIDDLEWARE RUNNING ----");
  console.log("Path:", path);

  // Allow auth pages
  if (path.startsWith("/dashboard/auth")) {
    console.log("Auth route — allow");
    return NextResponse.next();
  }

  const token = req.cookies.get("adminToken")?.value;
  console.log("Token exists:", !!token);

  // No token → redirect
  if (!token) {
    console.log("No token → redirect to login");
    return NextResponse.redirect(new URL("/dashboard/auth/login", req.url));
  }

  // Validate token
  const valid = await verifyToken(token);
  console.log("Token valid:", valid);

  if (!valid) {
    console.log("Invalid token → redirect to login");
    return NextResponse.redirect(new URL("/dashboard/auth/login", req.url));
  }

  console.log("Token OK → allow dashboard");
  return NextResponse.next();
}
