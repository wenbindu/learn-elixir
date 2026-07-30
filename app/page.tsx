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
    absolute: "BEAM Path — Erlang + Elixir 交互式学习路径",
  },
  description:
    "从零开始理解 Erlang、Elixir、BEAM 与 OTP。通过双语代码、并发实验、故障注入和综合项目，建立真正可用于生产的心智模型。",
};

const pillars = [
  {
    number: "01",
    title: "跑得动",
    metric: "12 个实验",
    description:
      "每个关键概念都落到可复制的 IEx / erl 实验；浏览器模拟器只负责把协议过程变得可见。",
    accent: "blue",
  },
  {
    number: "02",
    title: "看得见",
    metric: "双语对照",
    description:
      "Elixir 与 Erlang 并排展示。你学的是共同的 term、进程与 behaviour，不是两套互不相干的语法。",
    accent: "orange",
  },
  {
    number: "03",
    title: "记得住",
    metric: "46 个检查点",
    description:
      "每个模块都有快速自测、语言互译和一个真正改变条件的挑战，进度可以导出与恢复。",
    accent: "green",
  },
  {
    number: "04",
    title: "敢弄坏",
    metric: "故障注入",
    description:
      "主动制造迟到回复、mailbox 堆积、重启风暴和节点断开；每次都写清实验不能证明什么。",
    accent: "violet",
  },
];

const mappingRows = [
  [":ok", "ok", "同一个 atom"],
  ["Foo.bar()", "'Elixir.Foo':bar()", "Elixir 模块的底层 atom"],
  [":lists.reverse(xs)", "lists:reverse(Xs)", "直接调用 Erlang 标准库"],
  ["fn x -> x * 2 end", "fun(X) -> X * 2 end", "匿名函数"],
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
                不是两门课，是一套 BEAM 思维
              </div>
              <h1>
                学透
                <span className="hero-language hero-language--erlang">
                  Erlang
                </span>
                <span className="hero-plus">+</span>
                <span className="hero-language hero-language--elixir">
                  Elixir
                </span>
              </h1>
              <p className="hero-lead">
                从模式匹配到监督树，从第一条消息到可靠的混合语言系统。
                <strong>不是让你“看懂”，是让每个结论都能跑、能坏、能解释。</strong>
              </p>

              <div className="route-picker" aria-label="选择学习入口">
                <Link className="route-card route-card--primary" href="/learn/start-line">
                  <span>零基础</span>
                  <strong>从运行时开始</strong>
                  <small>模块 00 · 先画清 BEAM 地图</small>
                </Link>
                <Link className="route-card" href="/learn/elixir-foundations">
                  <span>已有编程基础</span>
                  <strong>先学 Elixir</strong>
                  <small>模块 02 · 快速获得反馈</small>
                </Link>
                <Link className="route-card" href="/learn/otp-behaviours">
                  <span>已有 Elixir 基础</span>
                  <strong>直达 OTP 核心</strong>
                  <small>模块 06 · 从循环推导 behaviour</small>
                </Link>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>12</strong>
                  <span>模块</span>
                </div>
                <div>
                  <strong>46</strong>
                  <span>检查点</span>
                </div>
                <div>
                  <strong>≈66h</strong>
                  <span>完整路径</span>
                </div>
                <div>
                  <strong>2 → 1</strong>
                  <span>语言 · VM</span>
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
                <h2 id="quick-resources-title">学习时，少绕一次远路</h2>
              </div>
              <Link href="/resources">
                查看全部资源
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
                <span className="section-kicker">学习系统，而不只是教程</span>
                <h2>四件事，让“我好像懂了”无处可藏</h2>
              </div>
              <p>
                参考 kimi-k3-learn 的核心教学方法：运行、对照、复习、故障注入。
                把它换成最适合 BEAM 的实验，而不是照搬表面形式。
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
              <span className="section-kicker">桥接路线</span>
              <h2>先用 Elixir 获得反馈，再用 Erlang 看清底层</h2>
              <p>
                不先完整学完一门，再把同样概念重学一遍。基础阶段分别练语法；从并发开始，每个协议都用两种语言实现一次，
                OTP 概念只讲一次。
              </p>
              <ol className="bridge-steps">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Elixir：快速建立数据流</strong>
                    <p>模式匹配、多子句函数、Enum、Mix 与 ExUnit。</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>Erlang：读懂 VM 的母语</strong>
                    <p>term、模块、binary、递归、Rebar3 与 EUnit。</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>BEAM / OTP：共同练习</strong>
                    <p>消息协议、behaviour、监督树、容量与分布式。</p>
                  </div>
                </li>
              </ol>
              <Link className="text-link" href="/learn/shared-semantics">
                打开完整语义映射模块
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
                <span>共同基础</span>
                <div>
                  <b>term</b>
                  <b>process</b>
                  <b>mailbox</b>
                  <b>scheduler</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="roadmap-section" id="roadmap">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">完整学习路径</span>
                <h2>从第一个 term，到可发布的 OTP 系统</h2>
              </div>
              <p>
                12 个模块、46 个检查点。按阶段推进，也可以搜索你现在最需要补的概念。
                每个模块都有真实代码、故障实验、自测和项目验收。
              </p>
            </div>
            <CourseMap modules={courseModules} stages={stages} />
          </div>
        </section>

        <section className="lab-section" id="lab">
          <div className="section-shell lab-grid">
            <div className="lab-copy">
              <span className="section-kicker section-kicker--mint">先试 3 分钟</span>
              <h2>一条消息，经过 mailbox，再变成 reply</h2>
              <p>
                连续发送几条消息，逐条处理。然后打开“故意弄坏”，观察 server
                已经处理但 client 永远等不到 reply 的区别。
              </p>
              <ul className="lab-learning-list">
                <li>
                  <span>01</span>
                  发送成功，不等于处理完成
                </li>
                <li>
                  <span>02</span>
                  timeout 结束等待，不会自动撤回消息
                </li>
                <li>
                  <span>03</span>
                  mailbox 是容量边界，不是无限缓冲
                </li>
              </ul>
              <div className="lab-actions">
                <Link
                  className="button button--light"
                  href="/learn/processes-and-mailboxes"
                >
                  进入裸进程模块
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="button button--outline-light"
                  href="/playground"
                >
                  打开在线 Playground
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
                最终项目 · 模块 11
              </div>
              <h2>可靠任务调度器</h2>
              <p>
                Elixir 提供清晰的 CLI / API，Erlang gen_server
                掌控队列与 worker。你要让系统在超时、崩溃、坏消息和节点断开时给出可解释的结果。
              </p>
              <div className="capstone-tags">
                <span>有界队列</span>
                <span>监督树</span>
                <span>重试 / 幂等</span>
                <span>双语测试</span>
                <span>Release</span>
              </div>
              <Link className="button button--dark" href="/learn/reliable-scheduler">
                查看毕业验收
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
                <span className="section-kicker">资源导航</span>
                <h2>知道什么时候打开哪个链接</h2>
              </div>
              <p>
                优先官方文档，再到包生态与社区。每个入口都标出使用时机，避免把资源页变成一堵链接墙。
              </p>
            </div>

            <div className="resource-groups">
              {resourceDirectory.groups.map((group) => (
                <div className="resource-group" key={group.title}>
                  <div className="resource-group-heading">
                    <span>{group.title}</span>
                    <small>{group.resources.length} 个入口</small>
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
                这里只展示每类前两个入口；完整目录支持按名称、域名和用途搜索。
              </p>
              <Link className="button button--dark" href="/resources">
                打开完整资源目录
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
