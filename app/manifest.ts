import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BEAM Path — 学 Erlang 和 Elixir",
    short_name: "BEAM Path",
    description:
      "Elixir、Erlang 两条零基础语法路线。从类型和函数开始，再学习 BEAM、进程、OTP 与监督树。",
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
