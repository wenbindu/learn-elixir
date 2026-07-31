import type { Metadata } from "next";
import Link from "next/link";
import { CourseMap } from "./components/CourseMap";
import { MessageLab } from "./components/MessageLab";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { basicPaths, basicPathStats } from "./basic-path-data";
import { courseModules, courseStats, stages } from "./course-data";
import { getResourceDirectory } from "./resource-data";

export const metadata: Metadata = {
  title: {
    absolute: "BEAM Path — 学 Erlang 和 Elixir",
  },
  description:
    "Elixir、Erlang 两条零基础语法路线。从类型和函数开始，再学习 BEAM、进程、OTP 与监督树。",
};

const pillars = [
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
    metric: `${courseStats.checkpoints} 次小挑战`,
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
];

const mappingRows = [
  [":ok", "ok", "同一个标签 atom"],
  ["Foo.bar()", "'Elixir.Foo':bar()", "找到同一个模块"],
  [":lists.reverse(xs)", "lists:reverse(Xs)", "借用同一个 Erlang 工具"],
  ["fn x -> x * 2 end", "fun(X) -> X * 2 end", "都在创建匿名函数"],
  ["GenServer", "gen_server", "同一个 OTP behaviour"],
];

export default async function Home() {
  const resourceDirectory = await getResourceDirectory();
  const featuredResources = resourceDirectory.resources.filter(
    (resource) => resource.featured,
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow eyebrow--dark">
                <span />
                Erlang 和 Elixir 都运行在 BEAM 上
              </div>
              <h1>
                动手学
                <span className="hero-language hero-language--erlang">
                  Erlang
                </span>
                <span className="hero-plus">+</span>
                <span className="hero-language hero-language--elixir">
                  Elixir
                </span>
              </h1>
              <p className="hero-lead">
                先从值、类型和函数开始。语法读顺以后，再看进程怎样合作。
                <strong>
                  Elixir 和 Erlang 各有一条从零路线。任选一条，不必一起学。
                </strong>
              </p>

              <div className="route-picker" aria-label="选择学习入口">
                <Link
                  className="route-card route-card--primary"
                  href="/from-scratch/elixir"
                >
                  <span>FROM SCRATCH</span>
                  <strong>Elixir 从零开始</strong>
                  <small>9 课 · 最后读懂 &amp;1 与管道</small>
                </Link>
                <Link className="route-card" href="/from-scratch/erlang">
                  <span>FROM SCRATCH</span>
                  <strong>Erlang 从零开始</strong>
                  <small>9 课 · 从 term 走到模块</small>
                </Link>
                <Link className="route-card" href="/learn/start-line">
                  <span>已懂基础语法</span>
                  <strong>进入 BEAM 主线</strong>
                  <small>进程 · 消息 · OTP · 监督树</small>
                </Link>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>{basicPathStats.paths}</strong>
                  <span>条从零路线</span>
                </div>
                <div>
                  <strong>{basicPathStats.lessons}</strong>
                  <span>节基础语法</span>
                </div>
                <div>
                  <strong>{courseStats.mainlineStations}</strong>
                  <span>站 BEAM 主线</span>
                </div>
                <div>
                  <strong>{courseStats.optionalReviewStations}</strong>
                  <span>站可选复习</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="BEAM 进程与监督关系示意图">
              <div className="runtime-label">
                <span className="live-dot" />
                BEAM RUNTIME
              </div>
              <div className="beam-orbit beam-orbit--outer" />
              <div className="beam-orbit beam-orbit--inner" />
              <div className="beam-message beam-message--one">message</div>
              <div className="beam-message beam-message--two">DOWN</div>
              <div className="beam-message beam-message--three">reply</div>

              <div className="beam-core">
                <span>VM</span>
                <strong>BEAM</strong>
                <small>
                  process · mailbox
                  <br />
                  scheduler · isolation
                </small>
              </div>

              <div className="beam-node beam-node--one">
                <span>01</span>
                <strong>Elixir</strong>
                <small>GenServer</small>
              </div>
              <div className="beam-node beam-node--two">
                <span>02</span>
                <strong>Erlang</strong>
                <small>gen_server</small>
              </div>
              <div className="beam-node beam-node--three">
                <span>03</span>
                <strong>OTP</strong>
                <small>Supervisor</small>
              </div>

              <div className="scheduler-strip">
                <div>
                  <span>S1</span>
                  <i />
                  <i />
                  <i />
                </div>
                <div>
                  <span>S2</span>
                  <i />
                  <i />
                </div>
                <div>
                  <span>S3</span>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="learning-paths-section" id="roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">三层学习路线</span>
                <h2>先认字，再做事</h2>
              </div>
              <p>
                From Scratch 讲两门语言怎样写。进阶讲 BEAM 怎样运行。
                高级再处理故障、容量和多个节点。
              </p>
            </div>

            <div className="learning-tier-grid">
              <article className="learning-tier learning-tier--scratch">
                <div className="learning-tier-head">
                  <span>01</span>
                  <div>
                    <small>FROM SCRATCH</small>
                    <h3>从值和类型开始</h3>
                  </div>
                  <b>现在就能学</b>
                </div>
                <p>
                  两门语言分开讲。每条 9 课。先写长形式，再看缩写。
                  学完任意一条，就能进入 BEAM 主线。
                </p>
                <div className="learning-language-links">
                  {basicPaths.map((path) => (
                    <Link
                      className={`learning-language-link learning-language-link--${path.id}`}
                      href={`/from-scratch/${path.id}`}
                      key={path.id}
                    >
                      <span>{path.language}</span>
                      <strong>{path.shortTitle}</strong>
                      <small>{path.lessons.length} 课 · 从 {path.shell} 开始</small>
                      <b aria-hidden="true">→</b>
                    </Link>
                  ))}
                </div>
              </article>

              <article className="learning-tier learning-tier--intermediate">
                <div className="learning-tier-head">
                  <span>02</span>
                  <div>
                    <small>INTERMEDIATE</small>
                    <h3>让进程合作</h3>
                  </div>
                  <b>BEAM 主线</b>
                </div>
                <p>
                  认识进程、mailbox、消息和 OTP。两种语言从这里开始放在一起看。
                </p>
                <div className="learning-tier-links">
                  <Link href="/learn/start-line">起跑线 →</Link>
                  <Link href="/learn/processes-and-mailboxes">消息与超时 →</Link>
                  <Link href="/learn/otp-behaviours">OTP 消息章法 →</Link>
                </div>
              </article>

              <article className="learning-tier learning-tier--advanced">
                <div className="learning-tier-head">
                  <span>03</span>
                  <div>
                    <small>ADVANCED</small>
                    <h3>让系统扛住故障</h3>
                  </div>
                  <b>完成主线后</b>
                </div>
                <p>
                  处理监督、背压、节点失联和互操作。最后做一支可靠任务小队。
                </p>
                <div className="learning-tier-links">
                  <Link href="/learn/supervision-trees">监督树 →</Link>
                  <Link href="/learn/distributed-operations">节点失联 →</Link>
                  <Link href="/learn/reliable-scheduler">综合练习 →</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="quick-resources" aria-labelledby="quick-resources-title">
          <div className="section-shell">
            <div className="quick-resources-heading">
              <div>
                <span className="section-kicker">常用入口</span>
                <h2 id="quick-resources-title">常用资料，随时可查</h2>
              </div>
              <Link href="/resources">
                打开学习工具箱
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="resource-strip">
              {featuredResources.map((resource) => (
                <a
                  className={`resource-chip resource-chip--${resource.accent}`}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  key={resource.href}
                >
                  <span className="resource-monogram" aria-hidden="true">
                    {resource.shortLabel.slice(0, 2)}
                  </span>
                  <span>
                    <strong>{resource.shortLabel}</strong>
                    <small>{resource.description}</small>
                  </span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">怎么学</span>
                <h2>先猜结果，再运行代码</h2>
              </div>
              <p>
                每一课都有代码可改。结果和预想不同时，先看输出，
                再只改一个地方。这样容易找到原因。
              </p>
            </div>

            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article
                  className={`pillar-card pillar-card--${pillar.accent}`}
                  key={pillar.number}
                >
                  <div className="pillar-top">
                    <span>{pillar.number}</span>
                    <i />
                  </div>
                  <h3>{pillar.title}</h3>
                  <strong>{pillar.metric}</strong>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bridge-section">
          <div className="section-shell bridge-grid">
            <div className="bridge-copy">
              <span className="section-kicker">汇合处</span>
              <h2>写法不同，骨架相通</h2>
              <p>
                学过一门，不必把另一门从头重学。先认出相同的值、模式和函数，
                再看它们怎样在 BEAM 上使用进程与消息。
              </p>
              <ol className="bridge-steps">
                <li>
                  <span>1</span>
                  <div>
                    <strong>拿熟悉的写法当尺子</strong>
                    <p>先用学过的语言看清数据和函数。</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>对照另一种写法</strong>
                    <p>找相同的 atom、tuple、模式和模块。</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>共用一套运行时本领</strong>
                    <p>进程、消息和监督，从这里一起学。</p>
                  </div>
                </li>
              </ol>
              <Link className="text-link" href="/learn/shared-semantics">
                看两种语言怎样对暗号
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mapping-card">
              <div className="mapping-header">
                <div>
                  <span className="language-dot language-dot--elixir" />
                  ELIXIR
                </div>
                <span>同一 VM</span>
                <div>
                  <span className="language-dot language-dot--erlang" />
                  ERLANG
                </div>
              </div>
              {mappingRows.map(([elixir, erlang, meaning]) => (
                <div className="mapping-row" key={elixir}>
                  <code>{elixir}</code>
                  <span>
                    <i />
                    {meaning}
                    <i />
                  </span>
                  <code>{erlang}</code>
                </div>
              ))}
              <div className="mapping-footer">
                <span>共同概念</span>
                <div>
                  <b>数据 term</b>
                  <b>小进程 process</b>
                  <b>收信箱 mailbox</b>
                  <b>调度器 scheduler</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="roadmap-section" id="beam-roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">进阶与高级 · BEAM 主线</span>
                <h2>从进程消息，到可靠系统</h2>
              </div>
              <p>
                主线有 {courseStats.mainlineStations} 站，另有{" "}
                {courseStats.optionalReviewStations} 站语言复习。地图会全部列出；
                可选站不会挡住“下一站”。如果值、模式、函数或模块还陌生，
                先走上面的 From Scratch 路线。Elixir 和 Erlang 任选一条。
              </p>
            </div>
            <CourseMap modules={courseModules} stages={stages} />
          </div>
        </section>

        <section className="lab-section" id="lab">
          <div className="section-shell lab-grid">
            <div className="lab-copy">
              <span className="section-kicker section-kicker--mint">试 3 分钟</span>
              <h2>发消息，等回信</h2>
              <p>
                每个进程都有一个 mailbox，像驿站收信箱。先发几条消息，再逐条处理。
                打开“故意不回 reply”，看看消息已经处理、reply 却没有发出时会怎样。
              </p>
              <ul className="lab-learning-list">
                <li>
                  <span>01</span>
                  消息发出，不等于已经收到或处理
                </li>
                <li>
                  <span>02</span>
                  timeout 结束等待，但不会撤回消息
                </li>
                <li>
                  <span>03</span>
                  mailbox 会积压，不能只收不处理
                </li>
              </ul>
              <div className="lab-actions">
                <Link
                  className="button button--light"
                  href="/learn/processes-and-mailboxes"
                >
                  学习进程与 mailbox
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="button button--outline-light"
                  href="/playground"
                >
                  去 Playground 写代码
                </Link>
              </div>
            </div>
            <MessageLab />
          </div>
        </section>

        <section className="capstone-section">
          <div className="section-shell capstone-card">
            <div className="capstone-copy">
              <div className="eyebrow">
                <span />
                第 12 站 · 综合练习
              </div>
              <h2>做一个任务调度器</h2>
              <p>
                它像驿站总管。Elixir 收下任务，Erlang 的 gen_server
                排队并安排 worker。即使回复迟到、worker 退出或节点断开，
                系统也要给出清楚结果。
              </p>
              <div className="capstone-tags">
                <span>有界队列</span>
                <span>监督树</span>
                <span>重试 / 幂等</span>
                <span>双语测试</span>
                <span>Release</span>
              </div>
              <Link className="button button--dark" href="/learn/reliable-scheduler">
                查看任务要求
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="capstone-diagram" aria-label="可靠任务调度器结构示意">
              <div className="diagram-level diagram-level--api">
                <span>ELIXIR API</span>
                <strong>validate · normalize · respond</strong>
              </div>
              <i />
              <div className="diagram-level diagram-level--core">
                <span>ERLANG CORE</span>
                <strong>queue · dispatch · retry</strong>
              </div>
              <i />
              <div className="diagram-workers">
                <div>worker 01</div>
                <div>worker 02</div>
                <div>worker 03</div>
              </div>
              <div className="diagram-supervisor">
                <span>SUPERVISOR</span>
                <b>crash → observe → restart</b>
              </div>
            </div>
          </div>
        </section>

        <section className="resources-section" id="resources">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">学习工具箱</span>
                <h2>遇到问题，去查资料</h2>
              </div>
              <p>
                可以查官方文档，也可以看教程或去社区提问。
                每个链接旁都写着用途，不必逐个打开。
              </p>
            </div>

            <div className="resource-groups">
              {resourceDirectory.groups.map((group) => (
                <div className="resource-group" key={group.title}>
                  <div className="resource-group-heading">
                    <span>{group.title}</span>
                    <small>{group.resources.length} 个资源</small>
                  </div>
                  <div className="resource-list">
                    {group.resources.slice(0, 2).map((resource) => (
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        key={resource.href}
                      >
                        <span
                          className={`resource-mark resource-mark--${resource.accent}`}
                          aria-hidden="true"
                        >
                          {resource.shortLabel.slice(0, 2)}
                        </span>
                        <span>
                          <strong>{resource.label}</strong>
                          <small>{resource.description}</small>
                        </span>
                        <b aria-hidden="true">↗</b>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="resources-preview-cta">
              <p>
                这里每类列出两个。更多资料可按名字或用途搜索。
              </p>
              <Link className="button button--dark" href="/resources">
                打开学习工具箱
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
