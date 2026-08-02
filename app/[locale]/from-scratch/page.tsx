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
        "先装好 Erlang、Elixir 和 Mix，再从 Elixir 或 Erlang 中选择一条零基础语法路线。",
    },
    home: "首页",
    heroTitle: "先学会读代码",
    heroAccent: "再走进 BEAM",
    heroDescription:
      "Elixir 和 Erlang 分开学。任选一条。每课只添几个新符号，先写完整形式，再看短写法。学完一条，两条路汇入同一条 BEAM 主线。",
    pathStat: "条独立路线",
    lessonStat: "节基础课",
    prerequisiteStat: "编程前置",
    installKicker: "先把工具放好",
    installTitle: "第 0 步：安装 Erlang / Elixir / Mix",
    installBeforeCommands: "按 macOS、Linux 或 Windows 的步骤安装。等",
    installAfterCommands: "都能回答，再从下面选择一条路线。",
    commandSeparator: "、",
    commandAnd: " 和 ",
    installAction: "查看安装步骤",
    choiceKicker: "先选一种写法",
    choiceTitle: "不必两条都学完",
    choiceDescription:
      "想先写得顺，选 Elixir。想先看清 BEAM 的原生语言，选 Erlang。学完一条就能继续；另一条以后当作对照。",
    lessons: (count: number) => count + " 课",
    startsAt: (shell: string) => "从 " + shell + " 开始",
    pathAction: "查看这条路线",
    joinTitle: "两条小路，汇入 BEAM",
    joinDescription:
      "语法学到模块就够出发。进程、消息、OTP 和监督树放在后面学。",
    joinAction: "看看汇合处",
  },
  en: {
    metadata: {
      title: "Learn Elixir and Erlang from Scratch",
      description:
        "Install Erlang, Elixir, and Mix, then choose a beginner path for either Elixir or Erlang.",
    },
    home: "Home",
    heroTitle: "Learn to read code",
    heroAccent: "then step into BEAM",
    heroDescription:
      "Learn Elixir and Erlang on separate paths. Pick either one. Each lesson adds only a few new symbols. Write the full form before reading shortcuts. Finish one path, and both roads meet on the same BEAM mainline.",
    pathStat: "independent paths",
    lessonStat: "beginner lessons",
    prerequisiteStat: "coding prerequisites",
    installKicker: "Set out your tools",
    installTitle: "Step 0: Install Erlang / Elixir / Mix",
    installBeforeCommands:
      "Follow the steps for macOS, Linux, or Windows. When",
    installAfterCommands:
      "all answer correctly, choose one of the paths below.",
    commandSeparator: ", ",
    commandAnd: ", and ",
    installAction: "View installation steps",
    choiceKicker: "Choose one way to write",
    choiceTitle: "You do not need to finish both",
    choiceDescription:
      "Choose Elixir if you want a gentle way to start writing. Choose Erlang if you want to meet BEAM's original language first. One path is enough to continue. Keep the other as a comparison for later.",
    lessons: (count: number) => count + " lessons",
    startsAt: (shell: string) => "Start in " + shell,
    pathAction: "View this path",
    joinTitle: "Two small roads meet at BEAM",
    joinDescription:
      "Once you can read modules, you are ready to move on. Processes, messages, OTP, and supervision come next.",
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
