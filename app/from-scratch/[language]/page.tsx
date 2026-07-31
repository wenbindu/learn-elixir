import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { basicPaths, getBasicPath } from "../../basic-path-data";
import { BasicLessonStatus } from "../../components/BasicProgress";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import styles from "../from-scratch.module.css";

type BasicPathPageProps = {
  params: Promise<{ language: string }>;
};

export function generateStaticParams() {
  return basicPaths.map((path) => ({ language: path.id }));
}

export async function generateMetadata({
  params,
}: BasicPathPageProps): Promise<Metadata> {
  const { language } = await params;
  const path = getBasicPath(language);
  if (!path) return {};

  return {
    title: path.title,
    description: path.description,
  };
}

export default async function BasicPathPage({ params }: BasicPathPageProps) {
  const { language } = await params;
  const path = getBasicPath(language);
  if (!path) notFound();

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section
          className={`${styles.trackHero} ${
            path.id === "erlang" ? styles.trackHeroErlang : ""
          }`}
        >
          <div className={styles.shell}>
            <div className={styles.breadcrumb}>
              <Link href="/">首页</Link>
              <span>/</span>
              <Link href="/from-scratch">From Scratch</Link>
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
                  <span>节短课</span>
                </div>
                <div>
                  <strong>{path.shell}</strong>
                  <span>动手起点</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.trackBody}>
          <div className={styles.shell}>
            <div className={styles.startPanel}>
              <div>
                <div className="section-kicker">出发前</div>
                <h2>先确认能打开 {path.shell}</h2>
                <p>
                  在终端输入命令。看到交互提示符就够了。暂时不用建项目。
                </p>
                <div className={styles.startActions}>
                  <code>{path.shellCommand}</code>
                  <Link href="/learn/install-toolchain">还没安装？看安装步骤</Link>
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
                <div className="section-kicker">九步路线</div>
                <h2>一课只解决一个问题</h2>
              </div>
              <p>
                按顺序学。遇到陌生符号，不要猜着跳过。先看“符号拆解”，
                再把示例复制到 {path.shell}。
              </p>
            </div>

            <div className={styles.lessonRoadmap}>
              {path.lessons.map((lesson) => (
                <Link
                  className={styles.lessonCard}
                  href={`/from-scratch/${path.id}/${lesson.slug}`}
                  key={lesson.slug}
                >
                  <div className={styles.lessonCardTop}>
                    <span>LESSON {lesson.number}</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.summary}</p>
                  <div className={styles.lessonCardFooter}>
                    <span>开始这一课 →</span>
                    <BasicLessonStatus
                      language={path.id}
                      slug={lesson.slug}
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.trackFooterGrid}>
              <article className={styles.bridgeCard}>
                <div className="section-kicker">学完以后</div>
                <h2>{path.bridge.title}</h2>
                <p>{path.bridge.description}</p>
                <Link href={path.bridge.href}>{path.bridge.label} →</Link>
              </article>
              <article className={styles.sourceCard}>
                <div className="section-kicker">课程依据</div>
                <h2>不懂时去看原文</h2>
                <p>路线参考入门课程；语法细节以官方文档为准。</p>
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
      <SiteFooter />
    </>
  );
}
