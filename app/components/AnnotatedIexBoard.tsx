"use client";

import { useEffect, useRef, useState } from "react";
import { meetIexLesson, meetIexActivity } from "../../content/lessons/meet-iex";
import { meetIexLessonEn, meetIexActivityEn } from "../../content/lessons/meet-iex.en";
import type { Locale } from "../i18n/locales";
import styles from "./MeetIexLesson.module.css";

const views = [
  { id: "read", label: "读代码" },
  { id: "trace", label: "看每行结果" },
  { id: "change", label: "只改一处" },
] as const;
type View = (typeof views)[number]["id"];

function PrintCode({ print = true }: { print?: boolean }) {
  return (
    <code>
      {print ? <><span className={styles.blue} data-iex-token="module">IO</span>.<span className={styles.purple} data-iex-token="function">puts</span>(</> : null}
      <span className={styles.green} data-iex-token={print ? "argument" : "value"}>{'"lines=2"'}</span>
      {print ? ")" : null}
    </code>
  );
}

function SketchArrows() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = svg?.parentElement;
    if (!svg || !canvas) return;
    let frame = 0;
    let disposed = false;
    const connections = ["module", "function", "argument", "value"].map((token) => ({
      token,
      note: canvas.querySelector<HTMLElement>(`[data-iex-note="${token}"]`),
      target: canvas.querySelector<HTMLElement>(`[data-iex-token="${token}"]`),
      path: svg.querySelector<SVGPathElement>(`[data-iex-arrow="${token}"]`),
    }));

    function drawArrows() {
      if (!canvas) return;
      const origin = canvas.getBoundingClientRect();
      connections.forEach(({ token, note, target, path }) => {
        if (!note || !target || !path) return;
        const start = note.getBoundingClientRect();
        const end = target.getBoundingClientRect();
        const above = token === "module" || token === "function";
        const startX = start.left + start.width / 2 - origin.left;
        const startY = (above ? start.bottom + 3 : start.top - 3) - origin.top;
        const endX = (token === "module" ? end.left - 5 : above ? end.left + end.width / 2 : token === "argument" ? end.right + 4 : end.left - 6) - origin.left;
        const endY = (token === "function" ? end.top - 5 : end.top + end.height / 2) - origin.top;
        const direction = above ? 1 : -1;
        const side = token === "argument" ? 1 : -1;
        const controlX = token === "module" ? endX - 55 : endX + (above ? (startX - endX) * 0.25 : side * 100);
        const controlY = token === "module" ? endY : endY - 40;
        path.setAttribute("d", `M ${startX} ${startY} C ${startX + side * 35} ${startY + direction * 38}, ${controlX} ${controlY}, ${endX} ${endY}`);
      });
    }

    function scheduleDraw() {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(drawArrows);
    }

    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(canvas);
    connections.forEach(({ note, target }) => {
      if (note) observer.observe(note);
      if (target) observer.observe(target);
    });
    scheduleDraw();
    void document.fonts.ready.then(scheduleDraw);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg ref={svgRef} className={styles.arrows} aria-hidden="true">
      <defs>
        <marker id="iex-pencil-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M2 2 L10 6 L2 10" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path className={styles.blueStroke} data-iex-arrow="module" />
      <path className={styles.purpleStroke} data-iex-arrow="function" />
      <path className={styles.greenStroke} data-iex-arrow="argument" />
      <path className={styles.inkStroke} data-iex-arrow="value" />
    </svg>
  );
}

export function AnnotatedIexBoard({ locale = "zh" }: { locale?: Locale }) {
  const lesson = locale === "en" ? meetIexLessonEn : meetIexLesson;
  const activity = locale === "en" ? meetIexActivityEn : meetIexActivity;
  const text = (zh: string, en: string) => locale === "en" ? en : zh;
  const viewLabels = locale === "en" ? ["Read code", "Trace results", "Change one thing"] : views.map((item) => item.label);
  const predictionLabels = locale === "en" ? ["Yes", "No", "Not sure yet"] : ["有", "没有", "还不确定"];
  const [view, setView] = useState<View>("read");
  const [activeLine, setActiveLine] = useState(1);
  const [print, setPrint] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  async function copyCode() {
    const code = view === "change"
      ? print ? lesson.example.code : lesson.practice.starter
      : `${lesson.example.code}\n${lesson.practice.starter}`;
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  }

  function changePrint(next: boolean) {
    setPrint(next);
    setPrediction(null);
    setRevealed(false);
    setCopyStatus("");
  }

  return (
    <section className={styles.paper} aria-label={text(`第 ${lesson.number} 课手绘代码讲解`, `Lesson ${lesson.number}: annotated code walkthrough`)} data-code-notebook="meet-iex">
      <div className={styles.toolbar}>
        <div className={styles.viewButtons} role="group" aria-label={text("选择讲解视图", "Choose a walkthrough view")}>
          {views.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => { setView(item.id); setCopyStatus(""); }}>
              <span>{String(index + 1).padStart(2, "0")}</span>{viewLabels[index]}
            </button>
          ))}
        </div>
        <button className={styles.copyButton} type="button" onClick={copyCode}>{text("复制代码", "Copy code")}</button>
      </div>

      {view === "read" ? (
        <div data-notebook-view="read">
          <div className={styles.canvas}>
            <div className={`${styles.annotation} ${styles.noteBlue}`} data-iex-note="module">
              <strong><code>IO</code>{text(" · 用哪组工具", " · which tools")}</strong>
              <p>{text("输入输出工具放在这个模块里。", "This module holds input and output tools.")}</p>
            </div>
            <div className={`${styles.annotation} ${styles.notePurple}`} data-iex-note="function">
              <strong><code>puts</code>{text(" · 做什么", " · what to do")}</strong>
              <p>{text("打印文字。", "Print text. ")}<code>.</code>{text(" 表示使用 IO 里的这个函数。", " selects this function from IO.")}</p>
            </div>
            <div className={styles.codeSheet}>
              <span className={styles.sheetLabel}>{text("在 IEx 里，逐行输入", "Type each line in IEx")}</span>
              <div className={styles.codeLine}><span className={styles.lineNumber}>1</span><PrintCode /></div>
              <div className={styles.codeLine}><span className={styles.lineNumber}>2</span><PrintCode print={false} /></div>
            </div>
            <div className={`${styles.annotation} ${styles.noteInk}`} data-iex-note="value">
              <strong>{text("第 2 行 · 只留下文字", "Line 2 · just the text")}</strong>
              <p>{text("去掉打印动作，看看结果怎么变。", "Remove printing and see what changes.")}</p>
            </div>
            <div className={`${styles.annotation} ${styles.noteGreen}`} data-iex-note="argument">
              <strong><code>{'("lines=2")'}</code>{text(" · 打印什么", " · what to print")}</strong>
              <p>{text("引号包住文字，括号把它交给 puts。", "Quotes mark the text; parentheses pass it to puts.")}</p>
            </div>
            <SketchArrows />
          </div>
          <div className={styles.boardPrompt}>
            <p><span className={styles.pencilMark}>{text("先猜", "Predict first")}</span>{text("第 1 行会让屏幕显示一行，还是两行？", "Will line 1 display one line or two?")}</p>
            <button type="button" onClick={() => setView("trace")}>{text("看每行结果", "Trace results")} <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      ) : null}

      {view === "trace" ? (
        <div className={styles.traceView} data-notebook-view="trace">
          <p className={styles.handwritten}>{text("点一行代码，看它交回什么。", "Click a line to see what it returns.")}</p>
          <div className={styles.traceGrid}>
            <div className={styles.traceCode}>
              {[1, 2].map((line) => (
                <button key={line} type="button" className={styles.codeLine} aria-pressed={activeLine === line} onClick={() => setActiveLine(line)} aria-label={text(`查看第 ${line} 行的结果`, `See the result of line ${line}`)}>
                  <span className={styles.lineNumber}>{line}</span><PrintCode print={line === 1} />
                </button>
              ))}
              <p>{activeLine === 1 ? text("调用 IO.puts，把文字打印出来。", "Calls IO.puts to print the text.") : text("没有调用 IO.puts，直接交回这段文字。", "Returns the text directly, without calling IO.puts.")}</p>
            </div>
            <span className={styles.flowArrow} aria-hidden="true">⤳</span>
            <div className={styles.resultSheet} aria-live="polite">
              <span className={styles.sheetLabel}>{text("IEx 里的显示结果", "What IEx displays")}</span>
              {activeLine === 1 ? <>
                <div className={styles.resultRow}><code>lines=2</code><span>{text("← IO.puts 打印的文字", "← Text printed by IO.puts")}</span></div>
                <div className={styles.resultRow}><code className={styles.returnValue}>:ok</code><span>{text("← IEx 显示的返回值", "← Return value displayed by IEx")}</span></div>
              </> : <div className={styles.resultRow}><code className={styles.returnValue}>{'"lines=2"'}</code><span>{text("← IEx 显示的返回值", "← Return value displayed by IEx")}</span></div>}
            </div>
          </div>
          <div className={styles.conclusion}>
            <strong>{activeLine === 1 ? text("为什么有两行", "Why two lines?") : text("为什么没有 :ok", "Why no :ok?")}</strong>
            <p>{activeLine === 1 ? text("IO.puts 打印文字，再交回 :ok。IEx 把这个返回值也显示出来，所以你看到了两行。", "IO.puts prints the text, then returns :ok. IEx also displays that return value, so you see two lines.") : text("返回值是代码交回的结果。这次交回的是文字，IEx 就显示文字，不会出现 :ok。", "A return value is the result that code hands back. This time it returns text, so IEx displays the text, without :ok.")}</p>
          </div>
          <p className={styles.runtimeNote}>{text("以上是固定示例的输出对照。真实运行：在终端输入 ", "These are the outputs of fixed examples. To run them yourself, enter ")}<code>iex</code>{text("，再逐行粘贴代码。", " in your terminal, then paste the code one line at a time.")}</p>
        </div>
      ) : null}

      {view === "change" ? (
        <div className={styles.changeView} data-notebook-view="change">
          <p className={styles.handwritten}>{text("只改一个地方：拿掉 IO.puts，会怎样？", "Change one thing: what happens without IO.puts?")}</p>
          <div className={styles.changeButtons} role="group" aria-label={text("修改打印动作", "Change the printing action")}>
            <button type="button" aria-pressed={print} onClick={() => changePrint(true)}>{text("保留 IO.puts", "Keep IO.puts")}</button>
            <button type="button" aria-pressed={!print} onClick={() => changePrint(false)}>{text("去掉 IO.puts", "Remove IO.puts")}</button>
          </div>
          <div className={styles.changeCode}><PrintCode print={print} /></div>
          <fieldset className={styles.prediction}>
            <legend>{text("你猜，结果里还会有 ", "Do you think the result will still include ")}<code>:ok</code>{text(" 吗？", "?")}</legend>
            {["有", "没有", "还不确定"].map((option, index) => (
              <label key={option}><input type="radio" name="return-value-prediction" checked={prediction === option} onChange={() => { setPrediction(option); setRevealed(false); }} />{predictionLabels[index]}</label>
            ))}
          </fieldset>
          <button className={styles.revealButton} type="button" disabled={!prediction} onClick={() => setRevealed(true)}>{text("对照结果", "Check the result")}</button>
          {revealed ? (
            <div className={styles.changeResult} role="status">
              <strong>{prediction === "还不确定" ? text("看这次的结果", "Here is the result") : prediction === (print ? "有" : "没有") ? text("猜对了", "You got it") : text("和你猜的不一样", "Different from your prediction")}</strong>
              <pre><code>{print ? activity.transcript : lesson.practice.answer}</code></pre>
              <p>{print ? text("调用了 IO.puts，它打印文字并返回 :ok。", "IO.puts is called: it prints the text and returns :ok.") : text("只剩文字，IEx 显示它本身；没有打印动作，也没有 :ok。", "Only the text remains, so IEx displays it. There is no printing action and no :ok.")}</p>
            </div>
          ) : null}
          <div className={styles.hints}>
            <details><summary>{text("提示 1", "Hint 1")}</summary><p>{text("先看代码里还有没有 ", "First, check whether the code still contains ")}<code>IO.puts</code>{text("。", ".")}</p></details>
            <details><summary>{text("提示 2", "Hint 2")}</summary><p>{text("IEx 会显示代码交回的结果。只写一段文字，就交回这段文字。", "IEx displays the result that code returns. A piece of text on its own returns that text.")}</p></details>
          </div>
          <details className={styles.goal}>
            <summary>{text("回顾第 01 课：看到 BREAK，已经退出 IEx 了吗？", "Review lesson 01: if you see BREAK, have you exited IEx?")}</summary>
            <p>{text("先在自己的终端判断，再展开答案。", "Check in your own terminal before opening the answer.")}</p>
            <details><summary>{text("查看答案", "Show answer")}</summary><p>{text("还没有。再按一次 Ctrl+C，回到原来的终端命令行后才退出。", "Not yet. Press Ctrl+C again. You have exited only when you return to the original terminal command line.")}</p></details>
          </details>
          <p className={styles.runtimeNote}>{text("这是固定示例的输出对照，可复制到 IEx 验证。", "These are the outputs of fixed examples. Copy the code into IEx to check them.")}</p>
        </div>
      ) : null}
      <p className={styles.copyStatus} role="status">{copyStatus === "success" ? text("已复制，粘贴到 IEx 后逐行运行。", "Copied. Paste into IEx and run one line at a time.") : copyStatus === "error" ? text("复制未成功，请选中代码手动复制。", "Copy failed. Select the code and copy it manually.") : ""}</p>
    </section>
  );
}
