"use client";

import { useMemo, useState } from "react";
import { InlineCodeText } from "../components/InlineCodeText";
import type { Locale } from "../i18n/locales";
import type {
  KeywordEntry,
  Language,
  Scope,
} from "./keyword-data";

type LanguageFilterId = Language | "all";
type ScopeFilterId = Scope | "all";
type LocalizedText = Record<Locale, string>;

type KeywordDictionaryProps = {
  locale: Locale;
  entries: KeywordEntry[];
};

const languageOptions: ReadonlyArray<{
  id: LanguageFilterId;
  label: LocalizedText;
  shortLabel: LocalizedText;
}> = [
  {
    id: "all",
    label: { zh: "两种语言", en: "Both languages" },
    shortLabel: { zh: "全部", en: "All" },
  },
  {
    id: "elixir",
    label: { zh: "只看 Elixir", en: "Elixir only" },
    shortLabel: { zh: "Elixir", en: "Elixir" },
  },
  {
    id: "erlang",
    label: { zh: "只看 Erlang", en: "Erlang only" },
    shortLabel: { zh: "Erlang", en: "Erlang" },
  },
];

const scopeOptions: ReadonlyArray<{
  id: ScopeFilterId;
  label: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "reserved",
    label: { zh: "严格保留字", en: "Strictly reserved words" },
    description: {
      zh: "语言已预留，不能用作普通变量名或函数名",
      en: "Reserved by the language; not available as ordinary variable or function names",
    },
  },
  {
    id: "special",
    label: { zh: "Elixir 特殊形式", en: "Elixir special forms" },
    description: {
      zh: "由编译器直接处理，多数不是严格保留字",
      en: "Handled directly by the compiler; most are not strictly reserved",
    },
  },
  {
    id: "common",
    label: { zh: "常用宏与声明", en: "Common macros and declarations" },
    description: {
      zh: "常被叫作关键字，实际是宏、属性或指令",
      en: "Often called keywords, but really macros, attributes, or directives",
    },
  },
  {
    id: "all",
    label: { zh: "全部术语", en: "All terms" },
    description: {
      zh: "把三种类型放在一起看",
      en: "See all three kinds together",
    },
  },
];

const languageMeta: Record<
  Language,
  { label: string; eyebrow: string; description: LocalizedText }
> = {
  elixir: {
    label: "Elixir",
    eyebrow: "EX",
    description: {
      zh: "15 个严格保留字、常用特殊形式和 Kernel 宏",
      en: "15 strictly reserved words, common special forms, and Kernel macros",
    },
  },
  erlang: {
    label: "Erlang",
    eyebrow: "ERL",
    description: {
      zh: "29 个严格保留字、常见模块属性和预处理指令",
      en: "29 strictly reserved words, common module attributes, and preprocessor directives",
    },
  },
};

const scopeLabels: Record<Scope, LocalizedText> = {
  reserved: { zh: "严格保留字", en: "Strictly reserved" },
  special: { zh: "特殊形式", en: "Special form" },
  common: { zh: "宏 / 声明", en: "Macro / declaration" },
};

const dictionaryCopy = {
  zh: {
    searchLabel: "搜索术语或中文解释",
    searchPlaceholder: "搜索 when、receive、模式匹配……",
    clearSearchLabel: "清空搜索",
    clear: "清空",
    language: "语言",
    languageFilterLabel: "按语言筛选",
    scopeFilterLabel: "按术语类别筛选",
    resultHint: "可按语言或分类缩小范围",
    queryLead: "，包含“",
    listHeadings: ["术语与类型", "作用与限制", "最小示例"],
    analogyLabel: "帮助理解",
    emptyTitle: "没有找到",
    emptyBody: "试试更短的中文词或英文词，也可以恢复默认分类。",
    reset: "恢复默认",
  },
  en: {
    searchLabel: "Search terms or explanations",
    searchPlaceholder: "Search when, receive, pattern matching...",
    clearSearchLabel: "Clear search",
    clear: "Clear",
    language: "Language",
    languageFilterLabel: "Filter by language",
    scopeFilterLabel: "Filter by term category",
    resultHint: "Narrow the list by language or category",
    queryLead: " containing “",
    listHeadings: ["Term and type", "Purpose and limits", "Tiny example"],
    analogyLabel: "A way to picture it",
    emptyTitle: "Nothing found",
    emptyBody:
      "Try a shorter English term or explanation, or restore the default filters.",
    reset: "Restore defaults",
  },
} as const;

function normalize(value: string, locale: Locale) {
  return value
    .trim()
    .toLocaleLowerCase(locale === "zh" ? "zh-CN" : "en-US");
}

function matchesQuery(
  entry: KeywordEntry,
  query: string,
  locale: Locale,
) {
  if (!query) return true;

  return normalize(
    [
      entry.term,
      entry.role,
      entry.summary,
      entry.detail,
      entry.analogy ?? "",
      entry.example,
      entry.note ?? "",
      entry.language,
      scopeLabels[entry.scope][locale],
    ].join(" "),
    locale,
  ).includes(query);
}

function formatEntryCount(locale: Locale, count: number) {
  if (locale === "zh") return `${count} 项`;
  return `${count} ${count === 1 ? "entry" : "entries"}`;
}

export function KeywordDictionary({
  locale,
  entries,
}: KeywordDictionaryProps) {
  const copy = dictionaryCopy[locale];
  const [languageId, setLanguageId] =
    useState<LanguageFilterId>("all");
  const [scopeId, setScopeId] = useState<ScopeFilterId>("reserved");
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query, locale);
  const filteredEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (languageId === "all" || entry.language === languageId) &&
          (scopeId === "all" || entry.scope === scopeId) &&
          matchesQuery(entry, normalizedQuery, locale),
      ),
    [entries, languageId, locale, normalizedQuery, scopeId],
  );

  const groups = (["elixir", "erlang"] as const)
    .map((groupLanguage) => ({
      language: groupLanguage,
      entries: filteredEntries.filter(
        (entry) => entry.language === groupLanguage,
      ),
    }))
    .filter((group) => group.entries.length > 0);

  const resetFilters = () => {
    setLanguageId("all");
    setScopeId("reserved");
    setQuery("");
  };

  return (
    <div className="keyword-browser">
      <div className="keyword-controls">
        <div className="keyword-search">
          <label htmlFor="keyword-search-input">{copy.searchLabel}</label>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              id="keyword-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={copy.clearSearchLabel}
              >
                {copy.clear}
              </button>
            ) : null}
          </div>
        </div>

        <div className="keyword-language-filter">
          <span>{copy.language}</span>
          <div aria-label={copy.languageFilterLabel}>
            {languageOptions.map((option) => (
              <button
                className={
                  languageId === option.id ? "is-active" : undefined
                }
                type="button"
                aria-pressed={languageId === option.id}
                onClick={() => setLanguageId(option.id)}
                title={option.label[locale]}
                key={option.id}
              >
                {option.shortLabel[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="keyword-scope-tabs" aria-label={copy.scopeFilterLabel}>
        {scopeOptions.map((option) => {
          const count = entries.filter(
            (entry) =>
              (option.id === "all" || entry.scope === option.id) &&
              (languageId === "all" || entry.language === languageId),
          ).length;

          return (
            <button
              className={scopeId === option.id ? "is-active" : undefined}
              type="button"
              aria-pressed={scopeId === option.id}
              onClick={() => setScopeId(option.id)}
              key={option.id}
            >
              <span>
                <strong>{option.label[locale]}</strong>
                <small>{option.description[locale]}</small>
              </span>
              <b>{count}</b>
            </button>
          );
        })}
      </div>

      <div className="keyword-result-summary" aria-live="polite">
        <p>
          {locale === "zh" ? "共 " : null}
          <strong>{filteredEntries.length}</strong>
          {locale === "zh"
            ? " 项"
            : ` ${filteredEntries.length === 1 ? "entry" : "entries"}`}
          {normalizedQuery ? (
            <>
              {copy.queryLead}
              <span>{query.trim()}</span>”
            </>
          ) : null}
        </p>
        <span>{copy.resultHint}</span>
      </div>

      {groups.length ? (
        <div className="keyword-groups">
          {groups.map((group) => {
            const meta = languageMeta[group.language];

            return (
              <section
                className={`keyword-group keyword-group--${group.language}`}
                aria-labelledby={`keyword-group-${group.language}`}
                key={group.language}
              >
                <div className="keyword-group-heading">
                  <div className="keyword-group-monogram" aria-hidden="true">
                    {meta.eyebrow}
                  </div>
                  <div>
                    <h2 id={`keyword-group-${group.language}`}>
                      {meta.label}
                    </h2>
                    <p>{meta.description[locale]}</p>
                  </div>
                  <strong>
                    {formatEntryCount(locale, group.entries.length)}
                  </strong>
                </div>

                <div className="keyword-list-heading" aria-hidden="true">
                  {copy.listHeadings.map((heading) => (
                    <span key={heading}>{heading}</span>
                  ))}
                </div>

                <div className="keyword-list">
                  {group.entries.map((entry) => (
                    <article
                      className={`keyword-entry keyword-entry--${entry.scope}`}
                      key={`${entry.language}-${entry.scope}-${entry.term}`}
                    >
                      <div className="keyword-entry-term">
                        <code>{entry.term}</code>
                        <span>{scopeLabels[entry.scope][locale]}</span>
                        <small>{entry.role}</small>
                      </div>
                      <div className="keyword-entry-copy">
                        <h3>
                          <InlineCodeText text={entry.summary} />
                        </h3>
                        <p>
                          <InlineCodeText text={entry.detail} />
                        </p>
                        {entry.analogy ? (
                          <div className="keyword-entry-analogy">
                            <span>{copy.analogyLabel}</span>
                            <InlineCodeText text={entry.analogy} />
                          </div>
                        ) : null}
                        {entry.note ? (
                          <div className="keyword-entry-note">
                            <span aria-hidden="true">!</span>
                            <InlineCodeText text={entry.note} />
                          </div>
                        ) : null}
                      </div>
                      <pre>
                        <code>{entry.example}</code>
                      </pre>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="keyword-empty">
          <span aria-hidden="true">∅</span>
          <h2>{copy.emptyTitle}</h2>
          <p>{copy.emptyBody}</p>
          <button type="button" onClick={resetFilters}>
            {copy.reset}
          </button>
        </div>
      )}
    </div>
  );
}
