import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getResourceDirectory } from "../resource-data";
import { ResourceDirectoryBrowser } from "./ResourceDirectoryBrowser";

export const metadata: Metadata = {
  title: "Elixir + Erlang 关联资源",
  description:
    "按用途整理的 Elixir、Erlang、BEAM 与 OTP 中文教程、官方文档、工具、社区和在线练习入口。",
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
              <strong>关联资源</strong>
            </div>

            <div className="resources-page-hero-layout">
              <div>
                <div className="eyebrow eyebrow--dark">
                  <span />
                  BEAM RESOURCE DIRECTORY
                </div>
                <h1>
                  需要哪个入口，
                  <span>就去正确的地方。</span>
                </h1>
                <p>
                  官方文档用来确认语义，教程用来建立理解，练习用来形成手感，
                  社区用来查真实工程经验。这里按使用时机整理，不做一堵没有说明的链接墙。
                </p>
              </div>

              <aside className="resources-page-hero-stats" aria-label="资源目录统计">
                <div>
                  <span>LINKS</span>
                  <strong>{directory.resources.length}</strong>
                  <small>经过整理的资源入口</small>
                </div>
                <div>
                  <span>GROUPS</span>
                  <strong>{directory.groups.length}</strong>
                  <small>按用途划分的类别</small>
                </div>
                <p>
                  <b>{featuredCount}</b>
                  个首页常用入口
                  <small>全部来自同一份 Markdown 配置</small>
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
                输入名称、网站域名或“安装”“练习”等用途，也可以直接选择分类。
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
                <h2>把资源放进学习动作里</h2>
              </div>
              <p>
                资源只有在解决具体问题时才有价值。先跑一个最小实验，再带着观察结果去查文档或社区。
              </p>
            </div>

            <div className="resource-usage-grid">
              <article>
                <span>01</span>
                <h3>先确认官方语义</h3>
                <p>查清版本、API 和边界条件，再决定代码应该怎么写。</p>
              </article>
              <article>
                <span>02</span>
                <h3>再补教程解释</h3>
                <p>用课程和长文连接概念，但把示例放进自己的 IEx 或 erl 里验证。</p>
              </article>
              <article>
                <span>03</span>
                <h3>最后动手与追问</h3>
                <p>通过练习发现盲点；带着最小复现和错误信息去社区搜索。</p>
              </article>
            </div>

            <div className="resource-usage-cta">
              <div>
                <strong>还没有本地运行环境？</strong>
                <p>从起跑线检查 Erlang、Elixir、IEx、erl 与 Mix。</p>
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
