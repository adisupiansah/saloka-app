import { NextResponse } from "next/server";
import { auth } from "@/libs/Firebase";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Pastikan user sudah login
  const user = auth.currentUser;

  // Jika belum login dan bukan di halaman /auth, redirect ke /auth
  if (!user && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Jika sudah login dan mencoba ke /auth, redirect ke /
  if (user && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Tentukan halaman yang akan diproses oleh middleware
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // Semua halaman kecuali _next, static, favicon.ico
};
