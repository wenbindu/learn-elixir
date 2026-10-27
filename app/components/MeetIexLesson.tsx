import {
  meetIexActivity,
  meetIexLesson,
  meetIexMetadata,
} from "../../content/lessons/meet-iex";
import { meetIexActivityEn, meetIexLessonEn, meetIexMetadataEn } from "../../content/lessons/meet-iex.en";
import type { Locale } from "../i18n/locales";
import { AnnotatedIexBoard } from "./AnnotatedIexBoard";
import { BasicProgressButton } from "./BasicProgress";
import { InlineCodeText } from "./InlineCodeText";
import { LocalizedLink } from "./LocalizedLink";
import styles from "./MeetIexLesson.module.css";
import sketch from "./LessonSketch.module.css";

export function MeetIexLesson({ locale = "zh" }: { locale?: Locale }) {
  const lesson = locale === "en" ? meetIexLessonEn : meetIexLesson;
  const metadata = locale === "en" ? meetIexMetadataEn : meetIexMetadata;
  const activity = locale === "en" ? meetIexActivityEn : meetIexActivity;
  const text = (zh: string, en: string) => locale === "en" ? en : zh;
  return (
    <div className={`${styles.pilot} ${sketch.lesson}`} data-sketch-lesson="meet-iex">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>ELIXIR / {lesson.number}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
      </header>

      <AnnotatedIexBoard locale={locale} />

      <div className={styles.footer}>
        <details>
          <summary>{text("记住这三点", "Remember three things")}</summary>
          <ul>{lesson.takeaways.map((takeaway) => <li key={takeaway}><InlineCodeText text={takeaway} /></li>)}</ul>
        </details>
        <details>
          <summary>{text("这课给项目添什么", "Project contribution")}</summary>
          <p>{metadata.project_contribution}</p>
          <p>{text("最终项目：“行迹”文字统计工具。以下是第 27–32 课成品的使用示意。", "Final project: Trail, a text statistics tool. Here is a preview of the finished tool from lessons 27–32.")}</p>
          <pre><code>{activity.projectPreview}</code></pre>
        </details>
        <BasicProgressButton language="elixir" slug="meet-iex" locale={locale} />
      </div>
      <details className={styles.goal}>
        <summary>{text("还没打开 IEx？", "Haven't opened IEx yet?")}</summary>
        <p>{text("先完成第 01 课的进入与退出操作，再回来运行这两行代码。", "Complete the enter and exit steps in lesson 01, then come back to run these two lines.")}</p>
        <LocalizedLink href="/from-scratch/elixir/start-iex" locale={locale}>{text("第 01 课：打开 IEx，再退出来 →", "Lesson 01: Open IEx, then exit →")}</LocalizedLink>
      </details>
      <LocalizedLink className={styles.depthLink} href={metadata.depth_pages[0]} locale={locale}>
        {text("想再深入？为什么运行成品时看不到 :ok →", `Go deeper: ${activity.depthQuestion} →`)}
      </LocalizedLink>
    </div>
  );
}
