"use client";

import { useSyncExternalStore } from "react";
import type { BasicPathId } from "../basic-path-data";
import styles from "../from-scratch/from-scratch.module.css";

const STORAGE_KEY = "beam-path-basics-progress.v1";
const PROGRESS_EVENT = "beam-path-basics-progress";

type BasicProgressProps = {
  language: BasicPathId;
  slug: string;
};

function lessonId(language: BasicPathId, slug: string) {
  return `${language}:${slug}`;
}

function readProgress(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return [];

    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PROGRESS_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

function useLessonComplete(language: BasicPathId, slug: string) {
  const id = lessonId(language, slug);

  return useSyncExternalStore(
    subscribe,
    () => readProgress().includes(id),
    () => false,
  );
}

export function BasicProgressButton({
  language,
  slug,
}: BasicProgressProps) {
  const id = lessonId(language, slug);
  const complete = useLessonComplete(language, slug);

  function toggle() {
    const current = new Set(readProgress());
    if (current.has(id)) current.delete(id);
    else current.add(id);

    const next = Array.from(current);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: next }));
  }

  return (
    <button
      className={`${styles.basicProgressButton} ${
        complete ? styles.basicProgressButtonComplete : ""
      }`}
      type="button"
      onClick={toggle}
      aria-pressed={complete}
    >
      <span aria-hidden="true">{complete ? "✓" : ""}</span>
      {complete ? "已学完" : "标记学完"}
    </button>
  );
}

export function BasicLessonStatus({ language, slug }: BasicProgressProps) {
  const complete = useLessonComplete(language, slug);

  return (
    <span
      className={`${styles.basicLessonStatus} ${
        complete ? styles.basicLessonStatusComplete : ""
      }`}
      data-complete={complete}
    >
      {complete ? "✓ 已学" : "未完成"}
    </span>
  );
}
