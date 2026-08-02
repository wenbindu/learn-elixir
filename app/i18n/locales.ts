export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "beam-path-locale";

const chineseRegionCodes = new Set(["CN", "HK", "MO", "TW"]);

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromCountry(country: string | null | undefined): Locale {
  const normalized = country?.trim().toUpperCase();
  return normalized && chineseRegionCodes.has(normalized) ? "zh" : "en";
}

export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const currentLocale = locales.find(
    (candidate) =>
      href === `/${candidate}` || href.startsWith(`/${candidate}/`),
  );

  if (currentLocale) {
    return `/${locale}${href.slice(currentLocale.length + 1)}`;
  }

  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function localePathname(pathname: string, locale: Locale) {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = withLeadingSlash.split("/");

  if (isLocale(segments[1])) segments[1] = locale;
  else segments.splice(1, 0, locale);

  return segments.join("/") || `/${locale}`;
}
