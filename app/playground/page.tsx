import type { Metadata } from "next";
import Link from "next/link";
import { ElixirPlayground } from "../components/ElixirPlayground";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Elixir 在线 Playground",
  description:
    "不用先安装 Elixir，也能马上改代码、点运行，试试管道、模式匹配和进程消息。",
};

const practiceSteps = [
  {
    number: "01",
    title: "先猜一猜",
    description:
      "运行前先猜输出是什么。猜错也很好，因为差别正是最值得看的地方。",
  },
  {
    number: "02",
    title: "一次只改一处",
    description:
      "换一个输入、模式或 timeout，然后再运行。一次只改一个地方，就容易看出是谁带来了变化。",
  },
  {
    number: "03",
    title: "带回自己的电脑",
    description: "把刚才跑通的代码放进 IEx 或 Mix 项目，再试着给它加一个测试。",
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
              还没安装 Elixir 也没关系。挑一个小练习，改几个数字或单词，
              点运行看看程序怎样回应，再用自己的话说说发生了什么。
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
                <h2 id="playground-workspace-title">挑一个小练习，动手改起来</h2>
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
                  这里借用了 Codapi 的在线试验区。点击 Run 后，代码会交给它运行。
                  像使用一张借来的实验桌一样，请不要放密码、API Key、个人信息或没有公开的代码。
                  如果打不开，可以使用上方的“在新窗口打开”。
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
                <h2>不只看“成功”，还要知道为什么</h2>
              </div>
              <p>
                这里适合试短代码。想做一个完整项目，还要回到自己的电脑，
                用 Mix 管理文件、依赖和测试。分布式节点和长时间运行的 OTP 程序也要在本地练习。
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
                <span>想把这个小练习变成真正的项目吗？</span>
                <strong>用 Mix 建一个新项目，把今天跑通的代码带回去。</strong>
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
