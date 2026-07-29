"use client";

import { useState } from "react";

type CopyBlockProps = {
  code: string;
  language: string;
  label: string;
};

export function CopyBlock({ code, language, label }: CopyBlockProps) {
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
          {copied ? "已复制" : "复制代码"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

