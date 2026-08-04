"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { CopyBlock } from "./CopyBlock";
import type { Locale } from "../i18n/locales";
import styles from "./CodeLanguageSwitcher.module.css";

type CodeLanguage = "elixir" | "erlang";
type CodeView = CodeLanguage | "compare";

type CodeLanguageSwitcherProps = {
  locale: Locale;
  elixirCode: string;
  erlangCode: string;
  allowCompare?: boolean;
};

const storageKey = "beam-path-code-language";
const preferenceEvent = "beam-path-code-language-change";

function readLanguagePreference(): CodeLanguage {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "erlang" ? "erlang" : "elixir";
  } catch {
    return "elixir";
  }
}

function subscribeToLanguagePreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(preferenceEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(preferenceEvent, onChange);
  };
}

export function CodeLanguageSwitcher({
  locale,
  elixirCode,
  erlangCode,
  allowCompare = false,
}: CodeLanguageSwitcherProps) {
  const preferredLanguage = useSyncExternalStore<CodeLanguage>(
    subscribeToLanguagePreference,
    readLanguagePreference,
    () => "elixir",
  );
  const [sessionLanguage, setSessionLanguage] =
    useState<CodeLanguage | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const view: CodeView =
    allowCompare && showComparison
      ? "compare"
      : (sessionLanguage ?? preferredLanguage);
  const panelId = useId();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const labels =
    locale === "zh"
      ? {
          picker: "选择代码语言",
          elixir: "Elixir",
          erlang: "Erlang",
          compare: "对照",
          current: "当前代码",
        }
      : {
          picker: "Choose a code language",
          elixir: "Elixir",
          erlang: "Erlang",
          compare: "Compare",
          current: "Current code",
        };

  const views: CodeView[] = allowCompare
    ? ["elixir", "erlang", "compare"]
    : ["elixir", "erlang"];

  function choose(nextView: CodeView) {
    if (nextView === "compare") {
      setShowComparison(true);
      return;
    }

    setShowComparison(false);
    setSessionLanguage(nextView);
    try {
      window.localStorage.setItem(storageKey, nextView);
    } catch {
      // The active tab still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(preferenceEvent));
  }

  function moveFocus(currentIndex: number, direction: number) {
    const nextIndex =
      (currentIndex + direction + views.length) % views.length;
    const nextView = views[nextIndex];
    choose(nextView);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <div className={styles.switcher}>
      <div className={styles.toolbar}>
        <span>{labels.current}</span>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label={labels.picker}
        >
          {views.map((item, index) => (
            <button
              className={item === view ? styles.activeTab : undefined}
              type="button"
              role="tab"
              id={`${panelId}-${item}-tab`}
              aria-controls={`${panelId}-panel`}
              aria-selected={item === view}
              tabIndex={item === view ? 0 : -1}
              key={item}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              onClick={() => choose(item)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveFocus(index, 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveFocus(index, -1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  choose(views[0]);
                  tabsRef.current[0]?.focus();
                } else if (event.key === "End") {
                  event.preventDefault();
                  const lastIndex = views.length - 1;
                  choose(views[lastIndex]);
                  tabsRef.current[lastIndex]?.focus();
                }
              }}
            >
              {labels[item]}
            </button>
          ))}
        </div>
      </div>

      <div
        className={view === "compare" ? styles.compareGrid : styles.single}
        role="tabpanel"
        id={`${panelId}-panel`}
        aria-labelledby={`${panelId}-${view}-tab`}
      >
        {view === "elixir" || view === "compare" ? (
          <CopyBlock
            code={elixirCode}
            language="elixir"
            label="Elixir"
            locale={locale}
          />
        ) : null}
        {view === "erlang" || view === "compare" ? (
          <CopyBlock
            code={erlangCode}
            language="erlang"
            label="Erlang"
            locale={locale}
          />
        ) : null}
      </div>
    </div>
  );
}
