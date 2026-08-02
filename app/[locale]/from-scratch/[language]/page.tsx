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
    roadmapKicker: "九步路线",
    roadmapTitle: "一课只解决一个问题",
    roadmapBeforeShell:
      "按顺序学。遇到陌生符号，不要猜着跳过。先看“符号拆解”，再把示例复制到",
    lessonAction: "开始这一课",
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
    roadmapKicker: "Nine small steps",
    roadmapTitle: "One lesson, one question",
    roadmapBeforeShell:
      "Study in order. When a symbol is new, do not guess and skip it. Read “Break down the symbols” first, then copy the example into",
    lessonAction: "Start this lesson",
    afterPath: "After this path",
    sourcesKicker: "Course sources",
    sourcesTitle: "Read the original when you need more",
    sourcesBody:
      "This path follows beginner courses. Check the official documentation for exact syntax details.",
  },
} as const;

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
                <div className="section-kicker">{path.language} · BEGINNER</div>
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
              <p>
                {copy.roadmapBeforeShell} {path.shell}.
              </p>
            </div>

            <div className={styles.lessonRoadmap}>
              {path.lessons.map((lesson) => (
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
