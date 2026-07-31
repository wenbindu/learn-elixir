import type { Metadata } from "next";
import Link from "next/link";
import { basicPaths, basicPathStats } from "../basic-path-data";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import styles from "./from-scratch.module.css";

export const metadata: Metadata = {
  title: "从零学习 Elixir 与 Erlang",
  description:
    "先装好 Erlang、Elixir 和 Mix，再从 Elixir 或 Erlang 中选择一条零基础语法路线。",
};

export default function FromScratchPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.overviewHero}>
          <div className={styles.shell}>
            <div className={styles.breadcrumb}>
              <Link href="/">首页</Link>
              <span>/</span>
              <strong>From Scratch</strong>
            </div>
            <div className="section-kicker">FROM SCRATCH</div>
            <h1>
              先学会读代码
              <span>再走进 BEAM</span>
            </h1>
            <p>
              Elixir 和 Erlang 分开学。任选一条。每课只添几个新符号，
              先写完整形式，再看短写法。学完一条，两条路汇入同一条 BEAM 主线。
            </p>
            <div className={styles.heroStats}>
              <div>
                <strong>{basicPathStats.paths}</strong>
                <span>条独立路线</span>
              </div>
              <div>
                <strong>{basicPathStats.lessons}</strong>
                <span>节基础课</span>
              </div>
              <div>
                <strong>0</strong>
                <span>编程前置</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.installStepSection}
          aria-labelledby="install-step-title"
        >
          <div className={styles.shell}>
            <Link
              className={styles.installStepCard}
              href="/learn/install-toolchain"
            >
              <div className={styles.installStepIndex} aria-hidden="true">
                <span>STEP</span>
                <strong>00</strong>
              </div>
              <div className={styles.installStepCopy}>
                <div className="section-kicker">先把工具放好</div>
                <h2 id="install-step-title">
                  第 0 步：安装 Erlang / Elixir / Mix
                </h2>
                <p>
                  按 macOS、Linux 或 Windows 的步骤安装。等
                  <code>erl</code>、<code>elixir</code> 和 <code>mix</code>
                  都能回答，再从下面选择一条路线。
                </p>
              </div>
              <div className={styles.installStepAction}>
                <span>查看安装步骤</span>
                <b aria-hidden="true">→</b>
              </div>
            </Link>
          </div>
        </section>

        <section className={styles.pathChoiceSection}>
          <div className={styles.shell}>
            <div className={styles.sectionIntro}>
              <div>
                <div className="section-kicker">先选一种写法</div>
                <h2>不必两条都学完</h2>
              </div>
              <p>
                想先写得顺，选 Elixir。想先看清 BEAM 的原生语言，选 Erlang。
                学完一条就能继续；另一条以后当作对照。
              </p>
            </div>

            <div className={styles.pathGrid}>
              {basicPaths.map((path, index) => (
                <Link
                  className={`${styles.pathCard} ${
                    path.id === "elixir"
                      ? styles.pathCardElixir
                      : styles.pathCardErlang
                  }`}
                  href={`/from-scratch/${path.id}`}
                  key={path.id}
                >
                  <div className={styles.pathCardTop}>
                    <span>PATH {String(index + 1).padStart(2, "0")}</span>
                    <span
                      className={`${styles.languageBadge} ${
                        path.id === "elixir"
                          ? styles.languageBadgeElixir
                          : styles.languageBadgeErlang
                      }`}
                    >
                      {path.language}
                    </span>
                  </div>
                  <h3>{path.title}</h3>
                  <strong>{path.subtitle}</strong>
                  <p>{path.description}</p>
                  <div className={styles.pathCardMeta}>
                    <span>{path.lessons.length} 课</span>
                    <span>从 {path.shell} 开始</span>
                  </div>
                  <div className={styles.pathCardLink}>
                    查看这条路线
                    <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.joinStrip}>
              <span aria-hidden="true">VM</span>
              <div>
                <strong>两条小路，汇入 BEAM</strong>
                <p>语法学到模块就够出发。进程、消息、OTP 和监督树放在后面学。</p>
              </div>
              <Link href="/learn/start-line">看看汇合处 →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
