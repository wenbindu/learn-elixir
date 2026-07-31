import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteTitle = "BEAM Path — 学 Erlang 和 Elixir";
const siteDescription =
  "Elixir、Erlang 两条零基础语法路线。从类型和函数开始，再学习 BEAM、进程、OTP 与监督树。";
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
    const systemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    let preference = "system";

    try {
      const stored = window.localStorage.getItem("beam-path-theme");
      if (stored === "light" || stored === "dark" || stored === "system") {
        preference = stored;
      }
    } catch {}

    const resolved = preference === "system" ? systemTheme() : preference;
    root.dataset.theme = resolved;
    root.dataset.themePreference = preference;
    root.style.colorScheme = resolved;
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · BEAM Path",
  },
  description: siteDescription,
  applicationName: "BEAM Path",
  authors: [{ name: "BEAM Path" }],
  keywords: [
    "Elixir 教程",
    "Erlang 教程",
    "Elixir 基础语法",
    "Erlang 基础语法",
    "BEAM",
    "OTP",
    "GenServer",
    "Supervisor",
    "Elixir 关键字",
    "Erlang 关键字",
  ],
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
    locale: "zh_CN",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BEAM Path — 学 Erlang 和 Elixir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2eb" },
    { media: "(prefers-color-scheme: dark)", color: "#07182d" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-theme="system"
      data-theme-preference="system"
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
