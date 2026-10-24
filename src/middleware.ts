import { NextResponse, type NextRequest } from "next/server";

/**
 * Stamps the request path onto the x-pathname header so the root layout can
 * gate route-specific <head> content (currently: skipping the AdSense loader
 * on ad-excluded paths). No response changes, no redirects, no cookies.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico|icon.svg|data/).*)"],
};
