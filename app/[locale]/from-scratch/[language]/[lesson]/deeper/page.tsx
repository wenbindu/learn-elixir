import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { meetIexLesson, meetIexActivity } from "../../../../../../content/lessons/meet-iex";
import { CopyBlock } from "../../../../../components/CopyBlock";
import { InlineCodeText } from "../../../../../components/InlineCodeText";
import { LocalizedLink } from "../../../../../components/LocalizedLink";
import { SiteFooter } from "../../../../../components/SiteFooter";
import { getBasicPath, getBasicPaths } from "../../../../../i18n/catalog";
import { isLocale, locales } from "../../../../../i18n/locales";
import { localeAlternates } from "../../../../../i18n/metadata";
import styles from "../../../../../from-scratch/from-scratch.module.css";
import { NotebookDepthLesson } from "../../../../../components/NotebookDepthLesson";

type DepthPageProps = {
  params: Promise<{ locale: string; language: string; lesson: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBasicPaths(locale).flatMap((path) =>
      path.lessons
        .filter((lesson) => lesson.slug !== "start-iex")
        .map((lesson) => ({ locale, language: path.id, lesson: lesson.slug })),
    ),
  );
}

const meetIexDepthMetadata: Metadata = {
  title: "IEx 为什么显示 :ok · 第 02 课深入",
  description: "对比 IEx 与成品命令的输出，按需查提示符、模块名和注释的写法。",
};

export async function generateMetadata({ params }: DepthPageProps): Promise<Metadata> {
  const { locale, language, lesson: slug } = await params;
  if (!isLocale(locale) || slug === "start-iex") return {};
  const path = getBasicPath(locale, language);
  const lesson = path?.lessons.find((item) => item.slug === slug);
  if (!path || !lesson) return {};
  const alternates = localeAlternates(locale, `/from-scratch/${path.id}/${slug}/deeper`);
  if (locale === "zh" && path.id === "elixir" && slug === "meet-iex") {
    return { ...meetIexDepthMetadata, alternates };
  }
  return {
    title: locale === "zh" ? `${lesson.title} · 第 ${lesson.number} 课深入` : `${lesson.title} · Lesson ${lesson.number} in depth`,
    description: lesson.summary,
    alternates,
  };
}

export default async function MeetIexDepthPage({ params }: DepthPageProps) {
  const { locale, language, lesson } = await params;
  if (!isLocale(locale) || lesson === "start-iex") notFound();
  const path = getBasicPath(locale, language);
  const original = path?.lessons.find((item) => item.slug === lesson);
  if (!path || !original) notFound();
  if (locale !== "zh" || path.id !== "elixir" || lesson !== "meet-iex") {
    return <NotebookDepthLesson lesson={original} references={path.references} locale={locale} language={path.id} />;
  }

  return (
    <>
      <main className={`${styles.lessonPage} ${styles.shell}`}>
        <header className={styles.lessonHeader}>
          <LocalizedLink href="/from-scratch/elixir/meet-iex" locale="zh">← 返回第 02 课：先让代码说话</LocalizedLink>
          <h1>{meetIexActivity.depthQuestion}</h1>
          <p>第 02 课深入 · 可选阅读</p>
        </header>
        <section className={styles.lessonSection}>
          <h2>IEx 会显示代码的返回值</h2>
          <p><code>IO.puts</code> 负责打印文字，完成后把 <code>:ok</code> 交回调用它的代码。IEx 为了让你检查结果，会再把这个返回值显示出来。</p>
          <CopyBlock code={'IO.puts("lines=2")'} language="elixir" label="在 IEx 里运行" locale="zh" />
          <pre><code>{'lines=2\n:ok'}</code></pre>
          <p>成品命令没有 IEx 帮你显示返回值，所以只看到它主动打印的 <code>lines=2</code>。返回值仍然存在，调用者可以继续使用它。</p>
          <p><code>:ok</code> 是 atom，一种用名字表示含义的标签。<LocalizedLink href="/from-scratch/elixir/values-and-types" locale="zh">第 03 课</LocalizedLink>会比较 <code>:ok</code> 与文字 <code>{'"ok"'}</code>。</p>
        </section>
        <section className={styles.lessonSection}>
          <h2>计算和文字转换也会交回结果</h2>
          <p>表达式是一段会产生结果的代码。函数是能按名字调用的一段代码。</p>
          <CopyBlock code={'2 + 3\nString.upcase("cat")'} language="elixir" label="在 IEx 中逐行运行" locale="zh" />
          <p>第一行返回 <code>5</code>，第二行返回 <code>{'"CAT"'}</code>。表达式运行后会得到一个值。</p>
          <details className={styles.checkCard}>
            <summary>把算出的文字交给 IO.puts</summary>
            <CopyBlock code={'IO.puts(String.upcase("beam"))'} language="elixir" label="先转大写，再打印" locale="zh" />
            <p>先算出 <code>{'"BEAM"'}</code>，再交给 <code>IO.puts</code>。屏幕先显示 <code>BEAM</code>，IEx 再显示返回值 <code>:ok</code>。</p>
          </details>
        </section>
        <section className={styles.lessonSection}>
          <h2>拼错名字，怎么读报错</h2>
          <CopyBlock code={'String.upcas("cat")'} language="elixir" label="故意少写一个字母" locale="zh" />
          <div className="code-card"><pre><code>** (UndefinedFunctionError) function String.upcas/1 is undefined or private</code></pre></div>
          <p>这里只截取报错首行，不同版本可能另外显示修改建议和调用位置。</p>
          {meetIexLesson.steps.map((step) => <p key={step}><InlineCodeText text={step} /></p>)}
          <CopyBlock code={meetIexActivity.repair} language="elixir" label="只补一个 e，再运行" locale="zh" />
          <p>先看报错写了什么，再只改一个地方。</p>
        </section>
        <section className={styles.lessonSection}>
          <h2>输入符号和函数名字怎么读</h2>
          <div className={styles.symbolList}>
            {meetIexLesson.symbols.map((symbol) => (
              <div className={styles.symbolRow} key={symbol.token}>
                <code>{symbol.token}</code>
                <p><InlineCodeText text={symbol.reading} /></p>
              </div>
            ))}
          </div>
          <p>报错中的 <code>String.upcas/1</code> 指名为 <code>upcas</code>、接收一份输入的函数。<code>/1</code> 是标明输入数量的记法，输入数量叫 arity；<LocalizedLink href="/from-scratch/elixir/functions-and-arity" locale="zh">第 08 课</LocalizedLink>会专门练习。</p>
          <details className={styles.checkCard}>
            <summary>IEx 的全名和注释示例</summary>
            <p>IEx 是 Interactive Elixir 的缩写。IEx 适合试很短的 Elixir 代码。</p>
            <CopyBlock code={'# 这一行不执行\n7 * 6'} language="elixir" label="运行后返回 42" locale="zh" />
          </details>
        </section>
        <details className={styles.checkCard}>
          <summary>原课程参考链接</summary>
          <ul>{path.references.map((reference) => (
            <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer">{reference.label} ↗</a></li>
          ))}</ul>
        </details>
        <nav className={styles.lessonPagination} aria-label="返回课程">
          <LocalizedLink href="/from-scratch/elixir/meet-iex" locale="zh">← 返回第 02 课</LocalizedLink>
        </nav>
      </main>
      <SiteFooter locale="zh" showClosing={false} />
    </>
  );
}
