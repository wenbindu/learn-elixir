import type { BasicLesson, BasicPathId, BasicReference } from "../basic-path-data";
import type { Locale } from "../i18n/locales";
import { CopyBlock } from "./CopyBlock";
import { InlineCodeText } from "./InlineCodeText";
import { LocalizedLink } from "./LocalizedLink";
import { SiteFooter } from "./SiteFooter";
import styles from "../from-scratch/from-scratch.module.css";
import { DesignComparisonPanel } from "./LearningGuidancePanel";
import { getBasicLessonGuidance } from "../i18n/learning-guidance";

type NotebookDepthLessonProps = {
  lesson: BasicLesson;
  references: BasicReference[];
  locale?: Locale;
  language?: BasicPathId;
};

export function NotebookDepthLesson({ lesson, references, locale = "zh", language = "elixir" }: NotebookDepthLessonProps) {
  const text = (zh: string, en: string) => locale === "en" ? en : zh;
  const lessonHref = `/from-scratch/${language}/${lesson.slug}`;

  return <>
    <main className={`${styles.lessonPage} ${styles.shell}`} data-notebook-depth={lesson.slug}>
      <header className={styles.lessonHeader}>
        <LocalizedLink href={lessonHref} locale={locale}>{text(`← 返回第 ${lesson.number} 课：${lesson.title}`, `← Back to lesson ${lesson.number}: ${lesson.title}`)}</LocalizedLink>
        <h1>{text(`${lesson.title}：完整示例与补充知识`, `${lesson.title}: full examples and further reading`)}</h1>
        <p>{text("这里保留原课的完整资料，供你按需查阅；主看板只讲本课的核心问题。", "The original lesson material is preserved here for reference. The main notebook focuses on this lesson's core question.")}</p>
        {locale === "en" && lesson.stage === "project" ? <p>The original English project below is a log cleaner. The current notebooks use the same file-statistics project as the Chinese route. These preserved examples show another application of the concepts; their inputs and expected outputs belong to the log cleaner.</p> : null}
        <p>{lesson.summary}</p>
        <p><InlineCodeText text={lesson.goal} /></p>
      </header>
      <section className={styles.lessonSection}><h2>{lesson.example.label}</h2><p><InlineCodeText text={lesson.example.caption} /></p><CopyBlock code={lesson.example.code} language={language} label={text("原课完整示例（按说明选择运行环境）", "Original full example")} locale={locale} />{lesson.example.output.map((item) => <p key={item}><InlineCodeText text={item} /></p>)}</section>
      <section className={styles.lessonSection}><h2>{text("完整示例的执行步骤", "Steps for the full example")}</h2><ol>{lesson.steps.map((item) => <li key={item}><InlineCodeText text={item} /></li>)}</ol></section>
      <section className={styles.lessonSection}><h2>{text("原课补充说明", "Original lesson notes")}</h2>{lesson.plain.map((item) => <p key={item}><InlineCodeText text={item} /></p>)}</section>
      <details className={styles.checkCard}><summary>{text("符号与术语对照", "Symbols and terms")}</summary><dl>{lesson.symbols.map((item) => <div key={item.token}><dt><code>{item.token}</code></dt><dd><InlineCodeText text={item.reading} /></dd></div>)}{lesson.concepts.map((item) => <div key={item.term}><dt>{item.term}</dt><dd><InlineCodeText text={item.explanation} /></dd></div>)}</dl></details>
      <section className={styles.lessonSection}><h2>{text("原课完整练习", "Original full exercise")}</h2><p><InlineCodeText text={lesson.practice.task} /></p><CopyBlock code={lesson.practice.starter} language={language} label={text("练习起点", "Exercise starter")} locale={locale} /><p><InlineCodeText text={lesson.practice.expected} /></p><details className={styles.checkCard}><summary>{text("查看提示", "Show hint")}</summary><p><InlineCodeText text={lesson.practice.hint} /></p></details><details className={styles.checkCard}><summary>{text("查看原课答案", "Show original answer")}</summary><CopyBlock code={lesson.practice.answer} language={language} label={text("答案参考", "Reference answer")} locale={locale} /></details></section>
      <details className={styles.checkCard}><summary><InlineCodeText text={lesson.check.question} /></summary><p><InlineCodeText text={lesson.check.answer} /></p></details>
      <details className={styles.checkCard}><summary>{text("原课要点", "Original lesson takeaways")}</summary><ul>{lesson.takeaways.map((item) => <li key={item}><InlineCodeText text={item} /></li>)}</ul></details>
      <details className={styles.checkCard}><summary>{text("设计取舍与其他语言对照", "Design trade-offs and language comparisons")}</summary><DesignComparisonPanel guidance={getBasicLessonGuidance(locale, language, lesson)} locale={locale} /></details>
      <details className={styles.checkCard}><summary>{text("原课程参考链接", "Original course references")}</summary><ul>{references.map((item) => <li key={item.href}><LocalizedLink href={item.href} locale={locale} target="_blank" rel="noreferrer">{item.label} ↗</LocalizedLink></li>)}</ul></details>
      <nav className={styles.lessonPagination} aria-label={text("返回课程", "Return to lesson")}><LocalizedLink href={lessonHref} locale={locale}>{text(`← 返回第 ${lesson.number} 课手绘看板`, `← Back to the lesson ${lesson.number} notebook`)}</LocalizedLink></nav>
    </main><SiteFooter locale={locale} showClosing={false} />
  </>;
}
