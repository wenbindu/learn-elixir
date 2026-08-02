"use client";

import { useState } from "react";
import type { Locale } from "../i18n/locales";

type PresetId = "pipeline" | "matching" | "process";

const presets = {
  zh: [
    {
      id: "pipeline",
      label: "管道与 Enum",
      goal: "从 1 到 10 中找出偶数，再看看它们的平方。",
      code: `# 数据从这里来：准备 1 到 10 这十个整数
numbers = 1..10

# 把 numbers 交给管道，一步一步处理
result =
  numbers
  # 第一步：只留下能被 2 整除的偶数
  |> Enum.filter(&(rem(&1, 2) == 0))
  # 第二步：把每个偶数乘以自己
  |> Enum.map(&(&1 * &1))

# 打印最后得到的列表
IO.inspect(result, label: "偶数平方")`,
    },
    {
      id: "matching",
      label: "模式匹配",
      goal: "分别处理成功和失败。",
      code: `# describe 是一个匿名函数，会接收下面列表中的每一项
describe = fn
  # 若数据形状是 {:ok, value}，就取出成功结果
  {:ok, value} -> "成功: #{value}"
  # 若数据形状是 {:error, reason}，就取出失败原因
  {:error, reason} -> "失败: #{reason}"
end

# 数据从这里来：一项成功，一项失败
[ok: 42, error: :timeout]
# 把两项依次交给 describe
|> Enum.map(describe)
# 打印处理后的两个结果
|> IO.inspect()`,
    },
    {
      id: "process",
      label: "进程与消息",
      goal: "启动一个进程，等它传回计算结果。",
      code: `# 记住当前进程；子进程稍后要把消息发回这里
parent = self()

# 启动一个子进程，让它在旁边计算
spawn(fn ->
  # 算出总和，再把 {:sum, 结果} 发给 parent
  send(parent, {:sum, Enum.sum(1..100)})
end)

# 当前进程在这里等待消息
receive do
  # 收到形状为 {:sum, value} 的消息后，取出并打印 value
  {:sum, value} -> IO.puts("结果: #{value}")
after
  # 等了 1 秒还没有匹配的消息，就执行这个分支
  1_000 -> IO.puts("timeout")
end`,
    },
  ],
  en: [
    {
      id: "pipeline",
      label: "Pipelines and Enum",
      goal: "Find the even numbers from 1 to 10, then square them.",
      code: `# Start with the ten integers from 1 through 10
numbers = 1..10

# Send numbers through the pipeline one step at a time
result =
  numbers
  # Step 1: keep only numbers divisible by 2
  |> Enum.filter(&(rem(&1, 2) == 0))
  # Step 2: multiply each even number by itself
  |> Enum.map(&(&1 * &1))

# Print the final list
IO.inspect(result, label: "even squares")`,
    },
    {
      id: "matching",
      label: "Pattern matching",
      goal: "Handle success and failure separately.",
      code: `# describe is an anonymous function that receives each item below
describe = fn
  # This shape means success, so take out value
  {:ok, value} -> "success: #{value}"
  # This shape means failure, so take out reason
  {:error, reason} -> "error: #{reason}"
end

# Start with one success and one failure
[ok: 42, error: :timeout]
# Give both items to describe, one at a time
|> Enum.map(describe)
# Print the two results
|> IO.inspect()`,
    },
    {
      id: "process",
      label: "Processes and messages",
      goal: "Start a process and wait for its answer.",
      code: `# Remember this process so the child can send a message back
parent = self()

# Start a child process and let it calculate nearby
spawn(fn ->
  # Add the numbers, then send {:sum, result} to parent
  send(parent, {:sum, Enum.sum(1..100)})
end)

# This process waits here for a message
receive do
  # Match {:sum, value}, take out value, and print it
  {:sum, value} -> IO.puts("result: #{value}")
after
  # Use this branch if no matching message arrives within one second
  1_000 -> IO.puts("timeout")
end`,
    },
  ],
} as const satisfies Record<Locale, ReadonlyArray<{
  id: PresetId;
  label: string;
  goal: string;
  code: string;
}>>;

function createEmbedUrl(code: string) {
  const dataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(code)}`;
  const params = new URLSearchParams({ sandbox: "elixir", src: dataUrl });
  return `https://codapi.org/embed/?${params.toString()}`;
}

export function ElixirPlayground({ locale }: { locale: Locale }) {
  const localizedPresets = presets[locale];
  const [selectedId, setSelectedId] = useState<PresetId>("pipeline");
  const selected =
    localizedPresets.find((preset) => preset.id === selectedId) ?? localizedPresets[0];
  const embedUrl = createEmbedUrl(selected.code);
  const chooseLabel = locale === "zh" ? "选择 Elixir 练习" : "Choose an Elixir exercise";

  return (
    <div className="playground-runner">
      <div className="playground-presets" role="tablist" aria-label={chooseLabel}>
        {localizedPresets.map((preset, index) => (
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
          <div><span /><span /><span /></div>
          <strong>{selected.id}.exs</strong>
          <span>ELIXIR SANDBOX</span>
        </div>

        <iframe
          id="elixir-playground-frame"
          key={selected.id}
          src={embedUrl}
          title={locale === "zh" ? `Elixir 在线练习：${selected.label}` : `Elixir playground: ${selected.label}`}
          sandbox="allow-scripts allow-same-origin"
          allow="clipboard-write"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        <div className="playground-frame-footer">
          <p>
            {locale === "zh" ? "先改一处，再点 " : "Change one thing, then press "}
            <strong>Run</strong>
            {locale === "zh" ? "。输出和报错都在下方。" : ". Output and errors appear below."}
          </p>
          <a href={embedUrl} target="_blank" rel="noreferrer">
            {locale === "zh" ? "在新窗口打开" : "Open in a new window"}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
