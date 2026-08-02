import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLink } from "../../components/LocalizedLink";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getKeywordEntries } from "../../i18n/catalog";
import { isLocale, type Locale } from "../../i18n/locales";
import { localeAlternates } from "../../i18n/metadata";
import { KeywordDictionary } from "../../keywords/KeywordDictionary";

type KeywordsPageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  zh: {
    metadata: {
      title: "Elixir + Erlang 关键字字典",
      description:
        "查询 Elixir 与 Erlang 关键字的作用、写法、分类和版本说明。",
    },
    breadcrumbHome: "首页",
    breadcrumbCurrent: "关键字字典",
    heroTitle: "不认识这个词？",
    heroTitleAccent: "来这里查。",
    heroDescription:
      "可以搜英文词，也可以搜“模式匹配”“异常”“短路”等中文解释。每项都列出分类、作用、限制和最小示例。",
    statsLabel: "关键字数量",
    elixirReserved: "Elixir 严格保留字",
    erlangReserved: "Erlang 严格保留字",
    totalReserved: "个语言保留字",
    officialCount: "按官方资料整理",
    dictionaryKicker: "可搜索字典",
    dictionaryTitle: "查作用，也看最小示例",
    dictionaryIntro: (
      <>
        页面默认显示严格保留字。要找 <code>defmodule</code>、
        <code>with</code> 或 <code>-module</code>，切换到对应分类。
      </>
    ),
    distinctionKicker: "分类说明",
    distinctionTitle: "写法相似，分类不同",
    distinctionIntro:
      "保留字、特殊形式、宏和模块属性由不同机制处理。先看作用，再记分类。",
    distinctions: [
      {
        number: "01",
        title: "语言预留的词",
        label: "严格保留字",
        description: "语言已经使用这些名字，不能再拿来给变量或函数起名。",
        example: "Elixir: when · fn · do\nErlang: case · receive · fun",
      },
      {
        number: "02",
        title: "语言内建结构",
        label: "特殊形式",
        description:
          "它们组成 Elixir 基本语法，由编译器直接处理，但多数不是严格保留字。",
        example: "case · with · receive\nalias · quote · unquote",
      },
      {
        number: "03",
        title: "常用宏和声明",
        label: "宏、属性与指令",
        description:
          "它们写起来像关键字，实际可能是宏、模块属性或预处理指令。",
        example: "defmodule · use · if\n-module · -spec · -define",
      },
    ],
    keywordListTitle: "关键字列表不是保留字",
    keywordListBody: (
      <>
        <code>[timeout: 5_000, log: true]</code> 是一种数据结构，
        中文叫“关键字列表”。它和语言预留的词没有关系。
      </>
    ),
    keywordListAction: "看看 keyword list 怎样装数据",
    sourcesKicker: "官方依据",
    sourcesTitle: "看完解释，再查原文",
    sourcesBody: (
      <>
        本页按官方资料整理。Erlang 的 <code>maybe</code> 在 OTP 25–26
        中默认关闭，从 OTP 27 起默认开启。<code>cond</code> 和
        <code>let</code> 虽然被保留，目前还没有实际语法用途。
      </>
    ),
    playgroundAction: "去 Playground 试一个词",
    sourceDescriptions: [
      "严格保留字与语法结构",
      "Elixir 内建特殊形式",
      "29 个保留字与版本说明",
      "分支、guard 与运算符",
    ],
  },
  en: {
    metadata: {
      title: "Elixir + Erlang Keyword Dictionary",
      description:
        "Look up what Elixir and Erlang keywords do, how they are written, how they are classified, and which versions support them.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Keyword dictionary",
    heroTitle: "Not sure what it means?",
    heroTitleAccent: "Look it up here.",
    heroDescription:
      "Search for a term or an idea such as pattern matching, exceptions, or short circuiting. Each entry shows its kind, purpose, limits, and a tiny example.",
    statsLabel: "Keyword counts",
    elixirReserved: "Elixir reserved words",
    erlangReserved: "Erlang reserved words",
    totalReserved: " language reserved words",
    officialCount: "Checked against official docs",
    dictionaryKicker: "Searchable dictionary",
    dictionaryTitle: "Find its job. See a tiny example.",
    dictionaryIntro: (
      <>
        Strictly reserved words appear first. Looking for{" "}
        <code>defmodule</code>, <code>with</code>, or <code>-module</code>?{" "}
        Choose the matching category.
      </>
    ),
    distinctionKicker: "Classification",
    distinctionTitle: "Similar shape. Different kind.",
    distinctionIntro:
      "Reserved words, special forms, macros, and module attributes follow different rules. Learn the job first, then remember the category.",
    distinctions: [
      {
        number: "01",
        title: "Words reserved by the language",
        label: "Strictly reserved",
        description:
          "The language already uses these names, so an ordinary variable or function cannot reuse them.",
        example: "Elixir: when · fn · do\nErlang: case · receive · fun",
      },
      {
        number: "02",
        title: "Built-in language constructs",
        label: "Special forms",
        description:
          "They form Elixir's basic syntax and are handled directly by the compiler, but most are not strictly reserved words.",
        example: "case · with · receive\nalias · quote · unquote",
      },
      {
        number: "03",
        title: "Common macros and declarations",
        label: "Macros, attributes, directives",
        description:
          "They look like keywords, but may really be macros, module attributes, or preprocessor directives.",
        example: "defmodule · use · if\n-module · -spec · -define",
      },
    ],
    keywordListTitle: "A keyword list is not a list of reserved words",
    keywordListBody: (
      <>
        <code>[timeout: 5_000, log: true]</code> is a data structure called a
        keyword list. It has nothing to do with words reserved by a language.
      </>
    ),
    keywordListAction: "See how keyword lists hold data",
    sourcesKicker: "Official sources",
    sourcesTitle: "Read this guide, then open the originals",
    sourcesBody: (
      <>
        This page follows the official references. Erlang <code>maybe</code> was
        disabled by default in OTP 25–26 and enabled by default from OTP 27.{" "}
        <code>cond</code> and <code>let</code> are reserved but still have no
        active grammar role.
      </>
    ),
    playgroundAction: "Try a word in the Playground",
    sourceDescriptions: [
      "Strictly reserved words and syntax",
      "Elixir's built-in special forms",
      "29 reserved words and version notes",
      "Branches, guards, and operators",
    ],
  },
} satisfies Record<Locale, object>;

const sourceLinks = [
  {
    language: "Elixir",
    title: "Syntax reference",
    href: "https://hexdocs.pm/elixir/syntax-reference.html#reserved-words",
  },
  {
    language: "Elixir",
    title: "Kernel.SpecialForms",
    href: "https://hexdocs.pm/elixir/Kernel.SpecialForms.html",
  },
  {
    language: "Erlang/OTP",
    title: "Reference manual",
    href: "https://www.erlang.org/doc/system/reference_manual.html",
  },
  {
    language: "Erlang/OTP",
    title: "Expressions",
    href: "https://www.erlang.org/doc/system/expressions.html",
  },
] as const;

export async function generateMetadata({
  params,
}: KeywordsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageCopy[locale].metadata;
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates(locale, "/keywords"),
  };
}

export default async function KeywordsPage({ params }: KeywordsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = pageCopy[locale];
  const entries = getKeywordEntries(locale);

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className="keywords-page">
        <section className="keywords-hero">
          <div className="keywords-grid-overlay" aria-hidden="true" />
          <div className="keywords-hero-inner">
            <div className="playground-breadcrumb">
              <LocalizedLink href="/" locale={locale}>
                {copy.breadcrumbHome}
              </LocalizedLink>
              <span>/</span>
              <strong>{copy.breadcrumbCurrent}</strong>
            </div>

            <div className="keywords-hero-layout">
              <div>
                <div className="eyebrow eyebrow--dark">
                  <span />
                  ELIXIR + ERLANG LEXICON
                </div>
                <h1>
                  {copy.heroTitle}
                  <span>{copy.heroTitleAccent}</span>
                </h1>
                <p>{copy.heroDescription}</p>
              </div>

              <aside className="keywords-hero-stats" aria-label={copy.statsLabel}>
                <div>
                  <span>EX</span>
                  <strong>15</strong>
                  <small>{copy.elixirReserved}</small>
                </div>
                <div>
                  <span>ERL</span>
                  <strong>29</strong>
                  <small>{copy.erlangReserved}</small>
                </div>
                <p>
                  <b>44</b>
                  {copy.totalReserved}
                  <small>{copy.officialCount}</small>
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="keyword-dictionary-section"
          aria-labelledby="keyword-dictionary-title"
        >
          <div className="keyword-dictionary-shell">
            <div className="keyword-dictionary-intro">
              <div>
                <span className="section-kicker">{copy.dictionaryKicker}</span>
                <h2 id="keyword-dictionary-title">{copy.dictionaryTitle}</h2>
              </div>
              <p>{copy.dictionaryIntro}</p>
            </div>
            <KeywordDictionary locale={locale} entries={entries} />
          </div>
        </section>

        <section className="keyword-distinction-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">{copy.distinctionKicker}</span>
                <h2>{copy.distinctionTitle}</h2>
              </div>
              <p>{copy.distinctionIntro}</p>
            </div>

            <div className="keyword-distinction-grid">
              {copy.distinctions.map((item) => (
                <article key={item.number}>
                  <div>
                    <span>{item.number}</span>
                    <small>{item.label}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <pre>
                    <code>{item.example}</code>
                  </pre>
                </article>
              ))}
            </div>

            <aside className="keyword-list-callout">
              <span aria-hidden="true">≠</span>
              <div>
                <strong>{copy.keywordListTitle}</strong>
                <p>{copy.keywordListBody}</p>
              </div>
              <LocalizedLink
                href="/learn/elixir-foundations"
                locale={locale}
              >
                {copy.keywordListAction}
                <span aria-hidden="true">→</span>
              </LocalizedLink>
            </aside>
          </div>
        </section>

        <section className="keyword-sources-section">
          <div className="section-shell">
            <div className="keyword-sources-copy">
              <span className="section-kicker">{copy.sourcesKicker}</span>
              <h2>{copy.sourcesTitle}</h2>
              <p>{copy.sourcesBody}</p>
              <LocalizedLink
                className="button button--dark"
                href="/playground"
                locale={locale}
              >
                {copy.playgroundAction}
                <span aria-hidden="true">→</span>
              </LocalizedLink>
            </div>

            <div className="keyword-source-links">
              {sourceLinks.map((source, index) => (
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  key={source.href}
                >
                  <span>{source.language}</span>
                  <strong>{source.title}</strong>
                  <small>{copy.sourceDescriptions[index]}</small>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
