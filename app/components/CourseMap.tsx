"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CourseModule, CourseStage } from "../course-data";
import type { Locale } from "../i18n/locales";
import { InlineCodeText } from "./InlineCodeText";
import { LocalizedLink } from "./LocalizedLink";

const STORAGE_KEY = "beam-path-progress.v1";
const PROGRESS_EVENT = "beam-path-progress";

type Stage = {
  id: CourseStage;
  number: string;
  title: string;
  description: string;
};

type CourseMapProps = {
  locale: Locale;
  modules: CourseModule[];
  stages: Stage[];
};

type CourseFilterId = "all" | "elixir" | "erlang" | "otp";

const filterOptions: ReadonlyArray<{
  id: CourseFilterId;
  label: Record<Locale, string>;
}> = [
  { id: "all", label: { zh: "全部", en: "All" } },
  { id: "elixir", label: { zh: "Elixir", en: "Elixir" } },
  { id: "erlang", label: { zh: "Erlang", en: "Erlang" } },
  { id: "otp", label: { zh: "OTP", en: "OTP" } },
];

const courseMapCopy = {
  zh: {
    searchLabel: "搜索学习内容",
    searchPlaceholder: "搜索：模式匹配、mailbox、Supervisor…",
    filtersLabel: "课程筛选",
    progressKicker: "主线进度 · 前置与可选复习不计入",
    progressCount: (completed: number, total: number) =>
      `${completed} / ${total} 个主线小站`,
    progressLabel: (percent: number) => `课程进度 ${percent}%`,
    exportProgress: "保存进度",
    importProgress: "读入进度",
    importError:
      "没有认出这个进度文件。请重新选择从 BEAM Path 保存的文件。",
    optionalReview: "可选复习",
    prerequisite: "前置准备",
    lessonCount: (count: number) => `${count} 次动手与自查`,
    completed: "✓ 走过了",
    open: "去看看 →",
    empty: "暂时没找到这个内容，换个更短的词试试吧",
    clearFilters: "清除筛选",
  },
  en: {
    searchLabel: "Search learning topics",
    searchPlaceholder: "Search: pattern matching, mailbox, Supervisor...",
    filtersLabel: "Course filters",
    progressKicker: "Mainline progress · setup and optional reviews excluded",
    progressCount: (completed: number, total: number) =>
      `${completed} / ${total} mainline stations`,
    progressLabel: (percent: number) => `Course progress ${percent}%`,
    exportProgress: "Export progress",
    importProgress: "Import progress",
    importError:
      "This progress file was not recognized. Choose a file previously exported from BEAM Path.",
    optionalReview: "Optional review",
    prerequisite: "Setup",
    lessonCount: (count: number) =>
      `${count} hands-on ${
        count === 1 ? "task and check" : "tasks and checks"
      }`,
    completed: "✓ Completed",
    open: "Open →",
    empty: "Nothing matched. Try a shorter search term.",
    clearFilters: "Clear filters",
  },
} as const;

function readProgress(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function CourseMap({ locale, modules, stages }: CourseMapProps) {
  const copy = courseMapCopy[locale];
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState<CourseFilterId>("all");
  const [completed, setCompleted] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function sync(event?: Event) {
      if (event instanceof CustomEvent && Array.isArray(event.detail)) {
        setCompleted(event.detail);
      } else {
        setCompleted(readProgress());
      }
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(PROGRESS_EVENT, sync);
    };
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return modules.filter((module) => {
      const matchesQuery =
        !normalized ||
        [
          module.title,
          module.subtitle,
          module.summary,
          module.question,
          module.incident.title,
          module.patterns.map((pattern) => pattern.name).join(" "),
          module.languages.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesFilter =
        filterId === "all" ||
        module.languages.some((language) =>
          language.toLowerCase().includes(filterId),
        );

      return matchesQuery && matchesFilter;
    });
  }, [filterId, modules, query]);

  const mainlineModules = modules.filter(
    (module) => !module.optionalReview && !module.prerequisite,
  );
  const completedMainline = mainlineModules.filter((module) =>
    completed.includes(module.slug),
  );
  const percent = Math.round(
    (completedMainline.length / mainlineModules.length) * 100,
  );

  function exportProgress() {
    const payload = {
      schema: "beam-path-progress",
      version: 1,
      exportedAt: new Date().toISOString(),
      completed: readProgress(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "beam-path-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function importProgress(file?: File) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (
        parsed?.schema !== "beam-path-progress" ||
        parsed?.version !== 1 ||
        !Array.isArray(parsed?.completed)
      ) {
        throw new Error("invalid schema");
      }

      const allowed = new Set(modules.map((module) => module.slug));
      const next = parsed.completed.filter(
        (slug: unknown) => typeof slug === "string" && allowed.has(slug),
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setCompleted(next);
      window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: next }));
    } catch {
      window.alert(copy.importError);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="course-map">
      <div className="course-controls">
        <label className="course-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">{copy.searchLabel}</span>
          <input
            type="search"
            placeholder={copy.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="course-filters" aria-label={copy.filtersLabel}>
          {filterOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              className={filterId === option.id ? "is-active" : ""}
              onClick={() => setFilterId(option.id)}
            >
              {option.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="progress-panel">
        <div>
          <span>{copy.progressKicker}</span>
          <strong>
            {copy.progressCount(
              completedMainline.length,
              mainlineModules.length,
            )}
          </strong>
        </div>
        <div className="progress-track" aria-label={copy.progressLabel(percent)}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-percent">{percent}%</span>
        <div className="progress-actions">
          <button type="button" onClick={exportProgress}>
            {copy.exportProgress}
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            {copy.importProgress}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(event) => importProgress(event.target.files?.[0])}
          />
        </div>
      </div>

      {stages.map((stage) => {
        const stageModules = filtered.filter(
          (module) => module.stage === stage.id,
        );
        if (stageModules.length === 0) return null;

        return (
          <section className="course-stage" key={stage.id}>
            <div className="stage-heading">
              <span>{stage.number}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </div>

            <div className="module-grid">
              {stageModules.map((module) => {
                const isComplete = completed.includes(module.slug);
                return (
                  <LocalizedLink
                    href={`/learn/${module.slug}`}
                    locale={locale}
                    className={`module-card module-card--${module.stage}${
                      isComplete ? " is-complete" : ""
                    }`}
                    key={module.slug}
                  >
                    <div className="module-card-top">
                      <span className="module-number">{module.number}</span>
                      <div className="module-badges">
                        {module.optionalReview ? (
                          <span className="optional-review-badge">
                            {copy.optionalReview}
                          </span>
                        ) : null}
                        {module.prerequisite ? (
                          <span className="prerequisite-badge">
                            {copy.prerequisite}
                          </span>
                        ) : null}
                        {module.languages.map((language) => (
                          <span key={language}>{language}</span>
                        ))}
                      </div>
                    </div>
                    <h4>{module.title}</h4>
                    <p className="module-card-question">
                      <InlineCodeText text={module.question} />
                    </p>
                    <div className="module-card-meta">
                      <span>{copy.lessonCount(module.lessons)}</span>
                      <span>{module.duration}</span>
                      {isComplete ? (
                        <strong>{copy.completed}</strong>
                      ) : (
                        <strong>{copy.open}</strong>
                      )}
                    </div>
                  </LocalizedLink>
                );
              })}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 ? (
        <div className="course-empty">
          <span>{copy.empty}</span>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilterId("all");
            }}
          >
            {copy.clearFilters}
          </button>
        </div>
      ) : null}
    </div>
  );
}
