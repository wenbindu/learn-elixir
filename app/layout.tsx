import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteTitle = "BEAM Path — Erlang + Elixir 学习路径";
const siteDescription =
  "一套从零到 OTP 实战的中文 Erlang + Elixir 交互式教程。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
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
      "BEAM",
      "OTP",
      "GenServer",
      "Supervisor",
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
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "BEAM Path — Erlang + Elixir 学习路径",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07182d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
