"use client";

import { useState } from "react";

const presets = [
  {
    id: "pipeline",
    label: "管道与 Enum",
    goal: "从 1 到 10 中找出偶数，再看看它们的平方。",
    code: `numbers = 1..10

result =
  numbers
  |> Enum.filter(&(rem(&1, 2) == 0))
  |> Enum.map(&(&1 * &1))

IO.inspect(result, label: "偶数平方")`,
  },
  {
    id: "matching",
    label: "模式匹配",
    goal: "分别处理成功和失败。",
    code: `describe = fn
  {:ok, value} -> "成功: #{value}"
  {:error, reason} -> "失败: #{reason}"
end

[ok: 42, error: :timeout]
|> Enum.map(describe)
|> IO.inspect()`,
  },
  {
    id: "process",
    label: "进程与消息",
    goal: "启动一个进程，等它传回计算结果。",
    code: `parent = self()

spawn(fn ->
  send(parent, {:sum, Enum.sum(1..100)})
end)

receive do
  {:sum, value} -> IO.puts("结果: #{value}")
after
  1_000 -> IO.puts("timeout")
end`,
  },
] as const;

function createEmbedUrl(code: string) {
  const dataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(code)}`;
  const params = new URLSearchParams({
    sandbox: "elixir",
    src: dataUrl,
  });

  return `https://codapi.org/embed/?${params.toString()}`;
}

export function ElixirPlayground() {
  const [selectedId, setSelectedId] = useState<(typeof presets)[number]["id"]>(
    presets[0].id,
  );
  const selected =
    presets.find((preset) => preset.id === selectedId) ?? presets[0];
  const embedUrl = createEmbedUrl(selected.code);

  return (
    <div className="playground-runner">
      <div
        className="playground-presets"
        role="tablist"
        aria-label="选择 Elixir 练习"
      >
        {presets.map((preset, index) => (
          <button
            className={preset.id === selected.id ? "is-active" : undefined}
            type="button"
            role="tab"
            aria-selected={preset.id === selected.id}
            aria-controls="elixir-playground-frame"
            onClick={() => setSelectedId(preset.id)}
            key={preset.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{preset.label}</strong>
            <small>{preset.goal}</small>
          </button>
        ))}
      </div>

      <div className="playground-frame-shell">
        <div className="playground-frame-chrome" aria-hidden="true">
          <div>
            <span />
            <span />
            <span />
          </div>
          <strong>{selected.id}.exs</strong>
          <span>ELIXIR SANDBOX</span>
        </div>

        <iframe
          id="elixir-playground-frame"
          key={selected.id}
          src={embedUrl}
          title={`Elixir 在线练习：${selected.label}`}
          sandbox="allow-scripts allow-same-origin"
          allow="clipboard-write"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        <div className="playground-frame-footer">
          <p>
            先改一处，再点 <strong>Run</strong>。输出和报错都在下方。
          </p>
          <a href={embedUrl} target="_blank" rel="noreferrer">
            在新窗口打开
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
