import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const locales = [
  "en",
  "it",
  "pt",
  "es",
  "fr",
  "de",
  "ro",
  "pl",
  "nl",
  "tr",
  "ar",
];

const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") || "";

  const preferredLocale =
    locales.find((locale) => acceptLanguage.toLowerCase().includes(locale)) ||
    defaultLocale;

  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next).*)"],
};