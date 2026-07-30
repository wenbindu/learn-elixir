"use client";

import { useMemo, useState } from "react";
import { InlineCodeText } from "../components/InlineCodeText";
import {
  keywordEntries,
  type KeywordEntry,
  type Language,
  type Scope,
} from "./keyword-data";

type LanguageFilter = Language | "all";
type ScopeFilter = Scope | "all";

const languageOptions: Array<{
  value: LanguageFilter;
  label: string;
  shortLabel: string;
}> = [
  { value: "all", label: "两种语言", shortLabel: "全部" },
  { value: "elixir", label: "只看 Elixir", shortLabel: "Elixir" },
  { value: "erlang", label: "只看 Erlang", shortLabel: "Erlang" },
];

const scopeOptions: Array<{
  value: ScopeFilter;
  label: string;
  description: string;
}> = [
  {
    value: "reserved",
    label: "严格保留字",
    description: "语言已预留，不能用作普通变量名或函数名",
  },
  {
    value: "special",
    label: "Elixir 特殊形式",
    description: "由编译器直接处理，多数不是严格保留字",
  },
  {
    value: "common",
    label: "常用宏与声明",
    description: "常被叫作关键字，实际是宏、属性或指令",
  },
  {
    value: "all",
    label: "全部术语",
    description: "把三种类型放在一起看",
  },
];

const languageMeta: Record<
  Language,
  { label: string; eyebrow: string; description: string }
> = {
  elixir: {
    label: "Elixir",
    eyebrow: "EX",
    description: "15 个严格保留字、常用特殊形式和 Kernel 宏",
  },
  erlang: {
    label: "Erlang",
    eyebrow: "ERL",
    description: "29 个严格保留字、常见模块属性和预处理指令",
  },
};

const scopeLabels: Record<Scope, string> = {
  reserved: "严格保留字",
  special: "特殊形式",
  common: "宏 / 声明",
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("zh-CN");
}

function matchesQuery(entry: KeywordEntry, query: string) {
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
      scopeLabels[entry.scope],
    ].join(" "),
  ).includes(query);
}

export function KeywordDictionary() {
  const [language, setLanguage] = useState<LanguageFilter>("all");
  const [scope, setScope] = useState<ScopeFilter>("reserved");
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query);
  const filteredEntries = useMemo(
    () =>
      keywordEntries.filter(
        (entry) =>
          (language === "all" || entry.language === language) &&
          (scope === "all" || entry.scope === scope) &&
          matchesQuery(entry, normalizedQuery),
      ),
    [language, normalizedQuery, scope],
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
    setLanguage("all");
    setScope("reserved");
    setQuery("");
  };

  return (
    <div className="keyword-browser">
      <div className="keyword-controls">
        <div className="keyword-search">
          <label htmlFor="keyword-search-input">搜索术语或中文解释</label>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              id="keyword-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 when、receive、模式匹配……"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="清空搜索"
              >
                清空
              </button>
            ) : null}
          </div>
        </div>

        <div className="keyword-language-filter">
          <span>语言</span>
          <div aria-label="按语言筛选">
            {languageOptions.map((option) => (
              <button
                className={language === option.value ? "is-active" : undefined}
                type="button"
                aria-pressed={language === option.value}
                onClick={() => setLanguage(option.value)}
                title={option.label}
                key={option.value}
              >
                {option.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="keyword-scope-tabs" aria-label="按术语类别筛选">
        {scopeOptions.map((option) => {
          const count = keywordEntries.filter(
            (entry) =>
              (option.value === "all" || entry.scope === option.value) &&
              (language === "all" || entry.language === language),
          ).length;

          return (
            <button
              className={scope === option.value ? "is-active" : undefined}
              type="button"
              aria-pressed={scope === option.value}
              onClick={() => setScope(option.value)}
              key={option.value}
            >
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
              <b>{count}</b>
            </button>
          );
        })}
      </div>

      <div className="keyword-result-summary" aria-live="polite">
        <p>
          共 <strong>{filteredEntries.length}</strong> 项
          {normalizedQuery ? (
            <>
              ，包含“<span>{query.trim()}</span>”
            </>
          ) : null}
        </p>
        <span>可按语言或分类缩小范围</span>
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
                    <h2 id={`keyword-group-${group.language}`}>{meta.label}</h2>
                    <p>{meta.description}</p>
                  </div>
                  <strong>{group.entries.length} 项</strong>
                </div>

                <div className="keyword-list-heading" aria-hidden="true">
                  <span>术语与类型</span>
                  <span>作用与限制</span>
                  <span>最小示例</span>
                </div>

                <div className="keyword-list">
                  {group.entries.map((entry) => (
                    <article
                      className={`keyword-entry keyword-entry--${entry.scope}`}
                      key={`${entry.language}-${entry.scope}-${entry.term}`}
                    >
                      <div className="keyword-entry-term">
                        <code>{entry.term}</code>
                        <span>{scopeLabels[entry.scope]}</span>
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
                            <span>帮助理解</span>
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
          <h2>没有找到</h2>
          <p>试试更短的中文词或英文词，也可以恢复默认分类。</p>
          <button type="button" onClick={resetFilters}>
            恢复默认
          </button>
        </div>
      )}
    </div>
  );
}
