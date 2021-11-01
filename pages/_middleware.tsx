import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const response = NextResponse.next();

  // Opt out floc: https://geekflare.com/opt-out-floc-configuration/
  response.headers.set(
    "permissions-policy",
    "interest-cohort=(), camera=(), microphone=(), geolocation=()"
  );

  return response;
}
