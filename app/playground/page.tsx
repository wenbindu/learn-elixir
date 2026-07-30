import type { Metadata } from "next";
import Link from "next/link";
import { ElixirPlayground } from "../components/ElixirPlayground";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Elixir 在线 Playground",
  description:
    "不用安装 Elixir，也能改代码、看输出，练习管道、模式匹配和进程消息。",
};

const practiceSteps = [
  {
    number: "01",
    title: "先猜结果",
    description: "运行前写下你猜的输出。若结果不同，看看差在哪。",
  },
  {
    number: "02",
    title: "只改一处",
    description:
      "改一个输入、模式或 timeout，然后运行。这样容易看出变化从哪来。",
  },
  {
    number: "03",
    title: "带回本地",
    description: "把跑通的代码放进 IEx 或 Mix 项目，再加一个测试。",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <SiteHeader compact />
      <main className="playground-page">
        <section className="playground-hero">
          <div className="playground-grid-overlay" aria-hidden="true" />
          <div className="playground-hero-inner">
            <div className="playground-breadcrumb">
              <Link href="/">首页</Link>
              <span>/</span>
              <strong>在线练习</strong>
            </div>

            <div className="eyebrow eyebrow--dark">
              <span />
              ELIXIR PLAYGROUND
            </div>
            <h1>
              写一段，
              <span>马上运行。</span>
            </h1>
            <p>
              不用先安装 Elixir。选一个练习，改几行，点 Run。
              看输出，也看报错。
            </p>
            <div className="playground-hero-tags" aria-label="Playground 特点">
              <span>无需登录</span>
              <span>可编辑</span>
              <span>即时输出</span>
              <span>安全试验区</span>
            </div>
          </div>
        </section>

        <section
          className="playground-workspace"
          aria-labelledby="playground-workspace-title"
        >
          <div className="playground-shell">
            <div className="playground-shell-header">
              <div>
                <span className="section-kicker">可运行练习</span>
                <h2 id="playground-workspace-title">选一个练习，改一处</h2>
              </div>
              <a
                className="playground-provider"
                href="https://codapi.org/elixir/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="live-dot" />
                Powered by Codapi
                <b aria-hidden="true">↗</b>
              </a>
            </div>

            <ElixirPlayground />

            <aside className="playground-notice" aria-label="第三方运行环境说明">
              <span aria-hidden="true">!</span>
              <div>
                <strong>代码会交给 Codapi 运行</strong>
                <p>
                  Codapi 是第三方服务。点击 Run 后，它会收到这段代码。
                  不要放密码、API Key、个人信息或未公开代码。
                  如果页面打不开，请使用“在新窗口打开”。
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="playground-guide">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">练习方法</span>
                <h2>运行后，问为什么</h2>
              </div>
              <p>
                这里适合试短代码。完整项目仍要放在本地，
                用 Mix 管理文件、依赖和测试。分布式节点和 OTP 系统也要在本地运行。
              </p>
            </div>

            <div className="playground-practice-grid">
              {practiceSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>

            <div className="playground-next-step">
              <div>
                <span>想在自己电脑上继续吗？</span>
                <strong>用 Mix 建项目，把这段代码带回去。</strong>
              </div>
              <Link className="button button--dark" href="/learn/start-line">
                返回起跑线
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
