"use client";

import { useState } from "react";
import type { Locale } from "../i18n/locales";

type CopyBlockProps = {
  code: string;
  language: string;
  label: string;
  locale: Locale;
};

export function CopyBlock({ code, language, label, locale }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-card">
      <div className="code-card-header">
        <div>
          <span className={`language-dot language-dot--${language}`} />
          <span>{label}</span>
        </div>
        <button type="button" onClick={copy} aria-live="polite">
          {copied
            ? locale === "zh" ? "已复制" : "Copied"
            : locale === "zh" ? "复制代码" : "Copy code"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
