import {
  NextResponse,
  type NextRequest,
  type ProxyConfig,
} from "next/server";
import {
  isLocale,
  localeCookieName,
  localeFromCountry,
  locales,
} from "./app/i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return NextResponse.next();

  const savedLocale = request.cookies.get(localeCookieName)?.value;
  const locale = isLocale(savedLocale)
    ? savedLocale
    : localeFromCountry(request.headers.get("x-vercel-ip-country"));
  const destination = request.nextUrl.clone();

  destination.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(destination, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, X-Vercel-IP-Country");
  return response;
}

export const config = {
  matcher: [
    "/((?!api(?:/|$)|_next/static(?:/|$)|_next/image(?:/|$)|_vercel(?:/|$)|favicon\\.ico$|favicon-32x32\\.png$|apple-touch-icon\\.png$|brand-icon\\.png$|icon-512\\.png$|og\\.png$|manifest\\.webmanifest$|robots\\.txt$|sitemap\\.xml$).*)",
  ],
} satisfies ProxyConfig;
