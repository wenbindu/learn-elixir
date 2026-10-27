"use client";

import { useState } from "react";
import { startIexLesson, startIexMetadata } from "../../content/lessons/start-iex";
import { startIexLessonEn, startIexMetadataEn } from "../../content/lessons/start-iex.en";
import { meetIexActivity } from "../../content/lessons/meet-iex";
import { meetIexActivityEn } from "../../content/lessons/meet-iex.en";
import type { Locale } from "../i18n/locales";
import { BasicProgressButton } from "./BasicProgress";
import { InlineCodeText } from "./InlineCodeText";
import { LocalizedLink } from "./LocalizedLink";
import styles from "./MeetIexLesson.module.css";
import sketch from "./LessonSketch.module.css";

const views = ["进入 IEx", "退出 IEx", "自己试试"] as const;

export function StartIexLesson({ locale = "zh" }: { locale?: Locale }) {
  const lesson = locale === "en" ? startIexLessonEn : startIexLesson;
  const metadata = locale === "en" ? startIexMetadataEn : startIexMetadata;
  const activity = locale === "en" ? meetIexActivityEn : meetIexActivity;
  const text = (zh: string, en: string) => locale === "en" ? en : zh;
  const viewLabels = locale === "en" ? ["Enter IEx", "Exit IEx", "Try it yourself"] : views;
  const [view, setView] = useState<(typeof views)[number]>("进入 IEx");
  const [windows, setWindows] = useState(false);
  const [exitStep, setExitStep] = useState(0);
  const command = windows ? "iex.bat" : "iex";
  const terminalPrompt = windows ? "PS C:\\Users\\you>" : "~ $";

  return (
    <div className={`${styles.pilot} ${sketch.lesson}`} data-sketch-lesson="start-iex">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>ELIXIR / {lesson.number}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
      </header>
      <section className={styles.paper} aria-label={text("第 01 课进入和退出 IEx", "Lesson 01: enter and exit IEx")} data-code-notebook="start-iex">
        <div className={styles.toolbar}>
          <div className={styles.viewButtons} role="group" aria-label={text("选择操作步骤", "Choose a step")}>
            {views.map((item, index) => (
              <button key={item} type="button" aria-pressed={view === item} onClick={() => { setView(item); setExitStep(0); }}>
                <span>{String(index + 1).padStart(2, "0")}</span>{viewLabels[index]}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.traceView}>
          {view === "进入 IEx" ? <>
            <div className={styles.changeButtons} role="group" aria-label={text("选择终端环境", "Choose your terminal environment")}>
              <button type="button" aria-pressed={!windows} onClick={() => setWindows(false)}>macOS / Linux</button>
              <button type="button" aria-pressed={windows} onClick={() => setWindows(true)}>Windows PowerShell</button>
            </div>
            <div className={styles.changeCode}><code>{command}</code></div>
            <p><span className={styles.pencilMark}>{text("↑ 在终端输入，按回车", "↑ Type in your terminal, then press Enter")}</span></p>
            <p><InlineCodeText text={lesson.plain[0].replace("`iex`", `\`${command}\``)} /></p>
            <div className={styles.resultSheet}>
              <span className={styles.sheetLabel}>{text("进入后的提示符（省略版本信息）", "The IEx prompt (version information omitted)")}</span>
              <div className={styles.resultRow}><code>iex(1)&gt;</code><span>{text("← 已进入 IEx，等你输入代码", "← IEx is open and waiting for your code")}</span></div>
            </div>
            <p><InlineCodeText text={lesson.plain[1]} /></p>
            {windows ? <p>{text("这里容易写错：PowerShell 里的 ", "Watch out: in PowerShell, ")}<code>iex</code>{text(" 是另一个命令，要写 ", " is a different command. Use ")}<code>iex.bat</code>{text("。", ".")}</p> : null}
            <details className={styles.goal}>
              <summary>{text("终端在哪里？命令找不到怎么办？", "Where is the terminal? What if the command is not found?")}</summary>
              <p>{lesson.steps[0]}</p>
              <p>{text("如果看到 ", "If you see ")}<code>command not found</code>{text(" 或“无法识别”，说明终端找不到启动命令，还没有进入 IEx。", " or ‘not recognized’, the terminal cannot find the startup command. You have not entered IEx yet.")}</p>
              <LocalizedLink href="/learn/install-toolchain" locale={locale}>{text("查看安装与环境检查 →", "Check installation and setup →")}</LocalizedLink>
            </details>
            <button className={styles.revealButton} type="button" onClick={() => setView("退出 IEx")}>{text("已经进入，看看怎么退出 →", "IEx is open. See how to exit →")}</button>
          </> : null}
          {view === "退出 IEx" ? <>
            <p className={styles.handwritten}>{lesson.check.question}</p>
            <div className={styles.resultSheet} aria-live="polite" aria-atomic="true">
              <span className={styles.sheetLabel}>{text("退出过程演示 · ", "Exit walkthrough · ")}{exitStep === 0 ? text("正在 IEx 中", "Inside IEx") : exitStep === 1 ? text("BREAK 菜单，还没退出", "BREAK menu, still in IEx") : text("已回到终端命令行", "Back at the terminal command line")}</span>
              <div className={styles.resultRow}><code>{exitStep === 0 ? "iex(1)>" : exitStep === 1 ? "BREAK: …" : terminalPrompt}</code></div>
            </div>
            <p>{exitStep === 0 ? text("先猜，再点按钮看变化。", "Predict first, then click to see what changes.") : exitStep === 1 ? text("第一次按下会打开 BREAK 菜单，IEx 还在运行。", "The first press opens the BREAK menu. IEx is still running.") : text("IEx 已退出，终端窗口还在。提示符的文字因电脑而异。", "IEx has exited, but the terminal window stays open. The prompt varies between computers.")}</p>
            <button className={styles.revealButton} type="button" onClick={() => setExitStep(exitStep === 2 ? 0 : exitStep + 1)}>
              {exitStep === 0 ? text("演示：按一次 Ctrl+C", "Demo: press Ctrl+C once") : exitStep === 1 ? text("演示：再按一次 Ctrl+C", "Demo: press Ctrl+C again") : text("重新演示", "Restart demo")}
            </button>
            <p>{text("在自己的终端里：按住 ", "In your terminal: hold ")}<kbd>Ctrl</kbd>{text(" 再按 ", " and press ")}<kbd>C</kbd>{text("，松开，再重复一次。macOS 也用 Control，不用 Command。", ", release, then repeat. On macOS, use Control, not Command.")}</p>
            <p className={styles.runtimeNote}>{text("按钮只演示操作结果，不会打开或关闭你电脑上的 IEx。", "These buttons demonstrate the steps. They do not open or close IEx on your computer.")}</p>
          </> : null}
          {view === "自己试试" ? <>
            <p className={styles.handwritten}>{text("进入一次，再退出一次", "Enter once, then exit once")}</p>
            <p>{lesson.practice.task}</p>
            <div className={styles.hints}>
              <details><summary>{text("提示 1：怎么进入", "Hint 1: how to enter")}</summary><p>{text("在终端输入 ", "In your terminal, type ")}<code>{command}</code>{text("，按回车。", " and press Enter.")}</p></details>
              <details><summary>{text("提示 2：怎么确认位置", "Hint 2: check where you are")}</summary><p>{lesson.practice.hint}</p></details>
            </div>
            <details className={styles.goal}><summary>{text("做完再看答案", "Finish first, then check the answer")}</summary><p>{lesson.practice.answer}</p></details>
            <p>{text("完成标准：不用看提示，能进入 IEx，再回到原来的终端命令行。", "You are done when you can enter IEx and return to the original terminal command line without hints.")}</p>
          </> : null}
        </div>
      </section>
      <div className={styles.footer}>
        <details><summary>{text("记住这三点", "Remember three things")}</summary><ul>{lesson.takeaways.map((item) => <li key={item}><InlineCodeText text={item} /></li>)}</ul></details>
        <details>
          <summary>{text("这课给项目添什么", "Project contribution")}</summary>
          <p>{metadata.project_contribution}</p>
          <p>{text("最终项目：“行迹”文字统计工具。第 27–32 课成品的使用示意：", "Final project: Trail, a text statistics tool. A preview of the finished tool from lessons 27–32:")}</p>
          <pre><code>{activity.projectPreview}</code></pre>
        </details>
        <BasicProgressButton language="elixir" slug={lesson.slug} locale={locale} />
      </div>
      <details className={styles.goal}>
        <summary>{text("想再深入？", "Want to go deeper?")}</summary>
        <p><LocalizedLink href={metadata.depth_pages[0]} locale={locale}>{text("如何安装 Elixir 并检查环境？", "How do I install Elixir and check my setup?")}</LocalizedLink></p>
        <p><a href="https://hexdocs.pm/iex/IEx.html#exiting-the-shell" target="_blank" rel="noreferrer">{text("退出 IEx 还有哪些方法？（官方文档）", "What other ways can I exit IEx? (Official documentation)")}</a></p>
      </details>
    </div>
  );
}
