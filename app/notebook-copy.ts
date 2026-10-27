import type { Locale } from "./i18n/locales";
import type { BasicPathId } from "./basic-path-data";

const labels = {
  zh: {
    views: ["读代码", "看运行过程", "只改一处"], viewGroup: "选择讲解视图", copy: "复制代码", copyFailed: "复制未成功，请选中代码手动复制。",
    code: "完整示例代码", notes: "代码批注", clickLine: "点代码行看批注", predict: "先猜", trace: "看运行过程", steps: "选择运行步骤", result: "结果对照", why: "为什么得到这个结果",
    prediction: "你预测的结果", unsure: "还不确定", reveal: "对照结果", uncertain: "看这次的结果", correct: "猜对了", incorrect: "和你猜的不一样", hint: "提示", reviewAnswer: "查看回顾答案",
    goal: "完成标准", takeaways: "记住这三点", project: "这课给项目添什么", reused: "这里用到了", deeper: "想再深入？查看完整示例、原练习和补充知识", setup: "运行前准备",
    runtime: "这里是固定示例的结果对照，不会执行你电脑上的代码。完整项目与补充知识在深入页。",
    lines: (lines: number[]) => `第 ${lines.join("、")} 行`, lineNote: (line: number) => `查看第 ${line} 行批注`, board: (number: string) => `第 ${number} 课手绘代码讲解`, lesson: (number: string) => `第 ${number} 课`, review: (number: string) => `回顾第 ${number} 课`, back: (title: string) => `回到《${title}》`,
  },
  en: {
    views: ["Read code", "Trace results", "Change one thing"], viewGroup: "Choose a lesson view", copy: "Copy code", copyFailed: "Copy failed. Select the code and copy it manually.",
    code: "Complete example code", notes: "Code annotation", clickLine: "Click a line for its note", predict: "Predict", trace: "Trace results", steps: "Choose a trace step", result: "Result", why: "Why this result",
    prediction: "Your prediction", unsure: "Not sure yet", reveal: "Compare results", uncertain: "See what happens", correct: "You predicted it", incorrect: "A different result", hint: "Hint", reviewAnswer: "Show review answer",
    goal: "Done when", takeaways: "Remember three things", project: "Project contribution", reused: "Used here", deeper: "Go deeper: full examples, original exercises and further reading", setup: "Before running",
    runtime: "These are fixed example results. This page does not execute code on your computer. Full project examples and reference material are on the deeper page.",
    lines: (lines: number[]) => `${lines.length === 1 ? "Line" : "Lines"} ${lines.join(", ")}`, lineNote: (line: number) => `Show note for line ${line}`, board: (number: string) => `Lesson ${number} annotated code`, lesson: (number: string) => `Lesson ${number}`, review: (number: string) => `Review lesson ${number}`, back: (title: string) => `Back to ${title}`,
  },
};

export function notebookCopy(locale: Locale, language: BasicPathId = "elixir") {
  const shell = language === "elixir" ? "IEx" : "erl";
  const instruction = locale === "zh"
    ? language === "elixir" ? "在 IEx 中运行；Windows PowerShell 用 iex.bat 进入。" : "在 erl 中运行，表达式以句点结束；重跑绑定变量的示例前用 f(). 清空绑定。"
    : language === "elixir" ? "Run in IEx; use iex.bat in Windows PowerShell." : "Run in erl. End expressions with a period; run f(). before rerunning examples that bind variables.";
  return { ...labels[locale], shell, instruction, copied: locale === "zh" ? "已复制。" : "Copied. " };
}
