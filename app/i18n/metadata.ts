import type { Metadata } from "next";
import { localizeHref, type Locale } from "./locales";

export const siteCopy = {
  zh: {
    title: "BEAM Path — 学 Erlang 和 Elixir",
    description:
      "Elixir、Erlang 两条零基础语法路线。从类型和函数开始，再学习 BEAM、进程、OTP 与监督树。",
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
    ogLocale: "zh_CN",
  },
  en: {
    title: "BEAM Path — Learn Erlang and Elixir",
    description:
      "Two beginner paths for Elixir and Erlang. Start with values and functions, then learn the BEAM, processes, OTP, and supervision trees.",
    keywords: [
      "Elixir tutorial",
      "Erlang tutorial",
      "learn Elixir",
      "learn Erlang",
      "BEAM VM",
      "OTP",
      "GenServer",
      "Supervisor",
      "Elixir keywords",
      "Erlang keywords",
    ],
    ogLocale: "en_US",
  },
} as const;

export function localeAlternates(locale: Locale, pathname = "/") {
  return {
    canonical: localizeHref(locale, pathname),
    languages: {
      "zh-CN": localizeHref("zh", pathname),
      en: localizeHref("en", pathname),
      "x-default": pathname,
    },
  } satisfies Metadata["alternates"];
}
