import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ElixirPlayground } from "../../components/ElixirPlayground";
import { LocalizedLink } from "../../components/LocalizedLink";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { isLocale } from "../../i18n/locales";
import { localeAlternates } from "../../i18n/metadata";

const pageCopy = {
  zh: {
    title: "Elixir 在线 Playground",
    description: "不用安装 Elixir，也能改代码、看输出，练习管道、模式匹配和进程消息。",
    home: "首页",
    breadcrumb: "在线练习",
    heroLine1: "写一段，",
    heroLine2: "马上运行。",
    heroBody: "不用先安装 Elixir。选一个练习，改几行，点 Run。看输出，也看报错。",
    tagsLabel: "Playground 特点",
    tags: ["无需登录", "可编辑", "即时输出", "安全试验区"],
    runnable: "可运行练习",
    workspaceTitle: "选一个练习，改一处",
    noticeLabel: "第三方运行环境说明",
    noticeTitle: "代码会交给 Codapi 运行",
    noticeBody: "Codapi 是第三方服务。点击 Run 后，它会收到这段代码。不要放密码、API Key、个人信息或未公开代码。如果页面打不开，请使用“在新窗口打开”。",
    method: "练习方法",
    methodTitle: "运行后，问为什么",
    methodBody: "这里适合试短代码。完整项目仍要放在本地，用 Mix 管理文件、依赖和测试。分布式节点和 OTP 系统也要在本地运行。",
    steps: [
      ["先猜结果", "运行前写下你猜的输出。若结果不同，看看差在哪。"],
      ["只改一处", "改一个输入、模式或 timeout，然后运行。这样容易看出变化从哪来。"],
      ["带回本地", "把跑通的代码放进 IEx 或 Mix 项目，再加一个测试。"],
    ],
    nextLabel: "想在自己电脑上继续吗？",
    nextTitle: "用 Mix 建项目，把这段代码带回去。",
    nextAction: "安装本地工具",
  },
  en: {
    title: "Elixir Online Playground",
    description: "Edit and run Elixir without installing it. Practice pipelines, pattern matching, processes, and messages.",
    home: "Home",
    breadcrumb: "Playground",
    heroLine1: "Write a little.",
    heroLine2: "Run it now.",
    heroBody: "You do not need to install Elixir first. Choose an exercise, change a few lines, and press Run. Read both the output and the errors.",
    tagsLabel: "Playground features",
    tags: ["No sign-in", "Editable", "Immediate output", "Safe sandbox"],
    runnable: "Runnable exercises",
    workspaceTitle: "Choose one and change one thing",
    noticeLabel: "Third-party runner notice",
    noticeTitle: "Codapi runs this code",
    noticeBody: "Codapi is a third-party service. It receives the code when you press Run. Do not enter passwords, API keys, personal information, or private code. If the embed does not load, use “Open in a new window.”",
    method: "How to practice",
    methodTitle: "After it runs, ask why",
    methodBody: "This page is for short experiments. Keep full projects on your computer, where Mix can manage files, dependencies, and tests. Distributed nodes and OTP systems also belong in a local project.",
    steps: [
      ["Predict first", "Write down the output you expect. If the result differs, find the first place it changed."],
      ["Change one thing", "Change one input, pattern, or timeout, then run it. A small change is easier to understand."],
      ["Take it home", "Move working code into IEx or a Mix project, then add one test."],
    ],
    nextLabel: "Want to keep going on your computer?",
    nextTitle: "Create a Mix project and take this code with you.",
    nextAction: "Install local tools",
  },
} as const;

type PlaygroundPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PlaygroundPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = pageCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates(locale, "/playground"),
  };
}

export default async function PlaygroundPage({ params }: PlaygroundPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = pageCopy[locale];

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className="playground-page">
        <section className="playground-hero">
          <div className="playground-grid-overlay" aria-hidden="true" />
          <div className="playground-hero-inner">
            <div className="playground-breadcrumb">
              <LocalizedLink href="/" locale={locale}>{copy.home}</LocalizedLink>
              <span>/</span>
              <strong>{copy.breadcrumb}</strong>
            </div>

            <div className="eyebrow eyebrow--dark">
              <span />
              ELIXIR PLAYGROUND
            </div>
            <h1>
              {copy.heroLine1}
              <span>{copy.heroLine2}</span>
            </h1>
            <p>{copy.heroBody}</p>
            <div className="playground-hero-tags" aria-label={copy.tagsLabel}>
              {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </section>

        <section className="playground-workspace" aria-labelledby="playground-workspace-title">
          <div className="playground-shell">
            <div className="playground-shell-header">
              <div>
                <span className="section-kicker">{copy.runnable}</span>
                <h2 id="playground-workspace-title">{copy.workspaceTitle}</h2>
              </div>
              <a
                className="playground-provider"
                href="https://codapi.org/elixir/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="live-dot" />
                Powered by Codapi
                <b aria-hidden="true">↗</b>
              </a>
            </div>

            <ElixirPlayground locale={locale} />

            <aside className="playground-notice" aria-label={copy.noticeLabel}>
              <span aria-hidden="true">!</span>
              <div>
                <strong>{copy.noticeTitle}</strong>
                <p>{copy.noticeBody}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="playground-guide">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">{copy.method}</span>
                <h2>{copy.methodTitle}</h2>
              </div>
              <p>{copy.methodBody}</p>
            </div>

            <div className="playground-practice-grid">
              {copy.steps.map(([title, description], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className="playground-next-step">
              <div>
                <span>{copy.nextLabel}</span>
                <strong>{copy.nextTitle}</strong>
              </div>
              <LocalizedLink
                className="button button--dark"
                href="/learn/install-toolchain"
                locale={locale}
              >
                {copy.nextAction}
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
