"use client";

import { useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = Exclude<ThemePreference, "system">;

const STORAGE_KEY = "beam-path-theme";
const THEME_EVENT = "beam-path-theme-change";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
let memoryPreference: ThemePreference = "system";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  shortLabel: string;
}> = [
  { value: "light", label: "浅色模式", shortLabel: "浅" },
  { value: "dark", label: "深色模式", shortLabel: "深" },
  { value: "system", label: "跟随系统", shortLabel: "系统" },
];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isThemePreference(stored) ? stored : memoryPreference;
  } catch {
    return memoryPreference;
  }
}

function savePreference(preference: ThemePreference) {
  memoryPreference = preference;

  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // The in-memory choice still works when storage is unavailable.
  }
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_MODE_QUERY).matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;
}

function getSnapshot() {
  const preference = readPreference();
  return `${preference}:${resolveTheme(preference)}`;
}

function getServerSnapshot() {
  return "system:light";
}

function subscribe(callback: () => void) {
  const colorScheme = window.matchMedia(DARK_MODE_QUERY);

  function syncTheme() {
    applyTheme(readPreference());
    callback();
  }

  window.addEventListener("storage", syncTheme);
  window.addEventListener(THEME_EVENT, syncTheme);
  colorScheme.addEventListener("change", syncTheme);

  return () => {
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener(THEME_EVENT, syncTheme);
    colorScheme.removeEventListener("change", syncTheme);
  };
}

export function ThemeSwitcher() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const preference = snapshot.split(":")[0] as ThemePreference;

  function selectTheme(nextTheme: ThemePreference) {
    savePreference(nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div
      className="theme-switcher"
      role="group"
      aria-label="显示主题"
      title="切换显示主题"
    >
      {themeOptions.map((option) => {
        const selected = preference === option.value;

        return (
          <button
            key={option.value}
            className={`theme-option${selected ? " is-active" : ""}`}
            type="button"
            aria-label={option.label}
            aria-pressed={selected}
            onClick={() => selectTheme(option.value)}
            title={option.label}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
