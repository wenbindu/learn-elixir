"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "../i18n/locales";
import { sharedUi } from "../i18n/ui";

type Theme = "light" | "dark";

const STORAGE_KEY = "beam-path-theme";
const THEME_EVENT = "beam-path-theme-change";
let memoryTheme: Theme = "light";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : memoryTheme;
  } catch {
    return memoryTheme;
  }
}

function saveTheme(theme: Theme) {
  memoryTheme = theme;

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // The in-memory choice still works when storage is unavailable.
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getSnapshot() {
  return readTheme();
}

function getServerSnapshot() {
  return "light";
}

function subscribe(callback: () => void) {
  function syncTheme() {
    applyTheme(readTheme());
    callback();
  }

  window.addEventListener("storage", syncTheme);
  window.addEventListener(THEME_EVENT, syncTheme);

  return () => {
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener(THEME_EVENT, syncTheme);
  };
}

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const actionLabel = isDark
    ? sharedUi[locale].theme.toLight
    : sharedUi[locale].theme.toDark;

  function toggleTheme() {
    saveTheme(nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      className={`theme-switch${isDark ? " is-dark" : ""}`}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={actionLabel}
      title={actionLabel}
      onClick={toggleTheme}
    >
      <span className="theme-switch-knob" aria-hidden="true" />
    </button>
  );
}
