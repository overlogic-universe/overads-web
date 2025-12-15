import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/sign-up"];
const PROTECTED_PAGES = ["/create", "/dashboard"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  console.log("TOKENN :", token)
  const { pathname } = request.nextUrl;

  // sudah login tapi buka halaman auth
  if (token && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/create", request.url));
  }

  // belum login tapi buka halaman protected
  if (!token && PROTECTED_PAGES.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
