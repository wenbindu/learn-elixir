import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLink } from "../../components/LocalizedLink";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getBasicPaths, getBasicPathStats } from "../../i18n/catalog";
import { isLocale, locales } from "../../i18n/locales";
import { localeAlternates } from "../../i18n/metadata";
import styles from "../../from-scratch/from-scratch.module.css";

type FromScratchPageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  zh: {
    metadata: {
      title: "从零学习 Elixir 与 Erlang",
      description:
        "先装好 Erlang、Elixir 和 Mix，再选择一条包含 Scratch、Foundation、Intermediate 与 Project 的完整语言路线。",
    },
    home: "首页",
    heroTitle: "先跑一个小例子",
    heroAccent: "再读懂它",
    heroDescription:
      "Elixir 和 Erlang 任选一条。每条 31 节，分成试跑、基础、进阶和作品。每课先跑例子，再拆符号、改输入。完成 Foundation 就能转入 BEAM，也能继续把单语言项目做完。",
    pathStat: "条独立路线",
    lessonStat: "节语言短课",
    prerequisiteStat: "编程前置",
    installKicker: "先把工具放好",
    installTitle: "第 0 步：安装 Erlang / Elixir / Mix",
    installBeforeCommands: "按 macOS、Linux 或 Windows 的步骤安装。等",
    installAfterCommands: "都能运行，再从下面选择一条路线。",
    commandSeparator: "、",
    commandAnd: " 和 ",
    installAction: "查看安装步骤",
    choiceKicker: "先选一种写法",
    choiceTitle: "不必两条都学完",
    choiceDescription:
      "想先写得顺，选 Elixir。想先看清 BEAM 的原生语言，选 Erlang。只需选一条认真走；不要求两门同时学。",
    lessons: (count: number) => count + " 课",
    startsAt: (shell: string) => "从 " + shell + " 开始",
    pathAction: "查看这条路线",
    joinTitle: "两条小路，汇入 BEAM",
    joinDescription:
      "完成任意一门语言的 Foundation 就够出发。进程、消息、OTP 和监督树放在 BEAM 主线。",
    joinAction: "看看汇合处",
  },
  en: {
    metadata: {
      title: "Learn Elixir and Erlang from Scratch",
      description:
        "Install Erlang, Elixir, and Mix, then choose a complete Scratch, Foundation, Intermediate, and Project path in either language.",
    },
    home: "Home",
    heroTitle: "Run one small example",
    heroAccent: "then make sense of it",
    heroDescription:
      "Choose Elixir or Erlang. Each path has 31 short lessons across Scratch, Foundation, Intermediate, and Project. Run the example first, then unpack the syntax and change an input. Finish Foundation to enter the BEAM path, or continue to the single-language project.",
    pathStat: "independent paths",
    lessonStat: "language lessons",
    prerequisiteStat: "coding prerequisites",
    installKicker: "Get the tools ready",
    installTitle: "Step 0: Install Erlang / Elixir / Mix",
    installBeforeCommands:
      "Follow the steps for macOS, Linux, or Windows. When",
    installAfterCommands:
      "run successfully, choose one of the paths below.",
    commandSeparator: ", ",
    commandAnd: ", and ",
    installAction: "View installation steps",
    choiceKicker: "Choose one way to write",
    choiceTitle: "You do not need to finish both",
    choiceDescription:
      "Choose Elixir for a gentler writing experience. Choose Erlang to meet BEAM's original language first. Study one path carefully; you do not need to learn both at once.",
    lessons: (count: number) => count + " lessons",
    startsAt: (shell: string) => "Start in " + shell,
    pathAction: "View this path",
    joinTitle: "Two small roads meet at BEAM",
    joinDescription:
      "Finish Foundation in either language and you are ready. Processes, messages, OTP, and supervision stay on the BEAM path.",
    joinAction: "See where the paths meet",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: FromScratchPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageCopy[locale].metadata;
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates(locale, "/from-scratch"),
  };
}

export default async function FromScratchPage({
  params,
}: FromScratchPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = pageCopy[locale];
  const basicPaths = getBasicPaths(locale);
  const basicPathStats = getBasicPathStats(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className={styles.page}>
        <section className={styles.overviewHero}>
          <div className={styles.shell}>
            <div className={styles.breadcrumb}>
              <LocalizedLink href="/" locale={locale}>
                {copy.home}
              </LocalizedLink>
              <span>/</span>
              <strong>From Scratch</strong>
            </div>
            <div className="section-kicker">FROM SCRATCH</div>
            <h1>
              {copy.heroTitle}
              <span>{copy.heroAccent}</span>
            </h1>
            <p>{copy.heroDescription}</p>
            <div className={styles.heroStats}>
              <div>
                <strong>{basicPathStats.paths}</strong>
                <span>{copy.pathStat}</span>
              </div>
              <div>
                <strong>{basicPathStats.lessons}</strong>
                <span>{copy.lessonStat}</span>
              </div>
              <div>
                <strong>0</strong>
                <span>{copy.prerequisiteStat}</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.installStepSection}
          aria-labelledby="install-step-title"
        >
          <div className={styles.shell}>
            <LocalizedLink
              className={styles.installStepCard}
              href="/learn/install-toolchain"
              locale={locale}
            >
              <div className={styles.installStepIndex} aria-hidden="true">
                <span>STEP</span>
                <strong>00</strong>
              </div>
              <div className={styles.installStepCopy}>
                <div className="section-kicker">{copy.installKicker}</div>
                <h2 id="install-step-title">{copy.installTitle}</h2>
                <p>
                  {copy.installBeforeCommands} <code>erl</code>
                  {copy.commandSeparator}
                  <code>elixir</code>
                  {copy.commandAnd}
                  <code>mix</code>{" "}
                  {copy.installAfterCommands}
                </p>
              </div>
              <div className={styles.installStepAction}>
                <span>{copy.installAction}</span>
                <b aria-hidden="true">→</b>
              </div>
            </LocalizedLink>
          </div>
        </section>

        <section className={styles.pathChoiceSection}>
          <div className={styles.shell}>
            <div className={styles.sectionIntro}>
              <div>
                <div className="section-kicker">{copy.choiceKicker}</div>
                <h2>{copy.choiceTitle}</h2>
              </div>
              <p>{copy.choiceDescription}</p>
            </div>

            <div className={styles.pathGrid}>
              {basicPaths.map((path, index) => (
                <LocalizedLink
                  className={
                    styles.pathCard +
                    " " +
                    (path.id === "elixir"
                      ? styles.pathCardElixir
                      : styles.pathCardErlang)
                  }
                  href={"/from-scratch/" + path.id}
                  locale={locale}
                  key={path.id}
                >
                  <div className={styles.pathCardTop}>
                    <span>PATH {String(index + 1).padStart(2, "0")}</span>
                    <span
                      className={
                        styles.languageBadge +
                        " " +
                        (path.id === "elixir"
                          ? styles.languageBadgeElixir
                          : styles.languageBadgeErlang)
                      }
                    >
                      {path.language}
                    </span>
                  </div>
                  <h3>{path.title}</h3>
                  <strong>{path.subtitle}</strong>
                  <p>{path.description}</p>
                  <div className={styles.pathCardMeta}>
                    <span>{copy.lessons(path.lessons.length)}</span>
                    <span>{copy.startsAt(path.shell)}</span>
                  </div>
                  <div className={styles.pathCardLink}>
                    {copy.pathAction}
                    <span aria-hidden="true">→</span>
                  </div>
                </LocalizedLink>
              ))}
            </div>

            <div className={styles.joinStrip}>
              <span aria-hidden="true">VM</span>
              <div>
                <strong>{copy.joinTitle}</strong>
                <p>{copy.joinDescription}</p>
              </div>
              <LocalizedLink href="/learn/start-line" locale={locale}>
                {copy.joinAction} →
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
