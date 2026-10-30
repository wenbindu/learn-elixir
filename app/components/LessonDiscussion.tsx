"use client";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./LessonDiscussion.module.css";

type Message = { id: string; body: string; reply_to: string | null; author_name: string; created_at: string };
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export function LessonDiscussion({ slug, locale }: { slug: string; locale: "zh" | "en" }) {
  const zh = locale === "zh";
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messageList = useRef<HTMLDivElement>(null);
  const load = useCallback(async () => {
    if (!supabase) { setError(zh ? "留言服务尚未配置。" : "Discussion service is not configured."); setLoading(false); return; }
    const { data, error: fetchError } = await supabase.from("lesson_messages").select("id,body,reply_to,author_name,created_at").eq("lesson", slug).eq("locale", locale).order("created_at", { ascending: false }).limit(200);
    if (fetchError) setError(zh ? "无法加载消息，请检查数据库配置。" : "Could not load messages. Check database configuration.");
    else { setMessages((data as Message[]).reverse()); setError(""); }
    setLoading(false);
  }, [slug, locale, zh]);
  useEffect(() => {
    let active = true;
    const initialLoad = window.setTimeout(() => { void load(); }, 0);
    if (supabase) {
      void supabase.auth.getUser().then(({ data }) => { if (active) setUser(data.user); });
      const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setUser(session?.user ?? null); });
      const interval = window.setInterval(() => { void load(); }, 10000);
      return () => { active = false; window.clearTimeout(initialLoad); subscription.subscription.unsubscribe(); window.clearInterval(interval); };
    }
    return () => { active = false; window.clearTimeout(initialLoad); };
  }, [load]);
  async function login() {
    if (!supabase) return;
    const { error: authError } = await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: window.location.origin + window.location.pathname } });
    if (authError) setError(zh ? "登录失败，请检查 GitHub 登录配置。" : "Sign-in failed. Check GitHub authentication settings.");
  }
  async function send() {
    if (!supabase || !user || !text.trim() || sending) return;
    setSending(true);
    const { error: sendError } = await supabase.from("lesson_messages").insert({ lesson: slug, locale, body: text.trim(), reply_to: replyTo?.id ?? null });
    if (sendError) setError(zh ? "发送失败，请稍后重试。" : "Could not send. Please try again.");
    else { setText(""); setReplyTo(null); await load(); requestAnimationFrame(() => { if (messageList.current) messageList.current.scrollTop = messageList.current.scrollHeight; }); }
    setSending(false);
  }
  return <aside className={styles.chat} aria-label={zh ? "课程问答" : "Lesson discussion"}>
    <div ref={messageList} className={styles.messages} aria-live="polite">
      {loading ? <div className={styles.empty}>{zh ? "加载中…" : "Loading…"}</div> : messages.length === 0 ? <div className={styles.empty}>{zh ? "暂无消息" : "No messages yet"}</div> : messages.map((message) => {
        const quoted = messages.find((item) => item.id === message.reply_to);
        return <article className={styles.message} key={message.id}><div className={styles.content}>
          <div className={styles.meta}><strong>{message.author_name}</strong><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString(zh ? "zh-CN" : "en-US", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</time></div>
          {quoted && <blockquote className={styles.quote}>{quoted.body}</blockquote>}
          <p>{message.body}</p><button className={styles.reply} type="button" onClick={() => { setReplyTo(message); document.getElementById("discussion-input")?.focus(); }}>{zh ? "回复" : "Reply"}</button>
        </div></article>;
      })}
    </div>
    <form className={styles.composer} onSubmit={(e) => { e.preventDefault(); void send(); }}>
      {replyTo && <div className={styles.replying}><div><span>{replyTo.body}</span></div><button type="button" aria-label={zh ? "取消回复" : "Cancel reply"} onClick={() => setReplyTo(null)}>×</button></div>}
      <label className={styles.srOnly} htmlFor="discussion-input">{replyTo ? (zh ? "写下回答" : "Write an answer") : (zh ? "写下问题" : "Write a question")}</label>
      <textarea id="discussion-input" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); } }} placeholder={replyTo ? (zh ? "写下你的回答…" : "Write your answer…") : (zh ? "有问题？在这里提问…" : "Ask a question…")} maxLength={1000} />
      <div className={styles.composerBottom}>{user ? <><span>{user.user_metadata?.user_name || "GitHub"} · <button className={styles.reply} type="button" onClick={() => { void supabase?.auth.signOut(); }}>{zh ? "退出" : "Sign out"}</button></span><button type="submit" disabled={!text.trim() || sending}>{zh ? "发送" : "Send"}</button></> : <button type="button" onClick={() => { void login(); }} disabled={!supabase}>{zh ? "GitHub 登录后发送" : "Sign in with GitHub"}</button>}</div>
      {error && <p role="alert">{error}</p>}
    </form>
  </aside>;
}
