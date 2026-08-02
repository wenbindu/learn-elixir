import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BEAM Path — Learn Erlang and Elixir",
    short_name: "BEAM Path",
    description:
      "Beginner-friendly Erlang and Elixir paths, from syntax to the BEAM, processes, OTP, and supervision trees.",
    start_url: "/",
    display: "standalone",
    background_color: "#07182d",
    theme_color: "#07182d",
    lang: "en",
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
