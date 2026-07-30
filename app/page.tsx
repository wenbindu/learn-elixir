import type { Metadata } from "next";
import Link from "next/link";
import { CourseMap } from "./components/CourseMap";
import { MessageLab } from "./components/MessageLab";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { courseModules, courseStats, stages } from "./course-data";
import { getResourceDirectory } from "./resource-data";

export const metadata: Metadata = {
  title: {
    absolute: "BEAM Path — 学 Erlang 和 Elixir",
  },
  description:
    "从一段能运行的代码开始。猜结果，改代码，看输出。逐步认识 Erlang、Elixir、BEAM 和 OTP。",
};

const pillars = [
  {
    number: "01",
    title: "先跑代码",
    metric: `${courseStats.stations} 次跑代码`,
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
                从第一条消息开始。看进程怎样合作，也看它们出错后怎样恢复。
                <strong>
                  先猜，再运行。遇到报错，读一读；它常会指出问题在哪。
                </strong>
              </p>

              <div className="route-picker" aria-label="选择学习入口">
                <Link
                  className="route-card route-card--primary"
                  href="/learn/install-toolchain"
                >
                  <span>零基础</span>
                  <strong>先把本地工具装好</strong>
                  <small>第 00 站 · Erlang、Elixir 与 Mix</small>
                </Link>
                <Link className="route-card" href="/learn/elixir-foundations">
                  <span>已有编程基础</span>
                  <strong>先用 Elixir 动手</strong>
                  <small>第 03 站 · 几分钟看到输出</small>
                </Link>
                <Link className="route-card" href="/learn/otp-behaviours">
                  <span>已有 Elixir 基础</span>
                  <strong>看进程怎样合作</strong>
                  <small>第 07 站 · 认识 OTP 和 behaviour</small>
                </Link>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>{courseStats.stations}</strong>
                  <span>学习小站</span>
                </div>
                <div>
                  <strong>{courseStats.checkpoints}</strong>
                  <span>次练习与自查</span>
                </div>
                <div>
                  <strong>3 分钟</strong>
                  <span>先试玩</span>
                </div>
                <div>
                  <strong>2 → 1</strong>
                  <span>两种语言 · 一个 VM</span>
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
              <span className="section-kicker">两种语言</span>
              <h2>先写 Elixir，再读 Erlang</h2>
              <p>
                不必先学完一门，再从头学另一门。先分别熟悉两种写法。
                到了进程和消息，再把它们放在一起练。
              </p>
              <ol className="bridge-steps">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Elixir：先写出结果</strong>
                    <p>模式匹配、多子句函数、Enum、Mix 与 ExUnit。</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>Erlang：读另一种写法</strong>
                    <p>term、模块、binary、递归、Rebar3 与 EUnit。</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>BEAM / OTP：让进程合作</strong>
                    <p>消息、behaviour、监督树、容量与分布式。</p>
                  </div>
                </li>
              </ol>
              <Link className="text-link" href="/learn/shared-semantics">
                对照两种写法
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

        <section className="roadmap-section" id="roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">学习地图</span>
                <h2>从第一段代码，到可靠系统</h2>
              </div>
              <p>
                这里有 {courseStats.stations} 站。可以按顺序走，也可以先找眼下想学的内容。
                每站都有代码、实验和自查。
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
