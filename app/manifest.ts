import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BEAM Path — 学 Erlang 和 Elixir",
    short_name: "BEAM Path",
    description: "从一段能运行的代码开始。猜结果，改代码，看输出。逐步认识 Erlang、Elixir、BEAM 和 OTP。",
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
