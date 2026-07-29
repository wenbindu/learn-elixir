import type { Metadata } from "next";
import Link from "next/link";
import { ElixirPlayground } from "../components/ElixirPlayground";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Elixir 在线 Playground",
  description:
    "无需安装即可编辑并运行 Elixir 代码，通过管道、模式匹配和 BEAM 进程练习获得即时反馈。",
};

const practiceSteps = [
  {
    number: "01",
    title: "先预测",
    description: "运行前先写下你认为会输出什么，再用实际结果校正心智模型。",
  },
  {
    number: "02",
    title: "再改一个条件",
    description: "替换输入、模式或 timeout；只改一个变量，才能解释因果。",
  },
  {
    number: "03",
    title: "最后迁回本地",
    description: "把验证过的片段放进 IEx 或 Mix 项目，再补测试和真实依赖。",
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
              <span>立刻看见反馈。</span>
            </h1>
            <p>
              不安装 Elixir 也能先练语言与进程模型。选择一个起始练习，修改代码，
              运行，再把观察写成自己的解释。
            </p>
            <div className="playground-hero-tags" aria-label="Playground 特点">
              <span>无需登录</span>
              <span>可编辑</span>
              <span>即时输出</span>
              <span>隔离沙箱</span>
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
                <h2 id="playground-workspace-title">选择一个切口，然后动手改</h2>
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
                <strong>这是第三方运行环境</strong>
                <p>
                  点击 Run 后，代码会发送到 Codapi 的隔离沙箱执行。不要粘贴密码、
                  API Key、个人数据或未公开代码。服务版本、限额和可用性由 Codapi
                  维护；若嵌入失败，可使用上方“在新窗口打开”。
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
                <h2>把“运行成功”变成“解释得清”</h2>
              </div>
              <p>
                Playground 适合验证标准库和小片段，不替代完整 Mix 项目、依赖管理、
                分布式节点或长期运行的 OTP 系统。
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
                <span>准备进入真实工具链？</span>
                <strong>用 Mix 创建项目，保留今天验证过的代码。</strong>
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
