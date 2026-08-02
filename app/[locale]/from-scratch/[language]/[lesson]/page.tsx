import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BasicProgressButton } from "../../../../components/BasicProgress";
import { CopyBlock } from "../../../../components/CopyBlock";
import { InlineCodeText } from "../../../../components/InlineCodeText";
import { LocalizedLink } from "../../../../components/LocalizedLink";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import {
  getAdjacentBasicLessons,
  getBasicLesson,
  getBasicPath,
  getBasicPaths,
} from "../../../../i18n/catalog";
import { isLocale, locales } from "../../../../i18n/locales";
import { localeAlternates } from "../../../../i18n/metadata";
import styles from "../../../../from-scratch/from-scratch.module.css";

type BasicLessonPageProps = {
  params: Promise<{ locale: string; language: string; lesson: string }>;
};

const pageCopy = {
  zh: {
    sidebarLabel: (language: string) => language + " 基础目录",
    pathSummary: (count: number, shell: string) =>
      count + " 课 · 从 " + shell + " 开始",
    mobileContents: (title: string, number: string) =>
      title + " · 第 " + number + " 课（展开目录）",
    home: "首页",
    lessonNumber: (number: string) => "第 " + number + " 课",
    goal: "这一课只做一件事",
    plainKicker: "先听明白",
    plainTitle: "它到底是什么",
    conceptMany: "先分成六类",
    conceptFew: "先认三个词",
    conceptTitle: "够用就好",
    symbolsKicker: "符号拆解",
    symbolsTitle: "一段一段读",
    exampleKicker: "先猜，再运行",
    outputTitle: "运行后对照",
    stepsKicker: "按行读",
    stepsTitle: "不要一口吞下整段",
    practiceKicker: "轮到你改一处",
    practiceTitle: "先别看答案",
    starterLabel: "练习起点",
    expectedLabel: "目标结果：",
    hintSummary: "卡住了，再看提示",
    answerSummary: "运行过以后，再看一种答案",
    answerLabel: "一种答案",
    checkPrefix: "想一想：",
    takeawayKicker: "带走",
    takeawayTitle: "记住三句",
    sources: "这条路线参考",
    completionLabel: "本课结束",
    completionBody: "代码也跑过一次，就把这一课收好。",
    paginationLabel: "相邻基础课",
    previous: "← 上一课",
    directory: "← 路线目录",
    next: "下一课 →",
    mainline: "进入 BEAM 主线 →",
  },
  en: {
    sidebarLabel: (language: string) => language + " basics contents",
    pathSummary: (count: number, shell: string) =>
      count + " lessons · Start in " + shell,
    mobileContents: (title: string, number: string) =>
      title + " · Lesson " + number + " (open contents)",
    home: "Home",
    lessonNumber: (number: string) => "Lesson " + number,
    goal: "One job for this lesson",
    plainKicker: "First, make it clear",
    plainTitle: "What is it?",
    conceptMany: "Meet six kinds",
    conceptFew: "Meet three words",
    conceptTitle: "Learn only what you need",
    symbolsKicker: "Break down the symbols",
    symbolsTitle: "Read one piece at a time",
    exampleKicker: "Guess, then run",
    outputTitle: "Compare after running",
    stepsKicker: "Read line by line",
    stepsTitle: "Take the code one line at a time",
    practiceKicker: "Now change one thing",
    practiceTitle: "Do not peek at the answer yet",
    starterLabel: "Practice starting point",
    expectedLabel: "Target result:",
    hintSummary: "Stuck? Read one hint",
    answerSummary: "After you run it, see one answer",
    answerLabel: "One answer",
    checkPrefix: "Think about it: ",
    takeawayKicker: "Take with you",
    takeawayTitle: "Remember these three lines",
    sources: "Sources for this path",
    completionLabel: "Lesson complete",
    completionBody: "Run the code once, then mark this lesson as done.",
    paginationLabel: "Nearby beginner lessons",
    previous: "← Previous lesson",
    directory: "← Path contents",
    next: "Next lesson →",
    mainline: "Enter the BEAM mainline →",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBasicPaths(locale).flatMap((path) =>
      path.lessons.map((lesson) => ({
        locale,
        language: path.id,
        lesson: lesson.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: BasicLessonPageProps): Promise<Metadata> {
  const { locale, language, lesson: slug } = await params;
  if (!isLocale(locale)) return {};

  const path = getBasicPath(locale, language);
  const lesson = path ? getBasicLesson(path, slug) : undefined;
  if (!path || !lesson) return {};

  const pathname = "/from-scratch/" + path.id + "/" + lesson.slug;
  return {
    title: lesson.title + " · " + path.shortTitle,
    description: lesson.summary,
    alternates: localeAlternates(locale, pathname),
  };
}

export default async function BasicLessonPage({
  params,
}: BasicLessonPageProps) {
  const { locale, language, lesson: slug } = await params;
  if (!isLocale(locale)) notFound();

  const path = getBasicPath(locale, language);
  if (!path) notFound();

  const lesson = getBasicLesson(path, slug);
  if (!lesson) notFound();

  const copy = pageCopy[locale];
  const { previous, next } = getAdjacentBasicLessons(path, lesson.slug);

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className={styles.lessonPage}>
        <div className={styles.lessonLayout}>
          <aside
            className={styles.lessonSidebar}
            aria-label={copy.sidebarLabel(path.language)}
          >
            <div className={styles.sidebarHead}>
              <span>FROM SCRATCH</span>
              <strong>{path.shortTitle}</strong>
              <small>{copy.pathSummary(path.lessons.length, path.shell)}</small>
            </div>
            <nav>
              {path.lessons.map((item) => (
                <LocalizedLink
                  href={
                    "/from-scratch/" + path.id + "/" + item.slug
                  }
                  locale={locale}
                  data-active={item.slug === lesson.slug}
                  aria-current={item.slug === lesson.slug ? "page" : undefined}
                  key={item.slug}
                >
                  <b>{item.number}</b>
                  <span>{item.title}</span>
                </LocalizedLink>
              ))}
            </nav>
          </aside>

          <article className={styles.lessonArticle}>
            <details className={styles.mobilePathNav}>
              <summary>
                {copy.mobileContents(path.shortTitle, lesson.number)}
              </summary>
              <div>
                {path.lessons.map((item) => (
                  <LocalizedLink
                    href={
                      "/from-scratch/" + path.id + "/" + item.slug
                    }
                    locale={locale}
                    data-active={item.slug === lesson.slug}
                    aria-current={
                      item.slug === lesson.slug ? "page" : undefined
                    }
                    key={item.slug}
                  >
                    {item.number} · {item.title}
                  </LocalizedLink>
                ))}
              </div>
            </details>

            <div className={styles.lessonBreadcrumb}>
              <LocalizedLink href="/" locale={locale}>
                {copy.home}
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink href="/from-scratch" locale={locale}>
                From Scratch
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink
                href={"/from-scratch/" + path.id}
                locale={locale}
              >
                {path.language}
              </LocalizedLink>
              <span>/</span>
              <strong>{copy.lessonNumber(lesson.number)}</strong>
            </div>

            <header
              className={
                styles.lessonHeader +
                (path.id === "erlang"
                  ? " " + styles.lessonHeaderErlang
                  : "")
              }
            >
              <div className={styles.lessonHeaderTop}>
                <span>
                  {path.language.toUpperCase()} · LESSON {lesson.number}
                </span>
                <small>{lesson.duration}</small>
              </div>
              <h1>{lesson.title}</h1>
              <p>{lesson.summary}</p>
            </header>

            <aside className={styles.goalCard}>
              <strong>{copy.goal}</strong>
              <p>
                <InlineCodeText text={lesson.goal} />
              </p>
            </aside>

            <section className={styles.lessonSection}>
              <div className="section-kicker">{copy.plainKicker}</div>
              <h2>{copy.plainTitle}</h2>
              <div className={styles.plainCopy}>
                {lesson.plain.map((paragraph) => (
                  <p key={paragraph}>
                    <InlineCodeText text={paragraph} />
                  </p>
                ))}
              </div>
            </section>

            <section className={styles.lessonSection}>
              <div className="section-kicker">
                {lesson.concepts.length > 3
                  ? copy.conceptMany
                  : copy.conceptFew}
              </div>
              <h2>{copy.conceptTitle}</h2>
              <div
                className={
                  styles.conceptGrid +
                  (lesson.concepts.length > 3
                    ? " " + styles.conceptGridExpanded
                    : "")
                }
              >
                {lesson.concepts.map((concept, index) => (
                  <article key={concept.term}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{concept.term}</h3>
                    <p>
                      <InlineCodeText text={concept.explanation} />
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.lessonSection}>
              <div className="section-kicker">{copy.symbolsKicker}</div>
              <h2>{copy.symbolsTitle}</h2>
              <div className={styles.symbolList}>
                {lesson.symbols.map((symbol) => (
                  <div className={styles.symbolRow} key={symbol.token}>
                    <code>{symbol.token}</code>
                    <p>
                      <InlineCodeText text={symbol.reading} />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.lessonSection}>
              <div className="section-kicker">{copy.exampleKicker}</div>
              <h2>{lesson.example.label}</h2>
              <p className={styles.exampleIntro}>
                <InlineCodeText text={lesson.example.caption} />
              </p>
              <CopyBlock
                code={lesson.example.code}
                language={path.id}
                label={path.language}
                locale={locale}
              />
              <div className={styles.outputPanel}>
                <strong>{copy.outputTitle}</strong>
                <ul>
                  {lesson.example.output.map((item) => (
                    <li key={item}>
                      <InlineCodeText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={styles.lessonSection}>
              <div className="section-kicker">{copy.stepsKicker}</div>
              <h2>{copy.stepsTitle}</h2>
              <ol className={styles.stepsList}>
                {lesson.steps.map((step) => (
                  <li key={step}>
                    <span>
                      <InlineCodeText text={step} />
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.practiceSection}>
              <div className="section-kicker">{copy.practiceKicker}</div>
              <h2>{copy.practiceTitle}</h2>
              <p className={styles.practiceTask}>
                <InlineCodeText text={lesson.practice.task} />
              </p>
              <CopyBlock
                code={lesson.practice.starter}
                language={path.id}
                label={copy.starterLabel}
                locale={locale}
              />
              <p className={styles.expectedLine}>
                <strong>{copy.expectedLabel}</strong>{" "}
                <InlineCodeText text={lesson.practice.expected} />
              </p>
              <div className={styles.revealStack}>
                <details>
                  <summary>{copy.hintSummary}</summary>
                  <p>
                    <InlineCodeText text={lesson.practice.hint} />
                  </p>
                </details>
                <details>
                  <summary>{copy.answerSummary}</summary>
                  <CopyBlock
                    code={lesson.practice.answer}
                    language={path.id}
                    label={copy.answerLabel}
                    locale={locale}
                  />
                </details>
              </div>
            </section>

            <details className={styles.checkCard}>
              <summary>
                {copy.checkPrefix}
                {lesson.check.question}
              </summary>
              <p>
                <InlineCodeText text={lesson.check.answer} />
              </p>
            </details>

            <section className={styles.takeawaySection}>
              <div>
                <div className="section-kicker">{copy.takeawayKicker}</div>
                <h2>{copy.takeawayTitle}</h2>
              </div>
              <ol>
                {lesson.takeaways.map((takeaway, index) => (
                  <li key={takeaway}>
                    <span>{index + 1}</span>
                    <InlineCodeText text={takeaway} />
                  </li>
                ))}
              </ol>
            </section>

            <aside className={styles.lessonSources}>
              <span>{copy.sources}</span>
              <div>
                {path.references.map((reference) => (
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    key={reference.href}
                  >
                    {reference.label} ↗
                  </a>
                ))}
              </div>
            </aside>

            <section className={styles.lessonCompletion}>
              <div>
                <span>{copy.completionLabel}</span>
                <strong>{copy.completionBody}</strong>
              </div>
              <BasicProgressButton
                language={path.id}
                slug={lesson.slug}
                locale={locale}
              />
            </section>

            <nav
              className={styles.lessonPagination}
              aria-label={copy.paginationLabel}
            >
              {previous ? (
                <LocalizedLink
                  href={
                    "/from-scratch/" + path.id + "/" + previous.slug
                  }
                  locale={locale}
                >
                  <small>{copy.previous}</small>
                  <strong>
                    {previous.number} · {previous.title}
                  </strong>
                </LocalizedLink>
              ) : (
                <LocalizedLink
                  href={"/from-scratch/" + path.id}
                  locale={locale}
                >
                  <small>{copy.directory}</small>
                  <strong>{path.shortTitle}</strong>
                </LocalizedLink>
              )}
              {next ? (
                <LocalizedLink
                  href={"/from-scratch/" + path.id + "/" + next.slug}
                  locale={locale}
                >
                  <small>{copy.next}</small>
                  <strong>
                    {next.number} · {next.title}
                  </strong>
                </LocalizedLink>
              ) : (
                <LocalizedLink href={path.bridge.href} locale={locale}>
                  <small>{copy.mainline}</small>
                  <strong>{path.bridge.label}</strong>
                </LocalizedLink>
              )}
            </nav>
          </article>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
