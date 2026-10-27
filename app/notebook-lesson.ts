export type NotebookLesson = {
  slug: string;
  core: string[];
  prerequisites: string[];
  problem: string;
  ability: string;
  contribution: string;
  prediction: string;
  code: string;
  environment?: string;
  setup?: string;
  notes: Array<{ lines: number[]; label: string; text: string }>;
  trace: Array<{ lines: number[]; label: string; output: string; explanation: string }>;
  exercise: {
    task: string;
    code: string;
    choices: string[];
    correct: number;
    output: string;
    explanation: string;
    hints: [string, string];
  };
  review: { slug: string; question: string; answer: string } | null;
  takeaways: [string, string, string];
};

type NotebookDraft = Omit<NotebookLesson, "exercise"> & {
  exercise: Omit<NotebookLesson["exercise"], "code"> & { replace: [string, string] };
};

export function defineNotebook(draft: NotebookDraft): NotebookLesson {
  const { replace, ...exercise } = draft.exercise;
  if (!replace[0] || draft.code.split(replace[0]).length !== 2 || replace[0] === replace[1]) {
    throw new Error(`课程 ${draft.slug} 的练习必须替换唯一的一处代码`);
  }
  return { ...draft, exercise: { ...exercise, code: draft.code.replace(...replace) } };
}

export function validateNotebooks(notebooks: NotebookLesson[], order: string[]) {
  const seen = new Set<string>();
  for (const notebook of notebooks) {
    const fail = (reason: string): never => { throw new Error(`课程 ${notebook.slug} 看板错误：${reason}`); };
    if (seen.has(notebook.slug)) fail("slug 重复");
    seen.add(notebook.slug);
    const position = order.indexOf(notebook.slug);
    if (position < 0) fail("课程不存在");
    if (notebook.review ? order.indexOf(notebook.review.slug) < 0 || order.indexOf(notebook.review.slug) >= position : position !== 0) fail("回顾题必须来自更早课程；首课可以没有回顾题");
    if (notebook.core.length < 1 || notebook.core.length > 2) fail("核心概念必须为 1–2 个");
    for (const code of [notebook.code, notebook.exercise.code]) {
      if (!code.trim() || code.split("\n").length > 10) fail("代码必须为 1–10 行");
    }
    if (!notebook.notes.length || !notebook.trace.length) fail("缺少批注或运行过程");
    const covered = new Set<number>();
    for (const note of notebook.notes) {
      for (const line of note.lines) covered.add(line);
    }
    notebook.code.split("\n").forEach((line, index) => {
      if (line.trim() && !covered.has(index + 1)) fail(`第 ${index + 1} 行缺少批注`);
    });
    for (const item of [...notebook.notes, ...notebook.trace]) {
      if (!item.lines.length || item.lines.some((line) => !Number.isInteger(line) || line < 1 || line > notebook.code.split("\n").length)) fail("批注行号越界");
    }
    for (const explanation of [...notebook.trace.map((item) => item.explanation), notebook.exercise.explanation]) {
      if (!explanation.trim() || Array.from(explanation).length > 200) fail("解释必须为 1–200 字");
    }
    if (notebook.exercise.choices.length < 2 || !Number.isInteger(notebook.exercise.correct) || !notebook.exercise.choices[notebook.exercise.correct]) fail("预测选项或答案无效");
    const prose = [notebook.problem, notebook.prediction, notebook.ability, notebook.contribution, ...notebook.notes.flatMap((item) => [item.label, item.text]), ...notebook.trace.map((item) => item.explanation), notebook.exercise.task, notebook.exercise.explanation, ...notebook.exercise.hints, ...(notebook.review ? [notebook.review.question, notebook.review.answer] : []), ...notebook.takeaways];
    if (prose.some((text) => !text.trim())) fail("文案不能为空");
    if (prose.some((text) => /不是.{0,35}而是|不只是.{0,35}更是|让我们一起|不妨|值得一提|事实上|本质上|赋能|打通|抓手|探索之旅|其实|显然|简单来说/.test(text))) fail("含禁用写法");
  }
}
