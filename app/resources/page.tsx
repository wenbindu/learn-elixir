import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getResourceDirectory } from "../resource-data";
import { ResourceDirectoryBrowser } from "./ResourceDirectoryBrowser";

export const metadata: Metadata = {
  title: "Elixir + Erlang 学习工具箱",
  description:
    "Elixir、Erlang、BEAM 与 OTP 的中文教程、官方文档、工具、社区和在线练习，卡住时可以来这里找下一步。",
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
                  卡住时，
                  <span>不用一个人猜。</span>
                </h1>
                <p>
                  想确认一种写法，就看官方文档；想听别人讲明白，就找教程；
                  想练熟，就做小题；真的卡住了，还可以去社区看看别人怎样解决。
                </p>
              </div>

              <aside className="resources-page-hero-stats" aria-label="资源目录统计">
                <div>
                  <span>LINKS</span>
                  <strong>{directory.resources.length}</strong>
                  <small>整理好的学习资源</small>
                </div>
                <div>
                  <span>GROUPS</span>
                  <strong>{directory.groups.length}</strong>
                  <small>按用途划分的类别</small>
                </div>
                <p>
                  <b>{featuredCount}</b>
                  个首页常用入口
                  <small>首页常用链接也都收在这里</small>
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
                可以搜网站名字，也可以直接搜“怎么安装”“哪里练习”。
                不知道名字时，点分类慢慢逛也行。
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
                <h2>卡住时，按这三步找答案</h2>
              </div>
              <p>
                先跑一小段代码，看看自己到底卡在哪里，再带着这个问题去查资料，
                会比漫无目的地翻网页更容易找到答案。
              </p>
            </div>

            <div className="resource-usage-grid">
              <article>
                <span>01</span>
                <h3>先看官方怎么说</h3>
                <p>看清使用的版本、API 写法和限制，再决定代码怎么改。</p>
              </article>
              <article>
                <span>02</span>
                <h3>再找一位会讲清楚的老师</h3>
                <p>教程能帮你听懂来龙去脉。看完别忘了把示例放进自己的 IEx 或 erl 里跑一下。</p>
              </article>
              <article>
                <span>03</span>
                <h3>动手试，再带着线索去问</h3>
                <p>去社区提问时，带上报错、能重现问题的最短代码，以及你已经试过的方法。</p>
              </article>
            </div>

            <div className="resource-usage-cta">
              <div>
                <strong>电脑上还没装好 Elixir？</strong>
                <p>从起跑线开始，我们会一起检查 Erlang、Elixir、IEx、erl 和 Mix。</p>
              </div>
              <Link className="button button--dark" href="/learn/start-line">
                打开起跑线
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
