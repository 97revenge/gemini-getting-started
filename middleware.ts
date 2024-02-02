import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export default async function middleware(request: NextRequest) {
  try {
    const text = request.nextUrl.searchParams.get("text");

    const instance = jwt.decode(text!);

    if (instance) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL(`/?error=${err}`, request.url));
  }
}

export const config = {
  matcher: ["/service/:path*", "/api/send/:path*"],
};
