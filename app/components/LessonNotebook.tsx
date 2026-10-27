"use client";

import { useState } from "react";
import type { NotebookLesson } from "../notebook-lesson";
import type { BasicPathId } from "../basic-path-data";
import type { Locale } from "../i18n/locales";
import { notebookCopy } from "../notebook-copy";
import { BasicProgressButton } from "./BasicProgress";
import { AnnotatedCodeCanvas } from "./AnnotatedCodeCanvas";
import { LocalizedLink } from "./LocalizedLink";
import styles from "./MeetIexLesson.module.css";
import layout from "./LessonNotebook.module.css";
import sketch from "./LessonSketch.module.css";

type LessonLink = { slug: string; number: string; title: string };
type Props = { notebook: NotebookLesson; lesson: LessonLink; review?: LessonLink; prerequisites: LessonLink[]; locale: Locale; language: BasicPathId };
const views = ["read", "trace", "change"] as const;

export function LessonNotebook({ notebook, lesson, review, prerequisites, locale, language }: Props) {
  const [view, setView] = useState<(typeof views)[number]>("read");
  const [activeNote, setActiveNote] = useState(0);
  const [activeTrace, setActiveTrace] = useState(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState("");
  const copy = notebookCopy(locale, language);
  const trace = notebook.trace[activeTrace];
  const href = (slug: string) => `/from-scratch/${language}/${slug}`;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(view === "change" ? notebook.exercise.code : notebook.code);
      setCopied(copy.copied + (notebook.setup ?? copy.instruction));
    } catch {
      setCopied(copy.copyFailed);
    }
  }

  return <div className={`${styles.pilot} ${sketch.lesson}`} data-sketch-lesson={lesson.slug}>
    <header className={styles.header}><div><span className={styles.eyebrow}>{language.toUpperCase()} / {lesson.number}</span><h1>{lesson.title}</h1><p>{notebook.problem}</p></div></header>
    <section className={styles.paper} data-code-notebook={lesson.slug} aria-label={copy.board(lesson.number)}>
      <div className={styles.toolbar}>
        <div className={styles.viewButtons} role="group" aria-label={copy.viewGroup}>{views.map((item, index) => <button key={item} type="button" aria-pressed={view === item} onClick={() => { setView(item); setCopied(""); }}><span>{String(index + 1).padStart(2, "0")}</span>{copy.views[index]}</button>)}</div>
        <button className={styles.copyButton} type="button" onClick={copyCode}>{copy.copy}</button>
      </div>
      {notebook.setup ? <p className={layout.setup}><strong>{copy.setup}: </strong>{notebook.setup}</p> : null}
      {view === "read" ? <div className={layout.body} data-notebook-view="read">
        <AnnotatedCodeCanvas code={notebook.code} notes={notebook.notes} activeNote={activeNote} onSelectNote={setActiveNote} locale={locale} environment={notebook.environment ?? copy.shell} />
        <div className={layout.prompt}><p><span className={styles.pencilMark}>{copy.predict}</span>{notebook.prediction}</p><button className={styles.revealButton} type="button" onClick={() => setView("trace")}>{copy.trace} →</button></div>
      </div> : null}
      {view === "trace" ? <div className={layout.body} data-notebook-view="trace">
        <div className={styles.changeButtons} role="group" aria-label={copy.steps}>{notebook.trace.map((item, index) => <button key={item.label} type="button" aria-pressed={activeTrace === index} onClick={() => setActiveTrace(index)}>{item.label}</button>)}</div>
        <div className={layout.traceGrid}>
          <div className={layout.code} aria-label={copy.code}>{notebook.code.split("\n").map((line, index) => <div key={index} className={layout.codeLine} data-selected={trace.lines.includes(index + 1)}><span className={styles.lineNumber} aria-hidden="true">{index + 1}</span><code>{line || " "}</code></div>)}</div>
          <div className={`${styles.resultSheet} ${layout.result}`} aria-live="polite"><span className={styles.sheetLabel}>{copy.lines(trace.lines)} · {copy.result}</span><pre><code>{trace.output}</code></pre></div>
        </div>
        <div className={styles.conclusion}><strong>{copy.why}</strong><p>{trace.explanation}</p></div>
      </div> : null}
      {view === "change" ? <div className={layout.body} data-notebook-view="change">
        <h2 className={styles.handwritten}>{notebook.exercise.task}</h2>
        <pre className={`${styles.changeCode} ${layout.wrappedCode}`}><code>{notebook.exercise.code}</code></pre>
        <fieldset className={`${styles.prediction} ${layout.options}`}><legend>{copy.prediction}</legend>{[...notebook.exercise.choices, copy.unsure].map((choice, index) => <label key={choice}><input type="radio" name={`${language}-${lesson.slug}-prediction`} checked={prediction === index} onChange={() => { setPrediction(index); setRevealed(false); }} />{choice}</label>)}</fieldset>
        <button className={styles.revealButton} type="button" disabled={prediction === null} onClick={() => setRevealed(true)}>{copy.reveal}</button>
        {revealed ? <div className={`${styles.changeResult} ${layout.result}`} role="status"><strong>{prediction === notebook.exercise.choices.length ? copy.uncertain : prediction === notebook.exercise.correct ? copy.correct : copy.incorrect}</strong><pre><code>{notebook.exercise.output}</code></pre><p>{notebook.exercise.explanation}</p></div> : null}
        <div className={styles.hints}>{notebook.exercise.hints.map((hint, index) => <details key={hint}><summary>{copy.hint} {index + 1}</summary><p>{hint}</p></details>)}</div>
        {review && notebook.review ? <details className={styles.goal}><summary>{copy.review(review.number)}: {notebook.review.question}</summary><LocalizedLink href={href(review.slug)} locale={locale}>{copy.back(review.title)}</LocalizedLink><details><summary>{copy.reviewAnswer}</summary><p>{notebook.review.answer}</p></details></details> : null}
        <p className={styles.goal}>{copy.goal}: {notebook.ability}</p>
      </div> : null}
      <p className={`${styles.runtimeNote} ${layout.runtime}`}>{copy.runtime}</p>
      <p className={styles.copyStatus} role="status">{copied}</p>
    </section>
    {prerequisites.length ? <p className={layout.reuse}>{copy.reused}: {prerequisites.map((item) => <LocalizedLink key={item.slug} locale={locale} href={href(item.slug)}>{copy.lesson(item.number)} · {item.title}</LocalizedLink>)}</p> : null}
    <div className={styles.footer}>
      <details><summary>{copy.takeaways}</summary><ul>{notebook.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></details>
      <details><summary>{copy.project}</summary><p>{notebook.contribution}</p></details>
      <BasicProgressButton language={language} slug={lesson.slug} locale={locale} />
    </div>
    <LocalizedLink className={styles.depthLink} locale={locale} href={`${href(lesson.slug)}/deeper`}>{copy.deeper} →</LocalizedLink>
  </div>;
}
