"use client";

import { useMemo, useState } from "react";
import type {
  ResourceEntry,
  ResourceGroup,
} from "../resource-types";

type ResourceDirectoryBrowserProps = {
  groups: ResourceGroup[];
  resources: ResourceEntry[];
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("zh-CN");
}

function getHostname(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function matchesQuery(resource: ResourceEntry, query: string) {
  if (!query) return true;

  return normalize(
    [
      resource.label,
      resource.shortLabel,
      resource.description,
      resource.category,
      getHostname(resource.href),
    ].join(" "),
  ).includes(query);
}

export function ResourceDirectoryBrowser({
  groups,
  resources,
}: ResourceDirectoryBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const normalizedQuery = normalize(query);

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          resources: group.resources.filter(
            (resource) =>
              (category === "all" || resource.category === category) &&
              matchesQuery(resource, normalizedQuery),
          ),
        }))
        .filter((group) => group.resources.length > 0),
    [category, groups, normalizedQuery],
  );

  const resultCount = filteredGroups.reduce(
    (count, group) => count + group.resources.length,
    0,
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="resource-directory-browser">
      <div className="resource-directory-controls">
        <div className="resource-directory-search">
          <label htmlFor="resource-search-input">想找什么？</label>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              id="resource-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 Elixir School、安装、练习……"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="清空资源搜索"
              >
                清空
              </button>
            ) : null}
          </div>
        </div>

        <div className="resource-category-filter">
          <span>分类</span>
          <div aria-label="按资源分类筛选">
            <button
              className={category === "all" ? "is-active" : undefined}
              type="button"
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              全部
              <b>{resources.length}</b>
            </button>
            {groups.map((group) => (
              <button
                className={category === group.title ? "is-active" : undefined}
                type="button"
                aria-pressed={category === group.title}
                onClick={() => setCategory(group.title)}
                key={group.title}
              >
                {group.title}
                <b>{group.resources.length}</b>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="resource-directory-summary" aria-live="polite">
        <p>
          找到了 <strong>{resultCount}</strong> 个资源
          {normalizedQuery ? (
            <>
              ，包含“<span>{query.trim()}</span>”
            </>
          ) : null}
        </p>
        <span>点开资源时，会使用一个新窗口</span>
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
                  <h2 id={`resource-category-${groupIndex}`}>
                    {group.title}
                  </h2>
                </div>
                <strong>{group.resources.length} 个资源</strong>
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
          <h2>没有匹配的资源</h2>
          <p>可能只是叫法不同。试试更短的词，或者清除分类重新找。</p>
          <button type="button" onClick={resetFilters}>
            重置筛选
          </button>
        </div>
      )}
    </div>
  );
}
