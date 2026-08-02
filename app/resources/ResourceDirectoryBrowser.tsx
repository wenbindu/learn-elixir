"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/locales";
import type { ResourceEntry, ResourceGroup } from "../resource-types";

type ResourceDirectoryBrowserProps = {
  groups: ResourceGroup[];
  resources: ResourceEntry[];
  locale: Locale;
};

const browserCopy = {
  zh: {
    search: "搜索资源",
    placeholder: "搜索 Elixir School、安装、练习……",
    clearLabel: "清空资源搜索",
    clear: "清空",
    category: "分类",
    categoryLabel: "按资源分类筛选",
    all: "全部",
    newTab: "链接会在新标签页打开",
    count: (count: number) => `${count} 个资源`,
    emptyTitle: "没有匹配的资源",
    emptyBody: "试试更短的词，或者清除分类。",
    reset: "重置筛选",
  },
  en: {
    search: "Search resources",
    placeholder: "Search Elixir School, install, practice…",
    clearLabel: "Clear resource search",
    clear: "Clear",
    category: "Category",
    categoryLabel: "Filter by resource category",
    all: "All",
    newTab: "Links open in a new tab",
    count: (count: number) => `${count} ${count === 1 ? "resource" : "resources"}`,
    emptyTitle: "No matching resources",
    emptyBody: "Try a shorter word, or clear the category filter.",
    reset: "Reset filters",
  },
} as const;

function normalize(value: string, locale: Locale) {
  return value.trim().toLocaleLowerCase(locale === "zh" ? "zh-CN" : "en-US");
}

function getHostname(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function matchesQuery(resource: ResourceEntry, query: string, locale: Locale) {
  if (!query) return true;

  return normalize(
    [
      resource.label,
      resource.shortLabel,
      resource.description,
      resource.category,
      getHostname(resource.href),
    ].join(" "),
    locale,
  ).includes(query);
}

export function ResourceDirectoryBrowser({
  groups,
  resources,
  locale,
}: ResourceDirectoryBrowserProps) {
  const copy = browserCopy[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const normalizedQuery = normalize(query, locale);

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group, groupIndex) => ({
          ...group,
          resources: group.resources.filter(
            (resource) =>
              (category === "all" || category === `group-${groupIndex}`) &&
              matchesQuery(resource, normalizedQuery, locale),
          ),
        }))
        .filter((group) => group.resources.length > 0),
    [category, groups, locale, normalizedQuery],
  );

  const resultCount = filteredGroups.reduce(
    (count, group) => count + group.resources.length,
    0,
  );

  function resetFilters() {
    setQuery("");
    setCategory("all");
  }

  return (
    <div className="resource-directory-browser">
      <div className="resource-directory-controls">
        <div className="resource-directory-search">
          <label htmlFor="resource-search-input">{copy.search}</label>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              id="resource-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.placeholder}
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={copy.clearLabel}
              >
                {copy.clear}
              </button>
            ) : null}
          </div>
        </div>

        <div className="resource-category-filter">
          <span>{copy.category}</span>
          <div aria-label={copy.categoryLabel}>
            <button
              className={category === "all" ? "is-active" : undefined}
              type="button"
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              {copy.all}
              <b>{resources.length}</b>
            </button>
            {groups.map((group, groupIndex) => {
              const categoryId = `group-${groupIndex}`;
              return (
                <button
                  className={category === categoryId ? "is-active" : undefined}
                  type="button"
                  aria-pressed={category === categoryId}
                  onClick={() => setCategory(categoryId)}
                  key={categoryId}
                >
                  {group.title}
                  <b>{group.resources.length}</b>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="resource-directory-summary" aria-live="polite">
        <p>
          {locale === "zh" ? (
            <>共 <strong>{resultCount}</strong> 个资源</>
          ) : (
            <><strong>{resultCount}</strong> {resultCount === 1 ? "resource" : "resources"}</>
          )}
          {normalizedQuery ? (
            <span>
              {locale === "zh"
                ? `，包含“${query.trim()}”`
                : ` containing “${query.trim()}”`}
            </span>
          ) : null}
        </p>
        <span>{copy.newTab}</span>
      </div>

      {filteredGroups.length ? (
        <div className="resource-directory-groups">
          {filteredGroups.map((group, groupIndex) => (
            <section
              className="resource-directory-group"
              aria-labelledby={`resource-category-${groupIndex}`}
              key={group.title}
            >
              <div className="resource-directory-group-heading">
                <div>
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h2 id={`resource-category-${groupIndex}`}>{group.title}</h2>
                </div>
                <strong>{copy.count(group.resources.length)}</strong>
              </div>

              <div className="resource-directory-grid">
                {group.resources.map((resource) => (
                  <a
                    className={`resource-directory-card resource-directory-card--${resource.accent}`}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    key={resource.href}
                  >
                    <div className="resource-directory-card-top">
                      <span className="resource-directory-monogram" aria-hidden="true">
                        {resource.shortLabel.slice(0, 2)}
                      </span>
                      <span>
                        <small>{getHostname(resource.href)}</small>
                        <b aria-hidden="true">↗</b>
                      </span>
                    </div>
                    <h3>{resource.label}</h3>
                    <p>{resource.description}</p>
                    <span className="resource-directory-card-label">
                      {resource.category}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="resource-directory-empty">
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
