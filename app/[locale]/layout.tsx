import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isLocale, locales, localizeHref } from "../i18n/locales";
import { localeAlternates, siteCopy } from "../i18n/metadata";
import "../globals.css";

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";
const siteUrl = deploymentHost.startsWith("http")
  ? deploymentHost
  : `https://${deploymentHost}`;
const themeBootstrapScript = `
  (() => {
    const root = document.documentElement;
    let theme = "light";

    try {
      const stored = window.localStorage.getItem("beam-path-theme");
      if (stored === "light" || stored === "dark") {
        theme = stored;
      }
    } catch {}

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  })();
`;

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: candidate } = await params;
  if (!isLocale(candidate)) return {};

  const copy = siteCopy[candidate];
  const chineseImage = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: copy.title,
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: `%s · BEAM Path`,
    },
    description: copy.description,
    applicationName: "BEAM Path",
    authors: [{ name: "BEAM Path" }],
    keywords: [...copy.keywords],
    alternates: localeAlternates(candidate),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "64x64" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: copy.ogLocale,
      alternateLocale: candidate === "zh" ? ["en_US"] : ["zh_CN"],
      title: copy.title,
      description: copy.description,
      url: localizeHref(candidate, "/"),
      images: candidate === "zh" ? [chineseImage] : undefined,
    },
    twitter: {
      card: candidate === "zh" ? "summary_large_image" : "summary",
      title: copy.title,
      description: copy.description,
      images: candidate === "zh" ? ["/og.png"] : undefined,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2eb" },
    { media: "(prefers-color-scheme: dark)", color: "#07182d" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
