import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const supportedLocales = ["en", "pt"];
const disabledLocales = ["it", "es", "fr", "de", "ro", "pl", "nl", "tr", "ar"];
const defaultLocale = "en";

function getPreferredLocale(acceptLanguage: string) {
  return (
    supportedLocales.find((locale) =>
      acceptLanguage.toLowerCase().includes(locale)
    ) || defaultLocale
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = getPreferredLocale(acceptLanguage);
  const [, firstSegment, ...remainingSegments] = pathname.split("/");

  if (supportedLocales.includes(firstSegment)) {
    return NextResponse.next();
  }

  if (disabledLocales.includes(firstSegment)) {
    const remainingPath = remainingSegments.join("/");
    const destinationPath = remainingPath
      ? `/${preferredLocale}/${remainingPath}`
      : `/${preferredLocale}`;

    return NextResponse.redirect(new URL(destinationPath, request.url), 308);
  }

  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url),
    308
  );
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
