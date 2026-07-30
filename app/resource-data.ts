import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  RESOURCE_ACCENTS,
  type ResourceAccent,
  type ResourceDirectory,
  type ResourceGroup,
  type ResourceLink,
} from "./resource-types";

const RESOURCE_FILE = path.join(process.cwd(), "content", "resources.md");
const DEFAULT_TITLE = "BEAM 学习工具箱";
const RESOURCE_LINE_PATTERN =
  /^- \[([^\]]*)\]\(([^)]*)\)\s+—\s*(.*)$/;
const METADATA_LINE_PATTERN = /^\s{2,}-\s+([^:]+):\s*(.*)$/;

function configurationError(lineNumber: number, message: string): Error {
  return new Error(`资源配置第 ${lineNumber} 行：${message}`);
}

function inferAccent(label: string, href: string): ResourceAccent {
  const value = `${label} ${href}`.toLowerCase();

  if (value.includes("elixir")) {
    return "elixir";
  }

  if (
    value.includes("erlang") ||
    value.includes("erlang.org") ||
    value.includes("otp")
  ) {
    return "erlang";
  }

  if (
    value.includes("hex.pm") ||
    value.includes("hexdocs") ||
    value.includes("livebook") ||
    value.includes("phoenix")
  ) {
    return "tool";
  }

  return "beam";
}

function validateUrl(href: string, lineNumber: number): string {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(href);
  } catch {
    throw configurationError(lineNumber, `“${href}”不是有效 URL。`);
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw configurationError(
      lineNumber,
      `URL 只支持 http 或 https，当前为“${parsedUrl.protocol}”。`,
    );
  }

  return parsedUrl.href;
}

function applyMetadata(
  resource: ResourceLink,
  key: string,
  value: string,
  lineNumber: number,
) {
  if (key === "short") {
    if (!value) {
      throw configurationError(lineNumber, "short 不能为空。");
    }

    resource.shortLabel = value;
    return;
  }

  if (key === "accent") {
    if (!RESOURCE_ACCENTS.includes(value as ResourceAccent)) {
      throw configurationError(
        lineNumber,
        `accent 只可为 ${RESOURCE_ACCENTS.join("、")}，当前为“${value}”。`,
      );
    }

    resource.accent = value as ResourceAccent;
    return;
  }

  if (key === "featured") {
    if (value !== "true" && value !== "false") {
      throw configurationError(
        lineNumber,
        `featured 只可为 true 或 false，当前为“${value}”。`,
      );
    }

    resource.featured = value === "true";
    return;
  }

  throw configurationError(
    lineNumber,
    `不支持元数据“${key}”；可用 short、accent、featured。`,
  );
}

export function parseResourceMarkdown(source: string): ResourceDirectory {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const groups: ResourceGroup[] = [];
  const resources: ResourceLink[] = [];
  const categoryLines = new Map<string, number>();
  const urlLines = new Map<string, number>();
  let title = DEFAULT_TITLE;
  let titleLine: number | undefined;
  let currentGroup: ResourceGroup | undefined;
  let currentResource: ResourceLink | undefined;
  let currentMetadataKeys = new Set<string>();
  let insideHtmlComment = false;

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.trimEnd();
    const trimmedLine = line.trim();

    if (insideHtmlComment) {
      if (trimmedLine.includes("-->")) {
        insideHtmlComment = false;
      }
      return;
    }

    if (trimmedLine.startsWith("<!--")) {
      if (!trimmedLine.includes("-->")) {
        insideHtmlComment = true;
      }
      return;
    }

    if (!trimmedLine) {
      return;
    }

    const categoryMatch = /^##\s+(.+)$/.exec(line);
    if (categoryMatch) {
      const category = categoryMatch[1].trim();
      const previousLine = categoryLines.get(category);

      if (previousLine !== undefined) {
        throw configurationError(
          lineNumber,
          `分类“${category}”重复；首次出现在第 ${previousLine} 行。`,
        );
      }

      currentGroup = {
        title: category,
        resources: [],
      };
      groups.push(currentGroup);
      categoryLines.set(category, lineNumber);
      currentResource = undefined;
      currentMetadataKeys = new Set<string>();
      return;
    }

    const titleMatch = /^#\s+(.+)$/.exec(line);
    if (titleMatch) {
      if (titleLine !== undefined) {
        throw configurationError(
          lineNumber,
          `页面标题重复；首次出现在第 ${titleLine} 行。`,
        );
      }

      title = titleMatch[1].trim();
      titleLine = lineNumber;
      currentResource = undefined;
      currentMetadataKeys = new Set<string>();
      return;
    }

    const resourceMatch = RESOURCE_LINE_PATTERN.exec(line);
    if (resourceMatch) {
      if (!currentGroup) {
        throw configurationError(
          lineNumber,
          "资源前需要一个“## 分类”。",
        );
      }

      const label = resourceMatch[1].trim();
      const href = resourceMatch[2].trim();
      const description = resourceMatch[3].trim();

      if (!label) {
        throw configurationError(lineNumber, "资源名称不能为空。");
      }

      if (!href) {
        throw configurationError(lineNumber, "资源 URL 不能为空。");
      }

      if (!description) {
        throw configurationError(lineNumber, "资源描述不能为空。");
      }

      const normalizedUrl = validateUrl(href, lineNumber);
      const previousLine = urlLines.get(normalizedUrl);

      if (previousLine !== undefined) {
        throw configurationError(
          lineNumber,
          `URL“${href}”重复；首次出现在第 ${previousLine} 行。`,
        );
      }

      currentResource = {
        label,
        shortLabel: label,
        href,
        category: currentGroup.title,
        description,
        accent: inferAccent(label, href),
        featured: false,
      };
      currentGroup.resources.push(currentResource);
      resources.push(currentResource);
      urlLines.set(normalizedUrl, lineNumber);
      currentMetadataKeys = new Set<string>();
      return;
    }

    const metadataMatch = METADATA_LINE_PATTERN.exec(line);
    if (metadataMatch) {
      if (!currentResource) {
        throw configurationError(
          lineNumber,
          "元数据必须紧跟在资源下面。",
        );
      }

      const key = metadataMatch[1].trim();
      const value = metadataMatch[2].trim();

      if (currentMetadataKeys.has(key)) {
        throw configurationError(lineNumber, `元数据“${key}”重复。`);
      }

      applyMetadata(currentResource, key, value, lineNumber);
      currentMetadataKeys.add(key);
      return;
    }

    throw configurationError(
      lineNumber,
      "无法识别此行。分类写“## 分类”；资源写“- [名称](https://...) — 中文描述”。",
    );
  });

  if (insideHtmlComment) {
    throw configurationError(lines.length, "HTML 注释没有使用“-->”结束。");
  }

  if (groups.length === 0) {
    throw new Error("资源配置至少需要一个“## 分类”。");
  }

  if (resources.length === 0) {
    throw new Error("资源配置至少需要一个资源。");
  }

  return {
    title,
    groups,
    resources,
  };
}

export async function getResourceDirectory(): Promise<ResourceDirectory> {
  const source = await readFile(RESOURCE_FILE, "utf8");
  return parseResourceMarkdown(source);
}
