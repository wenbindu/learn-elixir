import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BEAM Path — 一起学 Erlang 与 Elixir",
    short_name: "BEAM Path",
    description: "从第一段能运行的代码开始，边猜、边改、边观察，一起认识 Erlang、Elixir、BEAM 和 OTP。",
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
