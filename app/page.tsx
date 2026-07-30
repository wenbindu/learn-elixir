import type { Metadata } from "next";
import Link from "next/link";
import { CourseMap } from "./components/CourseMap";
import { MessageLab } from "./components/MessageLab";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { courseModules, stages } from "./course-data";
import { getResourceDirectory } from "./resource-data";

export const metadata: Metadata = {
  title: {
    absolute: "BEAM Path — 一起学 Erlang 与 Elixir",
  },
  description:
    "从第一段能运行的代码开始，认识 Erlang、Elixir、BEAM 和 OTP。边猜、边改、边观察，让程序亲自告诉你发生了什么。",
};

const pillars = [
  {
    number: "01",
    title: "先跑一跑",
    metric: "12 次跑代码",
    description:
      "每学到一个新东西，都有一小段代码可以放进 IEx 或 erl 亲手试。页面里的动画，会把原本看不见的消息传递画出来。",
    accent: "blue",
  },
  {
    number: "02",
    title: "放在一起比一比",
    metric: "同题两种写法",
    description:
      "同一个小任务，分别看看 Elixir 和 Erlang 怎么写。它们像用两种笔法写信，最后都交给同一套 BEAM 运行系统。",
    accent: "orange",
  },
  {
    number: "03",
    title: "学一点，试一点",
    metric: "46 次小挑战",
    description:
      "每走一小站，就做一道小题、翻译一段代码，再改一个条件看看结果。答错没关系，它正好告诉你下一步可以试什么。",
    accent: "green",
  },
  {
    number: "04",
    title: "放心玩坏",
    metric: "安心试错",
    description:
      "我们会故意让回信迟到、让 mailbox 排起长队，甚至让进程突然倒下。你可以放心试错，也会知道小实验能说明什么。",
    accent: "violet",
  },
];

const mappingRows = [
  [":ok", "ok", "同一个标签 atom"],
  ["Foo.bar()", "'Elixir.Foo':bar()", "找到同一个模块"],
  [":lists.reverse(xs)", "lists:reverse(Xs)", "借用同一个 Erlang 工具"],
  ["fn x -> x * 2 end", "fun(X) -> X * 2 end", "都在创建匿名函数"],
  ["GenServer", "gen_server", "共同遵守 OTP 章法"],
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
                两种写法，共用同一个 BEAM 世界
              </div>
              <h1>
                一起动手学
                <span className="hero-language hero-language--erlang">
                  Erlang
                </span>
                <span className="hero-plus">+</span>
                <span className="hero-language hero-language--elixir">
                  Elixir
                </span>
              </h1>
              <p className="hero-lead">
                从第一条消息出发，看看进程怎样合作、出错后怎样重新站起来。
                <strong>
                  每遇到一个新概念，我们都先猜一猜、跑一跑，再用自己的话说说看见了什么。报错是线索，不是扣分。
                </strong>
              </p>

              <div className="route-picker" aria-label="选择学习入口">
                <Link className="route-card route-card--primary" href="/learn/start-line">
                  <span>零基础</span>
                  <strong>让第一段代码跑起来</strong>
                  <small>第 00 站 · 先认识 BEAM 在做什么</small>
                </Link>
                <Link className="route-card" href="/learn/elixir-foundations">
                  <span>已有编程基础</span>
                  <strong>先用 Elixir 动手</strong>
                  <small>第 02 站 · 几分钟就能看到结果</small>
                </Link>
                <Link className="route-card" href="/learn/otp-behaviours">
                  <span>已有 Elixir 基础</span>
                  <strong>去看进程怎样互相帮忙</strong>
                  <small>第 06 站 · 认识 OTP 和 behaviour</small>
                </Link>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>12</strong>
                  <span>探索小站</span>
                </div>
                <div>
                  <strong>46</strong>
                  <span>次动手与自查</span>
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
                <small>scheduler · mailbox · isolation</small>
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
                <h2 id="quick-resources-title">常用工具，放在手边</h2>
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
                <span className="section-kicker">我们的学习玩法</span>
                <h2>先猜，再跑，再把结果讲给自己听</h2>
              </div>
              <p>
                每一课都有可以亲手修改的代码。遇到意外结果时，先看清它，
                再一次只改一个地方，你会更容易找到原因。
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
              <span className="section-kicker">两种语言怎么一起学</span>
              <h2>先用 Elixir 迈出第一步，再看 Erlang 怎样写同一件事</h2>
              <p>
                不用先学完一门，再把相同内容从头学一遍。开始时分别熟悉两种写法；
                到了进程和消息，我们把它们放在一起练，看看它们怎样共享 BEAM。
              </p>
              <ol className="bridge-steps">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Elixir：先把想法跑起来</strong>
                    <p>模式匹配、多子句函数、Enum、Mix 与 ExUnit。</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>Erlang：看看 BEAM 更早的写法</strong>
                    <p>term、模块、binary、递归、Rebar3 与 EUnit。</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>BEAM / OTP：让许多小进程一起合作</strong>
                    <p>消息、behaviour、监督树、容量与分布式。</p>
                  </div>
                </li>
              </ol>
              <Link className="text-link" href="/learn/shared-semantics">
                看看两种语言怎样互相对应
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
                <span>共同认识</span>
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
                <h2>从第一段代码，走到一个会按规则从故障中恢复的小系统</h2>
              </div>
              <p>
                这里有 12 个小站，不用赶，也不用一次走完。你可以顺着地图前进，
                也可以先去找眼下最好奇的内容。每站都有代码、小实验和完成后的自查。
              </p>
            </div>
            <CourseMap modules={courseModules} stages={stages} />
          </div>
        </section>

        <section className="lab-section" id="lab">
          <div className="section-shell lab-grid">
            <div className="lab-copy">
              <span className="section-kicker section-kicker--mint">先试 3 分钟</span>
              <h2>把消息送进进程的收信箱，看看回信怎样回来</h2>
              <p>
                把每个进程想成一座小驿站，它有自己的收信箱（mailbox）。
                先送几封信，再让驿站一封一封处理。然后打开“故意弄坏”，看看信已经读过、
                回信却没有送出时会发生什么。
              </p>
              <ul className="lab-learning-list">
                <li>
                  <span>01</span>
                  信寄出去了，不等于对方已经收到或处理
                </li>
                <li>
                  <span>02</span>
                  等待 timeout，只是你不再等；那封信并没有自动追回
                </li>
                <li>
                  <span>03</span>
                  收信箱会越堆越长，不能一直往里塞消息
                </li>
              </ul>
              <div className="lab-actions">
                <Link
                  className="button button--light"
                  href="/learn/processes-and-mailboxes"
                >
                  去学进程和收信箱
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="button button--outline-light"
                  href="/playground"
                >
                  再写一段真实 Elixir
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
                终点作品 · 第 11 站
              </div>
              <h2>做一个不怕小故障的任务调度器</h2>
              <p>
                把它想成一位驿站总管：Elixir 负责收下任务，Erlang 的 gen_server
                负责排队和安排 worker。就算回信迟到、某个 worker 倒下或节点断开，
                系统也要给出看得懂的结果。
              </p>
              <div className="capstone-tags">
                <span>有界队列</span>
                <span>监督树</span>
                <span>重试 / 幂等</span>
                <span>双语测试</span>
                <span>Release</span>
              </div>
              <Link className="button button--dark" href="/learn/reliable-scheduler">
                看看最后要完成什么
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
                <h2>卡住时，来这里找下一步</h2>
              </div>
              <p>
                不知道该看文档、教程，还是去社区提问？每个链接旁都写了它适合解决什么问题，
                你不用在一长串网址里碰运气。
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
                这里先放每类最常用的两个。想找更多，可以到完整目录里按名字或用途搜索。
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
