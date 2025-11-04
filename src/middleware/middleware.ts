import { type NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  // Get device information
  const { device } = userAgent(request);

  // Add device type to headers so it can be accessed in components
  requestHeaders.set("x-device-type", device.type || "desktop");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
