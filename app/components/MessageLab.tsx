"use client";

import { useMemo, useState } from "react";

type LabMessage = {
  id: number;
  type: "ping" | "work";
  label: string;
};

export function MessageLab() {
  const [queue, setQueue] = useState<LabMessage[]>([]);
  const [events, setEvents] = useState<string[]>([
    "准备好了：等待 client 寄出第一封消息",
  ]);
  const [broken, setBroken] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [processed, setProcessed] = useState(0);

  const status = useMemo(() => {
    if (queue.length > 3) return "收信箱里的信越来越多";
    if (queue.length > 0) return "server 还有信没读";
    return "收信箱为空";
  }, [queue.length]);

  function send(type: "ping" | "work") {
    const message = {
      id: nextId,
      type,
      label: type === "ping" ? `{:ping, #${nextId}}` : `{:work, #${nextId}}`,
    };
    setQueue((current) => [...current, message]);
    setEvents((current) =>
      [`client → server · ${message.label}`, ...current].slice(0, 7),
    );
    setNextId((value) => value + 1);
  }

  function processNext() {
    const [message, ...rest] = queue;
    if (!message) return;

    setQueue(rest);
    setProcessed((value) => value + 1);
    setEvents((current) => {
      const next = [`server 处理 · ${message.label}`];
      if (broken) {
        next.unshift(`故意制造的小故障：server 读了 #${message.id}，却没有寄出 reply`);
      } else {
        next.unshift(`server → client · {:reply, #${message.id}, :ok}`);
      }
      return [...next, ...current].slice(0, 7);
    });
  }

  function reset() {
    setQueue([]);
    setEvents(["已经重新开始：收信箱为空"]);
    setProcessed(0);
    setNextId(1);
    setBroken(false);
  }

  return (
    <div className="lab-shell">
      <div className="lab-toolbar">
        <div>
          <span className="live-dot" />
          消息小实验
        </div>
        <button type="button" onClick={reset}>
          重置
        </button>
      </div>

      <div className="lab-canvas">
        <div className="process-card process-card--client">
          <span>PROCESS 01</span>
          <strong>client</strong>
          <small>寄出请求 request</small>
        </div>

        <div className="message-lane" aria-label="消息通道">
          <span className="message-arrow">→</span>
          <div className="mailbox">
            <div className="mailbox-label">
              <span>MAILBOX</span>
              <strong>{queue.length}</strong>
            </div>
            <div className="mailbox-items">
              {queue.length === 0 ? (
                <span className="empty-message">等待消息</span>
              ) : (
                queue.map((message) => (
                  <span className="mail-item" key={message.id}>
                    {message.label}
                  </span>
                ))
              )}
            </div>
          </div>
          <span className="message-arrow">→</span>
        </div>

        <div className="process-card process-card--server">
          <span>PROCESS 02</span>
          <strong>server</strong>
          <small>已经读完 {processed} 封</small>
        </div>
      </div>

      <div className="lab-status-row">
        <span>{status}</span>
        <span>
          回信 reply：<strong>{broken ? "关闭" : "正常"}</strong>
        </span>
      </div>

      <div className="lab-controls">
        <button type="button" onClick={() => send("ping")}>
          发送 ping
        </button>
        <button type="button" onClick={() => send("work")}>
          发送 work
        </button>
        <button
          className="button--process"
          type="button"
          onClick={processNext}
          disabled={queue.length === 0}
        >
          处理下一条
        </button>
        <label className="break-toggle">
          <input
            type="checkbox"
            checked={broken}
            onChange={(event) => setBroken(event.target.checked)}
          />
          <span>故意弄坏：不回 reply</span>
        </label>
      </div>

      <div className="event-log" aria-live="polite">
        <div className="event-log-title">
          <span>事件记录</span>
          <span>最新在上</span>
        </div>
        {events.map((event, index) => (
          <p key={`${event}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {event}
          </p>
        ))}
      </div>

      <p className="lab-disclaimer">
        这是画在浏览器里的消息模型，不是真正的 Erlang VM。它像一张驿站演示图，
        帮你看清消息怎样排队和回复；课程页仍会给出可以放进 IEx / erl 运行的真实代码。
      </p>
    </div>
  );
}
