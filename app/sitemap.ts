import type { MetadataRoute } from "next";
import { getBasicPaths, getCourseCatalog } from "./i18n/catalog";
import { locales, localizeHref, type Locale } from "./i18n/locales";

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

const siteOrigin = new URL(
  deploymentHost.startsWith("http")
    ? deploymentHost
    : `https://${deploymentHost}`,
).origin;

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteOrigin).toString();
}

function alternateUrls(pathname: string) {
  return {
    "zh-CN": absoluteUrl(localizeHref("zh", pathname)),
    en: absoluteUrl(localizeHref("en", pathname)),
    "x-default": absoluteUrl(pathname),
  };
}

function entry(
  locale: Locale,
  pathname: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizeHref(locale, pathname)),
    changeFrequency: pathname === "/" ? "weekly" : "monthly",
    priority,
    alternates: { languages: alternateUrls(pathname) },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const basicPaths = getBasicPaths("en");
  const courseModules = getCourseCatalog("en").courseModules;
  const corePaths = [
    "/",
    "/from-scratch",
    "/from-scratch/elixir",
    "/from-scratch/erlang",
    "/keywords",
    "/playground",
    "/resources",
  ];
  const basicLessonPaths = basicPaths.flatMap((path) =>
    path.lessons.map(
      (lesson) => `/from-scratch/${path.id}/${lesson.slug}`,
    ),
  );
  const courseModulePaths = courseModules.map(
    (courseModule) => `/learn/${courseModule.slug}`,
  );

  return locales.flatMap((locale) => [
    ...corePaths.map((pathname) =>
      entry(locale, pathname, pathname === "/" ? 1 : 0.8),
    ),
    ...basicLessonPaths.map((pathname) => entry(locale, pathname, 0.7)),
    ...courseModulePaths.map((pathname) => entry(locale, pathname, 0.7)),
  ]);
}
