"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CourseModule, CourseStage } from "../course-data";

const STORAGE_KEY = "beam-path-progress.v1";
const PROGRESS_EVENT = "beam-path-progress";

type Stage = {
  id: CourseStage;
  number: string;
  title: string;
  description: string;
};

type CourseMapProps = {
  modules: CourseModule[];
  stages: Stage[];
};

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

export function CourseMap({ modules, stages }: CourseMapProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("全部");
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
          module.languages.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesFilter =
        filter === "全部" ||
        module.languages.some((language) =>
          language.toLowerCase().includes(filter.toLowerCase()),
        );

      return matchesQuery && matchesFilter;
    });
  }, [filter, modules, query]);

  const percent = Math.round((completed.length / modules.length) * 100);

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
      window.alert("这不是可识别的 BEAM Path 进度文件。");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="course-map">
      <div className="course-controls">
        <label className="course-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">搜索课程</span>
          <input
            type="search"
            placeholder="搜索：模式匹配、mailbox、Supervisor…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="course-filters" aria-label="课程筛选">
          {["全部", "Elixir", "Erlang", "OTP"].map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "is-active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="progress-panel">
        <div>
          <span>你的学习进度</span>
          <strong>
            {completed.length} / {modules.length} 模块
          </strong>
        </div>
        <div className="progress-track" aria-label={`课程进度 ${percent}%`}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-percent">{percent}%</span>
        <div className="progress-actions">
          <button type="button" onClick={exportProgress}>
            导出
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            导入
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
                  <Link
                    href={`/learn/${module.slug}`}
                    className={`module-card module-card--${module.stage}${
                      isComplete ? " is-complete" : ""
                    }`}
                    key={module.slug}
                  >
                    <div className="module-card-top">
                      <span className="module-number">{module.number}</span>
                      <div className="module-badges">
                        {module.languages.map((language) => (
                          <span key={language}>{language}</span>
                        ))}
                      </div>
                    </div>
                    <h4>{module.title}</h4>
                    <p>{module.summary}</p>
                    <div className="module-card-meta">
                      <span>{module.lessons} 个检查点</span>
                      <span>{module.duration}</span>
                      {isComplete ? <strong>✓ 已完成</strong> : <strong>开始 →</strong>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 ? (
        <div className="course-empty">
          <span>没有匹配的模块</span>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("全部");
            }}
          >
            清除筛选
          </button>
        </div>
      ) : null}
    </div>
  );
}
