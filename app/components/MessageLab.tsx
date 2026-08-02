"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/locales";

type LabMessage = {
  id: number;
  type: "ping" | "work";
  label: string;
};

const labCopy = {
  zh: {
    waitingClient: "等待 client 发送消息",
    backlog: "mailbox 正在积压",
    pending: "server 还有消息没处理",
    empty: "mailbox 为空",
    processedEvent: "server 处理",
    fault: (id: number) => `故障：server 处理了 #${id}，但没有发送 reply`,
    resetEvent: "已重置：mailbox 为空",
    title: "消息实验",
    reset: "重置",
    sends: "发送 request",
    lane: "消息通道",
    waiting: "等待消息",
    processed: (count: number) => `已处理 ${count} 条`,
    reply: "reply",
    off: "关闭",
    normal: "正常",
    sendPing: "发送 ping",
    sendWork: "发送 work",
    process: "处理下一条",
    breakReply: "故意不回 reply",
    events: "事件记录",
    newest: "最新在上",
    disclaimer: "这是浏览器中展示消息传递的模型，不是真正的 Erlang VM。它用来观察消息怎样排队和回复。课程页另有可在 IEx / erl 运行的代码。",
  },
  en: {
    waitingClient: "Waiting for the client to send a message",
    backlog: "The mailbox is building up",
    pending: "The server still has messages to handle",
    empty: "The mailbox is empty",
    processedEvent: "server handled",
    fault: (id: number) => `Fault: the server handled #${id} but sent no reply`,
    resetEvent: "Reset: the mailbox is empty",
    title: "Message lab",
    reset: "Reset",
    sends: "sends requests",
    lane: "Message lane",
    waiting: "Waiting for a message",
    processed: (count: number) => `Handled ${count}`,
    reply: "reply",
    off: "off",
    normal: "normal",
    sendPing: "Send ping",
    sendWork: "Send work",
    process: "Handle next",
    breakReply: "Drop the reply on purpose",
    events: "Event log",
    newest: "Newest first",
    disclaimer: "This browser model shows how messages move. It is not a real Erlang VM. Use it to watch messages queue up and receive replies. The lesson pages also include code you can run in IEx or erl.",
  },
} as const;

export function MessageLab({ locale }: { locale: Locale }) {
  const copy = labCopy[locale];
  const [queue, setQueue] = useState<LabMessage[]>([]);
  const [events, setEvents] = useState<string[]>([copy.waitingClient]);
  const [broken, setBroken] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [processed, setProcessed] = useState(0);

  const status = useMemo(() => {
    if (queue.length > 3) return copy.backlog;
    if (queue.length > 0) return copy.pending;
    return copy.empty;
  }, [copy, queue.length]);

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
      const next = [`${copy.processedEvent} · ${message.label}`];
      if (broken) next.unshift(copy.fault(message.id));
      else next.unshift(`server → client · {:reply, #${message.id}, :ok}`);
      return [...next, ...current].slice(0, 7);
    });
  }

  function reset() {
    setQueue([]);
    setEvents([copy.resetEvent]);
    setProcessed(0);
    setNextId(1);
    setBroken(false);
  }

  return (
    <div className="lab-shell">
      <div className="lab-toolbar">
        <div>
          <span className="live-dot" />
          {copy.title}
        </div>
        <button type="button" onClick={reset}>{copy.reset}</button>
      </div>

      <div className="lab-canvas">
        <div className="process-card process-card--client">
          <span>PROCESS 01</span>
          <strong>client</strong>
          <small>{copy.sends}</small>
        </div>

        <div className="message-lane" aria-label={copy.lane}>
          <span className="message-arrow">→</span>
          <div className="mailbox">
            <div className="mailbox-label">
              <span>MAILBOX</span>
              <strong>{queue.length}</strong>
            </div>
            <div className="mailbox-items">
              {queue.length === 0 ? (
                <span className="empty-message">{copy.waiting}</span>
              ) : (
                queue.map((message) => (
                  <span className="mail-item" key={message.id}>{message.label}</span>
                ))
              )}
            </div>
          </div>
          <span className="message-arrow">→</span>
        </div>

        <div className="process-card process-card--server">
          <span>PROCESS 02</span>
          <strong>server</strong>
          <small>{copy.processed(processed)}</small>
        </div>
      </div>

      <div className="lab-status-row">
        <span>{status}</span>
        <span>
          {copy.reply}: <strong>{broken ? copy.off : copy.normal}</strong>
        </span>
      </div>

      <div className="lab-controls">
        <button type="button" onClick={() => send("ping")}>{copy.sendPing}</button>
        <button type="button" onClick={() => send("work")}>{copy.sendWork}</button>
        <button
          className="button--process"
          type="button"
          onClick={processNext}
          disabled={queue.length === 0}
        >
          {copy.process}
        </button>
        <label className="break-toggle">
          <input
            type="checkbox"
            checked={broken}
            onChange={(event) => setBroken(event.target.checked)}
          />
          <span>{copy.breakReply}</span>
        </label>
      </div>

      <div className="event-log" aria-live="polite">
        <div className="event-log-title">
          <span>{copy.events}</span>
          <span>{copy.newest}</span>
        </div>
        {events.map((event, index) => (
          <p key={`${event}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {event}
          </p>
        ))}
      </div>

      <p className="lab-disclaimer">{copy.disclaimer}</p>
    </div>
  );
}
