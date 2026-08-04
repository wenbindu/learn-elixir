import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BasicLessonStatus } from "../../../components/BasicProgress";
import { LocalizedLink } from "../../../components/LocalizedLink";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getBasicPath, getBasicPaths } from "../../../i18n/catalog";
import { isLocale, locales } from "../../../i18n/locales";
import { localeAlternates } from "../../../i18n/metadata";
import styles from "../../../from-scratch/from-scratch.module.css";

type BasicPathPageProps = {
  params: Promise<{ locale: string; language: string }>;
};

const pageCopy = {
  zh: {
    home: "首页",
    shortLessons: "节短课",
    handsOnStart: "动手起点",
    beforeStart: "出发前",
    checkShell: (shell: string) => "先确认能打开 " + shell,
    shellIntro: "在终端输入命令。看到交互提示符就够了。暂时不用建项目。",
    installAction: "还没安装？看安装步骤",
    roadmapKicker: "四段路",
    roadmapTitle: "从第一次运行，走到完整作品",
    roadmapBody: (shell: string) =>
      "每课仍然先看要做什么，再把完整例子复制到 " +
      shell +
      "。Scratch 负责敢运行，Foundation 负责独立写模块，Intermediate 处理真实输入，Project 把它们合成一个作品。",
    lessonAction: "先跑例子",
    beamBridgeKicker: "FOUNDATION 完成后",
    beamBridgeTitle: "现在已经够用，可以进入 BEAM",
    beamBridgeBody:
      "接下来有两种走法：继续学文件、测试和项目工具，或先去解决消息、超时和进程故障。两条路以后还能接上。",
    beamBridgeAction: "进入 BEAM 前置检查",
    stageLessons: (count: number) => count + " 节短课",
    stages: {
      scratch: {
        label: "SCRATCH · 试跑",
        title: "先让代码跑起来",
        description: "看懂输入和结果。完成一段 5–15 行的小任务。",
      },
      foundation: {
        label: "FOUNDATION · 基础",
        title: "自己写一个模块",
        description: "补齐集合、函数、控制流、模块和基础测试。",
      },
      intermediate: {
        label: "INTERMEDIATE · 进阶",
        title: "接住真实输入",
        description: "处理文件、错误边界、类型约定和项目工具。",
      },
      project: {
        label: "PROJECT · 作品",
        title: "把知识合成一个作品",
        description: "从需求、测试走到可运行、可打包的小程序。",
      },
    },
    afterPath: "学完以后",
    sourcesKicker: "课程依据",
    sourcesTitle: "不懂时去看原文",
    sourcesBody: "路线参考入门课程；语法细节以官方文档为准。",
  },
  en: {
    home: "Home",
    shortLessons: "short lessons",
    handsOnStart: "hands-on starting point",
    beforeStart: "Before you begin",
    checkShell: (shell: string) => "First, make sure you can open " + shell,
    shellIntro:
      "Enter the command in your terminal. Seeing the interactive prompt is enough. You do not need to create a project yet.",
    installAction: "Not installed yet? Follow the installation steps",
    roadmapKicker: "Four stages",
    roadmapTitle: "From the first run to a finished project",
    roadmapBody: (shell: string) =>
      "Each lesson still begins with a concrete task and a complete example in " +
      shell +
      ". Scratch builds confidence, Foundation builds independent modules, Intermediate handles real input, and Project combines the pieces.",
    lessonAction: "Run the example",
    beamBridgeKicker: "AFTER FOUNDATION",
    beamBridgeTitle: "You now know enough to enter the BEAM path",
    beamBridgeBody:
      "Continue with files, tests, and project tools, or switch now to messages, timeouts, and process failures. You can return to either path later.",
    beamBridgeAction: "Open the BEAM setup check",
    stageLessons: (count: number) =>
      count + (count === 1 ? " short lesson" : " short lessons"),
    stages: {
      scratch: {
        label: "SCRATCH · FIRST RUNS",
        title: "Get the code running",
        description: "Read inputs and results. Finish one 5–15 line task.",
      },
      foundation: {
        label: "FOUNDATION",
        title: "Write a module on your own",
        description: "Build fluency with collections, functions, control flow, modules, and basic tests.",
      },
      intermediate: {
        label: "INTERMEDIATE",
        title: "Handle real input",
        description: "Work with files, error boundaries, type contracts, and project tools.",
      },
      project: {
        label: "PROJECT",
        title: "Combine the pieces into a project",
        description: "Move from a small requirement and tests to a runnable, packaged program.",
      },
    },
    afterPath: "After this path",
    sourcesKicker: "Course sources",
    sourcesTitle: "Read the original when you need more",
    sourcesBody:
      "This path follows beginner courses. Check the official documentation for exact syntax details.",
  },
} as const;

const stageOrder = ["scratch", "foundation", "intermediate", "project"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBasicPaths(locale).map((path) => ({ locale, language: path.id })),
  );
}

export async function generateMetadata({
  params,
}: BasicPathPageProps): Promise<Metadata> {
  const { locale, language } = await params;
  if (!isLocale(locale)) return {};

  const path = getBasicPath(locale, language);
  if (!path) return {};

  const pathname = "/from-scratch/" + path.id;
  return {
    title: path.title,
    description: path.description,
    alternates: localeAlternates(locale, pathname),
  };
}

export default async function BasicPathPage({
  params,
}: BasicPathPageProps) {
  const { locale, language } = await params;
  if (!isLocale(locale)) notFound();

  const path = getBasicPath(locale, language);
  if (!path) notFound();

  const copy = pageCopy[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className={styles.page}>
        <section
          className={
            styles.trackHero +
            (path.id === "erlang" ? " " + styles.trackHeroErlang : "")
          }
        >
          <div className={styles.shell}>
            <div className={styles.breadcrumb}>
              <LocalizedLink href="/" locale={locale}>
                {copy.home}
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink href="/from-scratch" locale={locale}>
                From Scratch
              </LocalizedLink>
              <span>/</span>
              <strong>{path.language}</strong>
            </div>
            <div className={styles.trackHeroLead}>
              <div>
                <div className="section-kicker">{path.language} · LANGUAGE PATH</div>
                <h1>{path.title}</h1>
                <p>{path.description}</p>
              </div>
              <div className={styles.trackHeroAside}>
                <div>
                  <strong>{path.lessons.length}</strong>
                  <span>{copy.shortLessons}</span>
                </div>
                <div>
                  <strong>{path.shell}</strong>
                  <span>{copy.handsOnStart}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.trackBody}>
          <div className={styles.shell}>
            <div className={styles.startPanel}>
              <div>
                <div className="section-kicker">{copy.beforeStart}</div>
                <h2>{copy.checkShell(path.shell)}</h2>
                <p>{copy.shellIntro}</p>
                <div className={styles.startActions}>
                  <code>{path.shellCommand}</code>
                  <LocalizedLink
                    href="/learn/install-toolchain"
                    locale={locale}
                  >
                    {copy.installAction}
                  </LocalizedLink>
                </div>
              </div>
              <ul>
                {path.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sectionIntro}>
              <div>
                <div className="section-kicker">{copy.roadmapKicker}</div>
                <h2>{copy.roadmapTitle}</h2>
              </div>
              <p>{copy.roadmapBody(path.shell)}</p>
            </div>

            <div className={styles.stageRoadmap}>
              {stageOrder.map((stage, stageIndex) => {
                const lessons = path.lessons.filter(
                  (lesson) => lesson.stage === stage,
                );
                const stageCopy = copy.stages[stage];

                return (
                  <section className={styles.stageGroup} key={stage}>
                    <header className={styles.stageHeader}>
                      <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <small>{stageCopy.label}</small>
                        <h3>{stageCopy.title}</h3>
                        <p>{stageCopy.description}</p>
                      </div>
                      <strong>{copy.stageLessons(lessons.length)}</strong>
                    </header>
                    <div className={styles.lessonRoadmap}>
                      {lessons.map((lesson) => (
                        <LocalizedLink
                          className={styles.lessonCard}
                          href={
                            "/from-scratch/" + path.id + "/" + lesson.slug
                          }
                          locale={locale}
                          key={lesson.slug}
                        >
                          <div className={styles.lessonCardTop}>
                            <span>LESSON {lesson.number}</span>
                            <span>{lesson.duration}</span>
                          </div>
                          <h3>{lesson.title}</h3>
                          <p>{lesson.summary}</p>
                          <div className={styles.lessonCardFooter}>
                            <span>{copy.lessonAction} →</span>
                            <BasicLessonStatus
                              language={path.id}
                              slug={lesson.slug}
                              locale={locale}
                            />
                          </div>
                        </LocalizedLink>
                      ))}
                    </div>
                    {stage === "foundation" ? (
                      <aside className={styles.beamBridge}>
                        <div>
                          <small>{copy.beamBridgeKicker}</small>
                          <h3>{copy.beamBridgeTitle}</h3>
                          <p>{copy.beamBridgeBody}</p>
                        </div>
                        <LocalizedLink href="/learn/start-line" locale={locale}>
                          {copy.beamBridgeAction} →
                        </LocalizedLink>
                      </aside>
                    ) : null}
                  </section>
                );
              })}
            </div>

            <div className={styles.trackFooterGrid}>
              <article className={styles.bridgeCard}>
                <div className="section-kicker">{copy.afterPath}</div>
                <h2>{path.bridge.title}</h2>
                <p>{path.bridge.description}</p>
                <LocalizedLink href={path.bridge.href} locale={locale}>
                  {path.bridge.label} →
                </LocalizedLink>
              </article>
              <article className={styles.sourceCard}>
                <div className="section-kicker">{copy.sourcesKicker}</div>
                <h2>{copy.sourcesTitle}</h2>
                <p>{copy.sourcesBody}</p>
                <div>
                  {path.references.map((reference) => (
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      key={reference.href}
                    >
                      {reference.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
