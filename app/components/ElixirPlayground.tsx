"use client";

import { useState } from "react";

const presets = [
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
