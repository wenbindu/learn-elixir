import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseMap } from "../components/CourseMap";
import { LocalizedLink } from "../components/LocalizedLink";
import { MessageLab } from "../components/MessageLab";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getBasicPaths, getBasicPathStats, getCourseCatalog } from "../i18n/catalog";
import { isLocale, type Locale } from "../i18n/locales";
import { localeAlternates, siteCopy } from "../i18n/metadata";
import { getResourceDirectory } from "../resource-data";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

const homeCopy = {
  zh: {
    heroEyebrow: "Erlang 和 Elixir 都运行在 BEAM 上",
    heroTitle: "动手学",
    heroLead: "先从值、类型和函数开始。语法读顺以后，再看进程怎样合作。",
    heroStrong: "Elixir 和 Erlang 各有一条从零路线。任选一条，不必一起学。",
    routePickerLabel: "选择学习入口",
    scratch: "FROM SCRATCH",
    elixirRoute: "Elixir 从零开始",
    elixirRouteNote: "9 课 · 最后读懂 &1 与管道",
    erlangRoute: "Erlang 从零开始",
    erlangRouteNote: "9 课 · 从 term 走到模块",
    knowsSyntax: "已懂基础语法",
    beamRoute: "进入 BEAM 主线",
    beamRouteNote: "进程 · 消息 · OTP · 监督树",
    pathMetric: "条从零路线",
    lessonMetric: "节基础语法",
    mainlineMetric: "站 BEAM 主线",
    reviewMetric: "站可选复习",
    runtimeLabel: "BEAM 进程与监督关系示意图",
    tiersKicker: "三层学习路线",
    tiersTitle: "先认字，再做事",
    tiersLead:
      "From Scratch 讲两门语言怎样写。进阶讲 BEAM 怎样运行。高级再处理故障、容量和多个节点。",
    scratchTitle: "从值和类型开始",
    availableNow: "现在就能学",
    scratchDescription:
      "两门语言分开讲。每条 9 课。先写长形式，再看缩写。学完任意一条，就能进入 BEAM 主线。",
    lessonCount: (count: number, shell: string) => `${count} 课 · 从 ${shell} 开始`,
    intermediateTitle: "让进程合作",
    beamMainline: "BEAM 主线",
    intermediateDescription:
      "认识进程、mailbox、消息和 OTP。两种语言从这里开始放在一起看。",
    startLine: "起跑线 →",
    messages: "消息与超时 →",
    otp: "OTP 消息章法 →",
    advancedTitle: "让系统扛住故障",
    afterMainline: "完成主线后",
    advancedDescription:
      "处理监督、背压、节点失联和互操作。最后做一支可靠任务小队。",
    supervision: "监督树 →",
    nodes: "节点失联 →",
    capstoneLink: "综合练习 →",
    quickKicker: "常用入口",
    quickTitle: "常用资料，随时可查",
    openResources: "打开学习工具箱",
    howKicker: "怎么学",
    howTitle: "先猜结果，再运行代码",
    howLead:
      "每一课都有代码可改。结果和预想不同时，先看输出，再只改一个地方。这样容易找到原因。",
    pillars: (checkpoints: number) => [
      {
        number: "01",
        title: "先跑代码",
        metric: "每课一段短代码",
        description:
          "每个新概念都有一小段代码，可以放进 IEx 或 erl 运行。页面动画会把消息传递画出来。",
        accent: "blue",
      },
      {
        number: "02",
        title: "两种写法",
        metric: "同题两种写法",
        description:
          "同一个任务，分别用 Elixir 和 Erlang 来写。写法不同，都运行在 BEAM 上。",
        accent: "orange",
      },
      {
        number: "03",
        title: "改一处，再运行",
        metric: `${checkpoints} 次小挑战`,
        description:
          "做一道小题，翻译一段代码，再改一个条件。答错没关系，结果会告诉你下一步该试什么。",
        accent: "green",
      },
      {
        number: "04",
        title: "看看哪里会坏",
        metric: "故意制造故障",
        description:
          "让回信迟到，让 mailbox 堆积，让进程退出。观察结果，也记住这个实验不能说明什么。",
        accent: "violet",
      },
    ],
    bridgeKicker: "汇合处",
    bridgeTitle: "写法不同，骨架相通",
    bridgeLead:
      "学过一门，不必把另一门从头重学。先认出相同的值、模式和函数，再看它们怎样在 BEAM 上使用进程与消息。",
    bridgeSteps: [
      ["拿熟悉的写法当尺子", "先用学过的语言看清数据和函数。"],
      ["对照另一种写法", "找相同的 atom、tuple、模式和模块。"],
      ["共用一套运行时本领", "进程、消息和监督，从这里一起学。"],
    ],
    bridgeLink: "看两种语言怎样对暗号",
    sameVm: "同一 VM",
    mappingRows: [
      [":ok", "ok", "同一个标签 atom"],
      ["Foo.bar()", "'Elixir.Foo':bar()", "找到同一个模块"],
      [":lists.reverse(xs)", "lists:reverse(Xs)", "借用同一个 Erlang 工具"],
      ["fn x -> x * 2 end", "fun(X) -> X * 2 end", "都在创建匿名函数"],
      ["GenServer", "gen_server", "同一个 OTP behaviour"],
    ],
    sharedIdeas: "共同概念",
    concepts: ["数据 term", "小进程 process", "收信箱 mailbox", "调度器 scheduler"],
    roadmapKicker: "进阶与高级 · BEAM 主线",
    roadmapTitle: "从进程消息，到可靠系统",
    roadmapLead: (main: number, review: number) =>
      `主线有 ${main} 站，另有 ${review} 站语言复习。地图会全部列出；可选站不会挡住“下一站”。如果值、模式、函数或模块还陌生，先走上面的 From Scratch 路线。Elixir 和 Erlang 任选一条。`,
    labKicker: "试 3 分钟",
    labTitle: "发消息，等回信",
    labLead:
      "每个进程都有一个 mailbox，像驿站收信箱。先发几条消息，再逐条处理。打开“故意不回 reply”，看看消息已经处理、reply 却没有发出时会怎样。",
    labPoints: [
      "消息发出，不等于已经收到或处理",
      "timeout 结束等待，但不会撤回消息",
      "mailbox 会积压，不能只收不处理",
    ],
    learnMailbox: "学习进程与 mailbox",
    openPlayground: "去 Playground 写代码",
    capstoneEyebrow: "第 12 站 · 综合练习",
    capstoneTitle: "做一个任务调度器",
    capstoneLead:
      "它像驿站总管。Elixir 收下任务，Erlang 的 gen_server 排队并安排 worker。即使回复迟到、worker 退出或节点断开，系统也要给出清楚结果。",
    capstoneTags: ["有界队列", "监督树", "重试 / 幂等", "双语测试", "Release"],
    capstoneButton: "查看任务要求",
    capstoneDiagram: "可靠任务调度器结构示意",
    resourcesKicker: "学习工具箱",
    resourcesTitle: "遇到问题，去查资料",
    resourcesLead:
      "可以查官方文档，也可以看教程或去社区提问。每个链接旁都写着用途，不必逐个打开。",
    resourceCount: (count: number) => `${count} 个资源`,
    resourceNote: "这里每类列出两个。更多资料可按名字或用途搜索。",
  },
  en: {
    heroEyebrow: "Erlang and Elixir both run on the BEAM",
    heroTitle: "Learn by doing",
    heroLead: "Start with values, types, and functions. Once the syntax feels familiar, see how processes work together.",
    heroStrong: "Elixir and Erlang each have their own beginner path. Pick one. You do not need to learn both at once.",
    routePickerLabel: "Choose a learning path",
    scratch: "FROM SCRATCH",
    elixirRoute: "Elixir from scratch",
    elixirRouteNote: "9 lessons · finish with &1 and pipelines",
    erlangRoute: "Erlang from scratch",
    erlangRouteNote: "9 lessons · from terms to modules",
    knowsSyntax: "I know the basics",
    beamRoute: "Enter the BEAM path",
    beamRouteNote: "Processes · messages · OTP · supervisors",
    pathMetric: "beginner paths",
    lessonMetric: "syntax lessons",
    mainlineMetric: "BEAM stations",
    reviewMetric: "optional reviews",
    runtimeLabel: "Diagram of BEAM processes and supervision",
    tiersKicker: "Three learning levels",
    tiersTitle: "Read the words. Then build.",
    tiersLead:
      "From Scratch teaches how each language is written. The next level explains how the BEAM runs. Advanced lessons cover failure, capacity, and multiple nodes.",
    scratchTitle: "Start with values and types",
    availableNow: "Ready now",
    scratchDescription:
      "The languages are taught separately, nine lessons each. Write the long form first, then learn the shortcuts. Finish either path to join the BEAM mainline.",
    lessonCount: (count: number, shell: string) => `${count} lessons · start in ${shell}`,
    intermediateTitle: "Make processes cooperate",
    beamMainline: "BEAM mainline",
    intermediateDescription:
      "Meet processes, mailboxes, messages, and OTP. From here, compare both languages side by side.",
    startLine: "Start line →",
    messages: "Messages and timeouts →",
    otp: "OTP message patterns →",
    advancedTitle: "Build for failure",
    afterMainline: "After the mainline",
    advancedDescription:
      "Handle supervision, backpressure, lost nodes, and interop. Finish by building a dependable task crew.",
    supervision: "Supervision trees →",
    nodes: "When nodes disappear →",
    capstoneLink: "Capstone →",
    quickKicker: "Quick links",
    quickTitle: "Useful references, close at hand",
    openResources: "Open the learning toolbox",
    howKicker: "How to learn",
    howTitle: "Guess first. Then run the code.",
    howLead:
      "Every lesson has code you can change. If the output surprises you, read it, then change one thing. That makes the cause easier to find.",
    pillars: (checkpoints: number) => [
      {
        number: "01",
        title: "Run code first",
        metric: "A short example in every lesson",
        description:
          "Every new idea comes with a small example for IEx or erl. The page also shows messages moving between processes.",
        accent: "blue",
      },
      {
        number: "02",
        title: "See both forms",
        metric: "One task, two languages",
        description:
          "Solve the same problem in Elixir and Erlang. The syntax differs, but both run on the BEAM.",
        accent: "orange",
      },
      {
        number: "03",
        title: "Change one thing",
        metric: `${checkpoints} small challenges`,
        description:
          "Answer a question, translate a snippet, or change one condition. A wrong answer is still useful: it tells you what to try next.",
        accent: "green",
      },
      {
        number: "04",
        title: "Let it break",
        metric: "Safe failure experiments",
        description:
          "Delay a reply, fill a mailbox, or stop a process. Watch what happens—and notice what the experiment cannot prove.",
        accent: "violet",
      },
    ],
    bridgeKicker: "Where the paths meet",
    bridgeTitle: "Different syntax. Shared bones.",
    bridgeLead:
      "Once you know one language, you do not need to relearn everything. Spot the same values, patterns, and functions, then see how both use BEAM processes and messages.",
    bridgeSteps: [
      ["Use the familiar language as a ruler", "Start with the data and functions you already understand."],
      ["Compare the other spelling", "Find the same atoms, tuples, patterns, and modules."],
      ["Share the runtime skills", "Learn processes, messages, and supervision together."],
    ],
    bridgeLink: "See how the two languages line up",
    sameVm: "ONE VM",
    mappingRows: [
      [":ok", "ok", "the same atom label"],
      ["Foo.bar()", "'Elixir.Foo':bar()", "the same module underneath"],
      [":lists.reverse(xs)", "lists:reverse(Xs)", "the same Erlang tool"],
      ["fn x -> x * 2 end", "fun(X) -> X * 2 end", "both create an anonymous function"],
      ["GenServer", "gen_server", "the same OTP behaviour"],
    ],
    sharedIdeas: "Shared ideas",
    concepts: ["data terms", "small processes", "mailboxes", "schedulers"],
    roadmapKicker: "Intermediate and advanced · BEAM mainline",
    roadmapTitle: "From process messages to reliable systems",
    roadmapLead: (main: number, review: number) =>
      `The mainline has ${main} stations and ${review} optional language reviews. The map shows them all, but review stations never block “next.” If values, patterns, functions, or modules are still unfamiliar, take either From Scratch path first.`,
    labKicker: "Try it for 3 minutes",
    labTitle: "Send a message. Wait for a reply.",
    labLead:
      "Every process has a mailbox. Send a few messages, then handle them one by one. Turn on “drop reply” to see what happens when work is handled but no answer comes back.",
    labPoints: [
      "Sending a message does not mean it was received or handled",
      "A timeout ends the wait; it does not recall the message",
      "A mailbox can pile up if work arrives faster than it is handled",
    ],
    learnMailbox: "Learn processes and mailboxes",
    openPlayground: "Write code in the Playground",
    capstoneEyebrow: "Station 12 · Capstone",
    capstoneTitle: "Build a task scheduler",
    capstoneLead:
      "Think of it as a small station master. Elixir accepts jobs. An Erlang gen_server queues them and assigns workers. Late replies, stopped workers, and lost nodes still need clear outcomes.",
    capstoneTags: ["Bounded queue", "Supervision tree", "Retry / idempotency", "Cross-language tests", "Release"],
    capstoneButton: "See the requirements",
    capstoneDiagram: "Reliable task scheduler structure",
    resourcesKicker: "Learning toolbox",
    resourcesTitle: "When you are stuck, look it up",
    resourcesLead:
      "Use the official docs, a tutorial, or a community. Each link says what it is good for, so you do not have to open them all.",
    resourceCount: (count: number) => `${count} ${count === 1 ? "resource" : "resources"}`,
    resourceNote: "This preview shows two from each group. Search the full toolbox by name or purpose.",
  },
} as const;

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale: candidate } = await params;
  if (!isLocale(candidate)) return {};

  return {
    title: { absolute: siteCopy[candidate].title },
    description: siteCopy[candidate].description,
    alternates: localeAlternates(candidate),
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale: candidate } = await params;
  if (!isLocale(candidate)) notFound();

  const locale: Locale = candidate;
  const copy = homeCopy[locale];
  const basicPaths = getBasicPaths(locale);
  const basicPathStats = getBasicPathStats(locale);
  const { courseModules, courseStats, stages } = getCourseCatalog(locale);
  const resourceDirectory = await getResourceDirectory(locale);
  const featuredResources = resourceDirectory.resources.filter(
    (resource) => resource.featured,
  );
  const pillars = copy.pillars(courseStats.checkpoints);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="hero">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow eyebrow--dark">
                <span />
                {copy.heroEyebrow}
              </div>
              <h1>
                {copy.heroTitle}
                <span className="hero-language hero-language--erlang">Erlang</span>
                <span className="hero-plus">+</span>
                <span className="hero-language hero-language--elixir">Elixir</span>
              </h1>
              <p className="hero-lead">
                {copy.heroLead}
                <strong>{copy.heroStrong}</strong>
              </p>

              <div className="route-picker" aria-label={copy.routePickerLabel}>
                <LocalizedLink
                  locale={locale}
                  className="route-card route-card--primary"
                  href="/from-scratch/elixir"
                >
                  <span>{copy.scratch}</span>
                  <strong>{copy.elixirRoute}</strong>
                  <small>{copy.elixirRouteNote}</small>
                </LocalizedLink>
                <LocalizedLink locale={locale} className="route-card" href="/from-scratch/erlang">
                  <span>{copy.scratch}</span>
                  <strong>{copy.erlangRoute}</strong>
                  <small>{copy.erlangRouteNote}</small>
                </LocalizedLink>
                <LocalizedLink locale={locale} className="route-card" href="/learn/start-line">
                  <span>{copy.knowsSyntax}</span>
                  <strong>{copy.beamRoute}</strong>
                  <small>{copy.beamRouteNote}</small>
                </LocalizedLink>
              </div>

              <div className="hero-metrics">
                <div><strong>{basicPathStats.paths}</strong><span>{copy.pathMetric}</span></div>
                <div><strong>{basicPathStats.lessons}</strong><span>{copy.lessonMetric}</span></div>
                <div><strong>{courseStats.mainlineStations}</strong><span>{copy.mainlineMetric}</span></div>
                <div><strong>{courseStats.optionalReviewStations}</strong><span>{copy.reviewMetric}</span></div>
              </div>
            </div>

            <div className="hero-visual" aria-label={copy.runtimeLabel}>
              <div className="runtime-label"><span className="live-dot" />BEAM RUNTIME</div>
              <div className="beam-orbit beam-orbit--outer" />
              <div className="beam-orbit beam-orbit--inner" />
              <div className="beam-message beam-message--one">message</div>
              <div className="beam-message beam-message--two">DOWN</div>
              <div className="beam-message beam-message--three">reply</div>
              <div className="beam-core">
                <span>VM</span><strong>BEAM</strong>
                <small>process · mailbox<br />scheduler · isolation</small>
              </div>
              <div className="beam-node beam-node--one"><span>01</span><strong>Elixir</strong><small>GenServer</small></div>
              <div className="beam-node beam-node--two"><span>02</span><strong>Erlang</strong><small>gen_server</small></div>
              <div className="beam-node beam-node--three"><span>03</span><strong>OTP</strong><small>Supervisor</small></div>
              <div className="scheduler-strip">
                <div><span>S1</span><i /><i /><i /></div>
                <div><span>S2</span><i /><i /></div>
                <div><span>S3</span><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="learning-paths-section" id="roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div><span className="section-kicker">{copy.tiersKicker}</span><h2>{copy.tiersTitle}</h2></div>
              <p>{copy.tiersLead}</p>
            </div>
            <div className="learning-tier-grid">
              <article className="learning-tier learning-tier--scratch">
                <div className="learning-tier-head">
                  <span>01</span><div><small>FROM SCRATCH</small><h3>{copy.scratchTitle}</h3></div><b>{copy.availableNow}</b>
                </div>
                <p>{copy.scratchDescription}</p>
                <div className="learning-language-links">
                  {basicPaths.map((path) => (
                    <LocalizedLink locale={locale} className={`learning-language-link learning-language-link--${path.id}`} href={`/from-scratch/${path.id}`} key={path.id}>
                      <span>{path.language}</span><strong>{path.shortTitle}</strong>
                      <small>{copy.lessonCount(path.lessons.length, path.shell)}</small><b aria-hidden="true">→</b>
                    </LocalizedLink>
                  ))}
                </div>
              </article>
              <article className="learning-tier learning-tier--intermediate">
                <div className="learning-tier-head"><span>02</span><div><small>INTERMEDIATE</small><h3>{copy.intermediateTitle}</h3></div><b>{copy.beamMainline}</b></div>
                <p>{copy.intermediateDescription}</p>
                <div className="learning-tier-links">
                  <LocalizedLink locale={locale} href="/learn/start-line">{copy.startLine}</LocalizedLink>
                  <LocalizedLink locale={locale} href="/learn/processes-and-mailboxes">{copy.messages}</LocalizedLink>
                  <LocalizedLink locale={locale} href="/learn/otp-behaviours">{copy.otp}</LocalizedLink>
                </div>
              </article>
              <article className="learning-tier learning-tier--advanced">
                <div className="learning-tier-head"><span>03</span><div><small>ADVANCED</small><h3>{copy.advancedTitle}</h3></div><b>{copy.afterMainline}</b></div>
                <p>{copy.advancedDescription}</p>
                <div className="learning-tier-links">
                  <LocalizedLink locale={locale} href="/learn/supervision-trees">{copy.supervision}</LocalizedLink>
                  <LocalizedLink locale={locale} href="/learn/distributed-operations">{copy.nodes}</LocalizedLink>
                  <LocalizedLink locale={locale} href="/learn/reliable-scheduler">{copy.capstoneLink}</LocalizedLink>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="quick-resources" aria-labelledby="quick-resources-title">
          <div className="section-shell">
            <div className="quick-resources-heading">
              <div><span className="section-kicker">{copy.quickKicker}</span><h2 id="quick-resources-title">{copy.quickTitle}</h2></div>
              <LocalizedLink locale={locale} href="/resources">{copy.openResources}<span aria-hidden="true">→</span></LocalizedLink>
            </div>
            <div className="resource-strip">
              {featuredResources.map((resource) => (
                <a className={`resource-chip resource-chip--${resource.accent}`} href={resource.href} target="_blank" rel="noreferrer" key={resource.href}>
                  <span className="resource-monogram" aria-hidden="true">{resource.shortLabel.slice(0, 2)}</span>
                  <span><strong>{resource.shortLabel}</strong><small>{resource.description}</small></span><b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div><span className="section-kicker">{copy.howKicker}</span><h2>{copy.howTitle}</h2></div><p>{copy.howLead}</p>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article className={`pillar-card pillar-card--${pillar.accent}`} key={pillar.number}>
                  <div className="pillar-top"><span>{pillar.number}</span><i /></div>
                  <h3>{pillar.title}</h3><strong>{pillar.metric}</strong><p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bridge-section">
          <div className="section-shell bridge-grid">
            <div className="bridge-copy">
              <span className="section-kicker">{copy.bridgeKicker}</span><h2>{copy.bridgeTitle}</h2><p>{copy.bridgeLead}</p>
              <ol className="bridge-steps">
                {copy.bridgeSteps.map(([title, description], index) => (
                  <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></li>
                ))}
              </ol>
              <LocalizedLink locale={locale} className="text-link" href="/learn/shared-semantics">{copy.bridgeLink}<span aria-hidden="true">→</span></LocalizedLink>
            </div>
            <div className="mapping-card">
              <div className="mapping-header">
                <div><span className="language-dot language-dot--elixir" />ELIXIR</div><span>{copy.sameVm}</span><div><span className="language-dot language-dot--erlang" />ERLANG</div>
              </div>
              {copy.mappingRows.map(([elixir, erlang, meaning]) => (
                <div className="mapping-row" key={elixir}><code>{elixir}</code><span><i />{meaning}<i /></span><code>{erlang}</code></div>
              ))}
              <div className="mapping-footer"><span>{copy.sharedIdeas}</span><div>{copy.concepts.map((concept) => <b key={concept}>{concept}</b>)}</div></div>
            </div>
          </div>
        </section>

        <section className="roadmap-section" id="beam-roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div><span className="section-kicker">{copy.roadmapKicker}</span><h2>{copy.roadmapTitle}</h2></div>
              <p>{copy.roadmapLead(courseStats.mainlineStations, courseStats.optionalReviewStations)}</p>
            </div>
            <CourseMap locale={locale} modules={courseModules} stages={stages} />
          </div>
        </section>

        <section className="lab-section" id="lab">
          <div className="section-shell lab-grid">
            <div className="lab-copy">
              <span className="section-kicker section-kicker--mint">{copy.labKicker}</span><h2>{copy.labTitle}</h2><p>{copy.labLead}</p>
              <ul className="lab-learning-list">
                {copy.labPoints.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}
              </ul>
              <div className="lab-actions">
                <LocalizedLink locale={locale} className="button button--light" href="/learn/processes-and-mailboxes">{copy.learnMailbox}<span aria-hidden="true">→</span></LocalizedLink>
                <LocalizedLink locale={locale} className="button button--outline-light" href="/playground">{copy.openPlayground}</LocalizedLink>
              </div>
            </div>
            <MessageLab locale={locale} />
          </div>
        </section>

        <section className="capstone-section">
          <div className="section-shell capstone-card">
            <div className="capstone-copy">
              <div className="eyebrow"><span />{copy.capstoneEyebrow}</div><h2>{copy.capstoneTitle}</h2><p>{copy.capstoneLead}</p>
              <div className="capstone-tags">{copy.capstoneTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <LocalizedLink locale={locale} className="button button--dark" href="/learn/reliable-scheduler">{copy.capstoneButton}<span aria-hidden="true">→</span></LocalizedLink>
            </div>
            <div className="capstone-diagram" aria-label={copy.capstoneDiagram}>
              <div className="diagram-level diagram-level--api"><span>ELIXIR API</span><strong>validate · normalize · respond</strong></div><i />
              <div className="diagram-level diagram-level--core"><span>ERLANG CORE</span><strong>queue · dispatch · retry</strong></div><i />
              <div className="diagram-workers"><div>worker 01</div><div>worker 02</div><div>worker 03</div></div>
              <div className="diagram-supervisor"><span>SUPERVISOR</span><b>crash → observe → restart</b></div>
            </div>
          </div>
        </section>

        <section className="resources-section" id="resources">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div><span className="section-kicker">{copy.resourcesKicker}</span><h2>{copy.resourcesTitle}</h2></div><p>{copy.resourcesLead}</p>
            </div>
            <div className="resource-groups">
              {resourceDirectory.groups.map((group) => (
                <div className="resource-group" key={group.title}>
                  <div className="resource-group-heading"><span>{group.title}</span><small>{copy.resourceCount(group.resources.length)}</small></div>
                  <div className="resource-list">
                    {group.resources.slice(0, 2).map((resource) => (
                      <a href={resource.href} target="_blank" rel="noreferrer" key={resource.href}>
                        <span className={`resource-mark resource-mark--${resource.accent}`} aria-hidden="true">{resource.shortLabel.slice(0, 2)}</span>
                        <span><strong>{resource.label}</strong><small>{resource.description}</small></span><b aria-hidden="true">↗</b>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="resources-preview-cta">
              <p>{copy.resourceNote}</p>
              <LocalizedLink locale={locale} className="button button--dark" href="/resources">{copy.openResources}<span aria-hidden="true">→</span></LocalizedLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
