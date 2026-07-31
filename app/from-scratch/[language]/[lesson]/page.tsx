import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  basicPaths,
  getAdjacentBasicLessons,
  getBasicLesson,
  getBasicPath,
} from "../../../basic-path-data";
import { BasicProgressButton } from "../../../components/BasicProgress";
import { CopyBlock } from "../../../components/CopyBlock";
import { InlineCodeText } from "../../../components/InlineCodeText";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import styles from "../../from-scratch.module.css";

type BasicLessonPageProps = {
  params: Promise<{ language: string; lesson: string }>;
};

export function generateStaticParams() {
  return basicPaths.flatMap((path) =>
    path.lessons.map((lesson) => ({
      language: path.id,
      lesson: lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: BasicLessonPageProps): Promise<Metadata> {
  const { language, lesson: slug } = await params;
  const path = getBasicPath(language);
  const lesson = path ? getBasicLesson(path, slug) : undefined;
  if (!path || !lesson) return {};

  return {
    title: `${lesson.title} · ${path.shortTitle}`,
    description: lesson.summary,
  };
}

export default async function BasicLessonPage({
  params,
}: BasicLessonPageProps) {
  const { language, lesson: slug } = await params;
  const path = getBasicPath(language);
  if (!path) notFound();

  const lesson = getBasicLesson(path, slug);
  if (!lesson) notFound();

  const { previous, next } = getAdjacentBasicLessons(path, lesson.slug);

  return (
    <>
      <SiteHeader compact />
      <main className={styles.lessonPage}>
        <div className={styles.lessonLayout}>
          <aside className={styles.lessonSidebar} aria-label={`${path.language} 基础目录`}>
            <div className={styles.sidebarHead}>
              <span>FROM SCRATCH</span>
              <strong>{path.shortTitle}</strong>
              <small>{path.lessons.length} 课 · 从 {path.shell} 开始</small>
            </div>
            <nav>
              {path.lessons.map((item) => (
                <Link
                  href={`/from-scratch/${path.id}/${item.slug}`}
                  data-active={item.slug === lesson.slug}
                  aria-current={item.slug === lesson.slug ? "page" : undefined}
                  key={item.slug}
                >
                  <b>{item.number}</b>
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <article className={styles.lessonArticle}>
            <details className={styles.mobilePathNav}>
              <summary>
                {path.shortTitle} · 第 {lesson.number} 课（展开目录）
              </summary>
              <div>
                {path.lessons.map((item) => (
                  <Link
                    href={`/from-scratch/${path.id}/${item.slug}`}
                    data-active={item.slug === lesson.slug}
                    aria-current={item.slug === lesson.slug ? "page" : undefined}
                    key={item.slug}
                  >
                    {item.number} · {item.title}
                  </Link>
                ))}
              </div>
            </details>

            <div className={styles.lessonBreadcrumb}>
              <Link href="/">首页</Link>
              <span>/</span>
              <Link href="/from-scratch">From Scratch</Link>
              <span>/</span>
              <Link href={`/from-scratch/${path.id}`}>{path.language}</Link>
              <span>/</span>
              <strong>第 {lesson.number} 课</strong>
            </div>

            <header
              className={`${styles.lessonHeader} ${
                path.id === "erlang" ? styles.lessonHeaderErlang : ""
              }`}
            >
              <div className={styles.lessonHeaderTop}>
                <span>
                  {path.language.toUpperCase()} · LESSON {lesson.number}
                </span>
                <div>
                  <small>{lesson.duration}</small>
                  <BasicProgressButton
                    language={path.id}
                    slug={lesson.slug}
                  />
                </div>
              </div>
              <h1>{lesson.title}</h1>
              <p>{lesson.summary}</p>
            </header>

            <aside className={styles.goalCard}>
              <strong>这一课只做一件事</strong>
              <p>
                <InlineCodeText text={lesson.goal} />
              </p>
            </aside>

            <section className={styles.lessonSection}>
              <div className="section-kicker">先听明白</div>
              <h2>它到底是什么</h2>
              <div className={styles.plainCopy}>
                {lesson.plain.map((paragraph) => (
                  <p key={paragraph}>
                    <InlineCodeText text={paragraph} />
                  </p>
                ))}
              </div>
            </section>

            <section className={styles.lessonSection}>
              <div className="section-kicker">先认三个词</div>
              <h2>够用就好</h2>
              <div className={styles.conceptGrid}>
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
              <div className="section-kicker">符号拆解</div>
              <h2>一段一段读</h2>
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
              <div className="section-kicker">先猜，再运行</div>
              <h2>{lesson.example.label}</h2>
              <p className={styles.exampleIntro}>
                <InlineCodeText text={lesson.example.caption} />
              </p>
              <CopyBlock
                code={lesson.example.code}
                language={path.id}
                label={path.language}
              />
              <div className={styles.outputPanel}>
                <strong>运行后对照</strong>
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
              <div className="section-kicker">按行读</div>
              <h2>不要一口吞下整段</h2>
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
              <div className="section-kicker">轮到你改一处</div>
              <h2>先别看答案</h2>
              <p className={styles.practiceTask}>
                <InlineCodeText text={lesson.practice.task} />
              </p>
              <CopyBlock
                code={lesson.practice.starter}
                language={path.id}
                label="练习起点"
              />
              <p className={styles.expectedLine}>
                <strong>目标结果：</strong>{" "}
                <InlineCodeText text={lesson.practice.expected} />
              </p>
              <div className={styles.revealStack}>
                <details>
                  <summary>卡住了，再看提示</summary>
                  <p>
                    <InlineCodeText text={lesson.practice.hint} />
                  </p>
                </details>
                <details>
                  <summary>运行过以后，再看一种答案</summary>
                  <CopyBlock
                    code={lesson.practice.answer}
                    language={path.id}
                    label="一种答案"
                  />
                </details>
              </div>
            </section>

            <details className={styles.checkCard}>
              <summary>想一想：{lesson.check.question}</summary>
              <p>
                <InlineCodeText text={lesson.check.answer} />
              </p>
            </details>

            <section className={styles.takeawaySection}>
              <div>
                <div className="section-kicker">带走</div>
                <h2>记住三句</h2>
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
              <span>这条路线参考</span>
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

            <nav className={styles.lessonPagination} aria-label="相邻基础课">
              {previous ? (
                <Link href={`/from-scratch/${path.id}/${previous.slug}`}>
                  <small>← 上一课</small>
                  <strong>
                    {previous.number} · {previous.title}
                  </strong>
                </Link>
              ) : (
                <Link href={`/from-scratch/${path.id}`}>
                  <small>← 路线目录</small>
                  <strong>{path.shortTitle}</strong>
                </Link>
              )}
              {next ? (
                <Link href={`/from-scratch/${path.id}/${next.slug}`}>
                  <small>下一课 →</small>
                  <strong>
                    {next.number} · {next.title}
                  </strong>
                </Link>
              ) : (
                <Link href={path.bridge.href}>
                  <small>进入 BEAM 主线 →</small>
                  <strong>{path.bridge.label}</strong>
                </Link>
              )}
            </nav>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
