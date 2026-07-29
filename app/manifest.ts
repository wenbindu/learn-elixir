import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BEAM Path — Erlang + Elixir 学习路径",
    short_name: "BEAM Path",
    description: "从零到 OTP 实战的中文 Erlang + Elixir 交互式教程。",
    start_url: "/",
    display: "standalone",
    background_color: "#07182d",
    theme_color: "#07182d",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
