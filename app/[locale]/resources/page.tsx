import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLink } from "../../components/LocalizedLink";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { isLocale } from "../../i18n/locales";
import { localeAlternates } from "../../i18n/metadata";
import { getResourceDirectory } from "../../resource-data";
import { ResourceDirectoryBrowser } from "../../resources/ResourceDirectoryBrowser";

const pageCopy = {
  zh: {
    title: "Elixir + Erlang 学习工具箱",
    description: "汇总 Elixir、Erlang、BEAM 与 OTP 的官方文档、教程、工具、社区和在线练习。",
    home: "首页",
    breadcrumb: "学习工具箱",
    heroLine1: "找资料，",
    heroLine2: "从这里开始。",
    heroBody: "查语法时看官方文档，理解概念时看教程，练习时打开题库。遇到具体问题，也可以搜索社区讨论。",
    statsLabel: "资源目录统计",
    links: "学习资源",
    groups: "用途分类",
    featuredSuffix: "个首页常用入口",
    sameSource: "与首页使用同一份配置",
    directory: "可搜索目录",
    directoryHelp: "可以搜网站名称，也可以搜“安装”或“练习”。不知道名称时，直接按分类查看。",
    how: "如何使用",
    howTitle: "按问题选择资料",
    howBody: "先保留报错和最短代码，再查对应资料。问题越具体，越容易找到答案。",
    steps: [
      ["先重现问题", "保留完整报错，并写出能重现问题的最短代码。"],
      ["再查文档或教程", "先核对版本、API 和限制，再把示例放进 IEx 或 erl 运行。"],
      ["带上线索提问", "说明报错、最短代码，以及已经试过哪些方法。"],
    ],
    installTitle: "还没安装 Elixir？",
    installBody: "按电脑系统装好 Erlang 与 Elixir，再检查 IEx、erl 和 Mix。",
    installAction: "打开安装准备",
  },
  en: {
    title: "Elixir + Erlang Learning Resources",
    description: "Official docs, courses, tools, communities, and practice sites for Elixir, Erlang, the BEAM, and OTP.",
    home: "Home",
    breadcrumb: "Resources",
    heroLine1: "Need a source?",
    heroLine2: "Start here.",
    heroBody: "Use official docs for exact syntax, tutorials for a slower explanation, and exercise sites for practice. Search community discussions when you have a specific problem.",
    statsLabel: "Resource directory summary",
    links: "learning links",
    groups: "useful groups",
    featuredSuffix: " common starting points",
    sameSource: "Shared with the home page",
    directory: "Searchable directory",
    directoryHelp: "Search by site name or words such as “install” and “practice.” If you do not know a name, browse by category.",
    how: "How to use it",
    howTitle: "Choose a source for the problem",
    howBody: "Keep the full error and the shortest code that shows it. A precise question is easier to answer.",
    steps: [
      ["Reproduce it first", "Keep the full error and write the smallest piece of code that still causes it."],
      ["Check docs or a tutorial", "Check the version, API, and limits. Then run the example in IEx or erl."],
      ["Ask with useful clues", "Share the error, the short example, and what you have already tried."],
    ],
    installTitle: "Elixir is not installed yet?",
    installBody: "Install Erlang and Elixir for your operating system, then check IEx, erl, and Mix.",
    installAction: "Open the install guide",
  },
} as const;

type ResourcesPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = pageCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates(locale, "/resources"),
  };
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = pageCopy[locale];
  const directory = await getResourceDirectory(locale);
  const featuredCount = directory.resources.filter((resource) => resource.featured).length;

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className="resources-page">
        <section className="resources-page-hero">
          <div className="resources-page-grid-overlay" aria-hidden="true" />
          <div className="resources-page-hero-inner">
            <div className="playground-breadcrumb">
              <LocalizedLink href="/" locale={locale}>{copy.home}</LocalizedLink>
              <span>/</span>
              <strong>{copy.breadcrumb}</strong>
            </div>

            <div className="resources-page-hero-layout">
              <div>
                <div className="eyebrow eyebrow--dark">
                  <span />
                  BEAM RESOURCE DIRECTORY
                </div>
                <h1>
                  {copy.heroLine1}
                  <span>{copy.heroLine2}</span>
                </h1>
                <p>{copy.heroBody}</p>
              </div>

              <aside className="resources-page-hero-stats" aria-label={copy.statsLabel}>
                <div>
                  <span>LINKS</span>
                  <strong>{directory.resources.length}</strong>
                  <small>{copy.links}</small>
                </div>
                <div>
                  <span>GROUPS</span>
                  <strong>{directory.groups.length}</strong>
                  <small>{copy.groups}</small>
                </div>
                <p>
                  <b>{featuredCount}</b>
                  {copy.featuredSuffix}
                  <small>{copy.sameSource}</small>
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="resource-directory-section" aria-labelledby="resource-directory-title">
          <div className="resource-directory-shell">
            <div className="resource-directory-intro">
              <div>
                <span className="section-kicker">{copy.directory}</span>
                <h2 id="resource-directory-title">{directory.title}</h2>
              </div>
              <p>{copy.directoryHelp}</p>
            </div>
            <ResourceDirectoryBrowser
              groups={directory.groups}
              resources={directory.resources}
              locale={locale}
            />
          </div>
        </section>

        <section className="resource-usage-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">{copy.how}</span>
                <h2>{copy.howTitle}</h2>
              </div>
              <p>{copy.howBody}</p>
            </div>

            <div className="resource-usage-grid">
              {copy.steps.map(([title, body], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>

            <div className="resource-usage-cta">
              <div>
                <strong>{copy.installTitle}</strong>
                <p>{copy.installBody}</p>
              </div>
              <LocalizedLink
                className="button button--dark"
                href="/learn/install-toolchain"
                locale={locale}
              >
                {copy.installAction}
                <span aria-hidden="true">→</span>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
