"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import type { NotebookLesson } from "../notebook-lesson";
import type { Locale } from "../i18n/locales";
import { notebookCopy } from "../notebook-copy";
import styles from "./AnnotatedCodeCanvas.module.css";
import shared from "./MeetIexLesson.module.css";

type Props = {
  code: string;
  notes: NotebookLesson["notes"];
  activeNote: number;
  onSelectNote: (index: number) => void;
  locale: Locale;
  environment: string;
};

const colors = ["var(--note-blue)", "var(--note-purple)", "var(--note-green)", "var(--ink-soft)"];

export function AnnotatedCodeCanvas({ code, notes, activeNote, onSelectNote, locale, environment }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const notesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const identifier = useId();
  const rows = Math.ceil(notes.length / 2);
  const wide = code.split("\n").some((line) => Array.from(line).length > 30);
  const copy = notebookCopy(locale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frame = 0;
    let disposed = false;

    function drawArrows() {
      if (!canvas) return;
      const origin = canvas.getBoundingClientRect();
      notes.forEach((note, index) => {
        const label = notesRef.current[index]?.getBoundingClientRect();
        const line = linesRef.current[note.lines[0] - 1]?.getBoundingClientRect();
        const path = pathsRef.current[index];
        if (!label || !line || !path) return;
        const direction = (wide ? index % 2 === 0 : index < rows) ? 1 : -1;
        if (wide) {
          const noteBox = notesRef.current[index]?.closest("aside")?.getBoundingClientRect();
          const sheet = canvas.querySelector("[data-code-sheet]")?.getBoundingClientRect();
          if (!noteBox || !sheet) return;
          const above = index < 2;
          const startX = noteBox.left + noteBox.width / 2 - origin.left;
          const startY = (above ? noteBox.bottom + 6 : noteBox.top - 6) - origin.top;
          const endX = (direction === 1 ? sheet.left - 5 : sheet.right + 5) - origin.left;
          const endY = line.top + line.height / 2 - origin.top;
          const gutterX = endX - direction * 16;
          const bendY = (above ? sheet.top - 18 : sheet.bottom + 18) - origin.top;
          const cornerX = gutterX + direction * 14;
          const cornerY = bendY + (above ? 14 : -14);
          path.setAttribute("d", `M ${startX} ${startY} C ${startX} ${startY + (above ? 18 : -18)}, ${cornerX} ${bendY}, ${cornerX} ${bendY} Q ${gutterX} ${bendY}, ${gutterX} ${cornerY} C ${gutterX} ${(cornerY + endY) / 2}, ${gutterX} ${endY}, ${endX} ${endY}`);
          return;
        }
        const startX = (direction === 1 ? label.right + 8 : label.left - 8) - origin.left;
        const startY = label.top + label.height / 2 - origin.top;
        const endX = (direction === 1 ? line.left - 3 : line.right + 3) - origin.left;
        const endY = line.top + line.height / 2 - origin.top;
        const bend = Math.max(24, Math.abs(endX - startX) * 0.55);
        path.setAttribute("d", `M ${startX} ${startY} C ${startX + direction * bend} ${startY - 18}, ${endX - direction * bend} ${endY - 24}, ${endX} ${endY}`);
      });
    }

    function scheduleDraw() {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(drawArrows);
    }

    const observer = new ResizeObserver(scheduleDraw);
    [canvas, ...linesRef.current, ...notesRef.current].forEach((element) => {
      if (element) observer.observe(element);
    });
    scheduleDraw();
    void document.fonts.ready.then(scheduleDraw);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [code, notes, rows, wide]);

  return <div className={styles.container} data-read-layout="canvas">
    <div ref={canvasRef} className={`${styles.canvas}${wide ? ` ${styles.wide}` : ""}`} data-canvas-layout={wide ? "wide" : "centered"} style={{ "--note-rows": rows } as CSSProperties}>
      <div className={styles.codeSheet} data-code-sheet aria-label={copy.code}>
        <span className={shared.sheetLabel}>{environment} · {copy.clickLine}</span>
        {code.split("\n").map((line, index) => {
          const noteIndex = notes.findIndex((note) => note.lines.includes(index + 1));
          return <button key={index} ref={(element) => { linesRef.current[index] = element; }} type="button" className={styles.codeLine}
            style={{ "--annotation-color": colors[noteIndex % colors.length] } as CSSProperties}
            data-selected={activeNote === noteIndex} aria-pressed={activeNote === noteIndex}
            aria-label={copy.lineNote(index + 1)} aria-describedby={noteIndex >= 0 ? `${identifier}-note-${noteIndex}` : undefined}
            onClick={() => { if (noteIndex >= 0) onSelectNote(noteIndex); }}>
            <span className={shared.lineNumber} aria-hidden="true">{index + 1}</span><code>{line || " "}</code>
          </button>;
        })}
      </div>
      {notes.map((note, index) => <aside key={note.label} className={styles.annotation} data-code-annotation={index} data-selected={activeNote === index} aria-label={copy.notes}
        style={{ "--annotation-color": colors[index % colors.length], "--note-column": wide ? index % 2 + 1 : index < rows ? 1 : 3, "--note-row": wide ? Math.floor(index / 2) * 2 + 1 : index % rows + 1 } as CSSProperties}>
        <span className={styles.lineLabel}>{copy.lines(note.lines)}</span>
        <h2><button ref={(element) => { notesRef.current[index] = element; }} type="button" aria-pressed={activeNote === index} onClick={() => onSelectNote(index)}>{note.label}</button></h2>
        <p id={`${identifier}-note-${index}`}>{note.text}</p>
      </aside>)}
      <svg className={styles.arrows} aria-hidden="true">
        <defs>{notes.map((note, index) => <marker key={note.label} id={`${identifier}-arrow-${index}`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M2 2 L10 6 L2 10" fill="none" stroke={colors[index % colors.length]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>)}</defs>
        {notes.map((note, index) => <path key={note.label} ref={(element) => { pathsRef.current[index] = element; }} data-selected={activeNote === index}
          stroke={colors[index % colors.length]} markerEnd={`url(#${identifier}-arrow-${index})`} />)}
      </svg>
    </div>
  </div>;
}
