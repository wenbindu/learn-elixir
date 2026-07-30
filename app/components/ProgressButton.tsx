"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "beam-path-progress.v1";
const PROGRESS_EVENT = "beam-path-progress";

function readProgress(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

type ProgressButtonProps = {
  slug: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

export function ProgressButton({ slug }: ProgressButtonProps) {
  const complete = useSyncExternalStore(
    subscribe,
    () => readProgress().includes(slug),
    () => false,
  );

  function toggle() {
    const current = new Set(readProgress());
    if (current.has(slug)) current.delete(slug);
    else current.add(slug);

    const next = Array.from(current);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: next }));
  }

  return (
    <button
      className={`progress-button${complete ? " is-complete" : ""}`}
      type="button"
      onClick={toggle}
      aria-pressed={complete}
    >
      <span className="progress-button-mark" aria-hidden="true">
        {complete ? "✓" : ""}
      </span>
      {complete ? "这一站完成啦" : "完成这一站"}
    </button>
  );
}
