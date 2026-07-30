import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getResourceDirectory } from "../resource-data";
import { ResourceDirectoryBrowser } from "./ResourceDirectoryBrowser";

export const metadata: Metadata = {
  title: "Elixir + Erlang 学习工具箱",
  description:
    "汇总 Elixir、Erlang、BEAM 与 OTP 的官方文档、教程、工具、社区和在线练习。",
};

export default async function ResourcesPage() {
  const directory = await getResourceDirectory();
  const featuredCount = directory.resources.filter(
    (resource) => resource.featured,
  ).length;

  return (
    <>
      <SiteHeader compact />
      <main className="resources-page">
        <section className="resources-page-hero">
          <div className="resources-page-grid-overlay" aria-hidden="true" />
          <div className="resources-page-hero-inner">
            <div className="playground-breadcrumb">
              <Link href="/">首页</Link>
              <span>/</span>
              <strong>学习工具箱</strong>
            </div>

            <div className="resources-page-hero-layout">
              <div>
                <div className="eyebrow eyebrow--dark">
                  <span />
                  BEAM RESOURCE DIRECTORY
                </div>
                <h1>
                  找资料，
                  <span>从这里开始。</span>
                </h1>
                <p>
                  查语法时看官方文档，理解概念时看教程，练习时打开题库。
                  遇到具体问题，也可以搜索社区讨论。
                </p>
              </div>

              <aside className="resources-page-hero-stats" aria-label="资源目录统计">
                <div>
                  <span>LINKS</span>
                  <strong>{directory.resources.length}</strong>
                  <small>学习资源</small>
                </div>
                <div>
                  <span>GROUPS</span>
                  <strong>{directory.groups.length}</strong>
                  <small>用途分类</small>
                </div>
                <p>
                  <b>{featuredCount}</b>
                  个首页常用入口
                  <small>与首页使用同一份配置</small>
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="resource-directory-section"
          aria-labelledby="resource-directory-title"
        >
          <div className="resource-directory-shell">
            <div className="resource-directory-intro">
              <div>
                <span className="section-kicker">可搜索目录</span>
                <h2 id="resource-directory-title">{directory.title}</h2>
              </div>
              <p>
                可以搜网站名称，也可以搜“安装”或“练习”。不知道名称时，
                直接按分类查看。
              </p>
            </div>
            <ResourceDirectoryBrowser
              groups={directory.groups}
              resources={directory.resources}
            />
          </div>
        </section>

        <section className="resource-usage-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">如何使用</span>
                <h2>按问题选择资料</h2>
              </div>
              <p>
                先保留报错和最短代码，再查对应资料。问题越具体，越容易找到答案。
              </p>
            </div>

            <div className="resource-usage-grid">
              <article>
                <span>01</span>
                <h3>先重现问题</h3>
                <p>保留完整报错，并写出能重现问题的最短代码。</p>
              </article>
              <article>
                <span>02</span>
                <h3>再查文档或教程</h3>
                <p>先核对版本、API 和限制，再把示例放进 IEx 或 erl 运行。</p>
              </article>
              <article>
                <span>03</span>
                <h3>带上线索提问</h3>
                <p>说明报错、最短代码，以及已经试过哪些方法。</p>
              </article>
            </div>

            <div className="resource-usage-cta">
              <div>
                <strong>还没安装 Elixir？</strong>
                <p>按电脑系统装好 Erlang 与 Elixir，再检查 IEx、erl 和 Mix。</p>
              </div>
              <Link
                className="button button--dark"
                href="/learn/install-toolchain"
              >
                打开安装准备
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
