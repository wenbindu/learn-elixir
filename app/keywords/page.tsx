import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { KeywordDictionary } from "./KeywordDictionary";

export const metadata: Metadata = {
  title: "Elixir + Erlang 关键字字典",
  description:
    "查询 Elixir 与 Erlang 关键字的作用、写法、分类和版本说明。",
};

const distinctions = [
  {
    number: "01",
    title: "语言预留的词",
    label: "严格保留字",
    description: "语言已经使用这些名字，不能再拿来给变量或函数起名。",
    example: "Elixir: when · fn · do\nErlang: case · receive · fun",
  },
  {
    number: "02",
    title: "语言内建结构",
    label: "特殊形式",
    description:
      "它们组成 Elixir 基本语法，由编译器直接处理，但多数不是严格保留字。",
    example: "case · with · receive\nalias · quote · unquote",
  },
  {
    number: "03",
    title: "常用宏和声明",
    label: "宏、属性与指令",
    description:
      "它们写起来像关键字，实际可能是宏、模块属性或预处理指令。",
    example: "defmodule · use · if\n-module · -spec · -define",
  },
];

export default function KeywordsPage() {
  return (
    <>
      <SiteHeader compact />
      <main className="keywords-page">
        <section className="keywords-hero">
          <div className="keywords-grid-overlay" aria-hidden="true" />
          <div className="keywords-hero-inner">
            <div className="playground-breadcrumb">
              <Link href="/">首页</Link>
              <span>/</span>
              <strong>关键字字典</strong>
            </div>

            <div className="keywords-hero-layout">
              <div>
                <div className="eyebrow eyebrow--dark">
                  <span />
                  ELIXIR + ERLANG LEXICON
                </div>
                <h1>
                  不认识这个词？
                  <span>来这里查。</span>
                </h1>
                <p>
                  可以搜英文词，也可以搜“模式匹配”“异常”“短路”等中文解释。
                  每项都列出分类、作用、限制和最小示例。
                </p>
              </div>

              <aside className="keywords-hero-stats" aria-label="关键字数量">
                <div>
                  <span>EX</span>
                  <strong>15</strong>
                  <small>Elixir 严格保留字</small>
                </div>
                <div>
                  <span>ERL</span>
                  <strong>29</strong>
                  <small>Erlang 严格保留字</small>
                </div>
                <p>
                  <b>44</b>
                  个语言保留字
                  <small>按官方资料整理</small>
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="keyword-dictionary-section"
          aria-labelledby="keyword-dictionary-title"
        >
          <div className="keyword-dictionary-shell">
            <div className="keyword-dictionary-intro">
              <div>
                <span className="section-kicker">可搜索字典</span>
                <h2 id="keyword-dictionary-title">查作用，也看最小示例</h2>
              </div>
              <p>
                页面默认显示严格保留字。要找 <code>defmodule</code>、
                <code>with</code> 或 <code>-module</code>，切换到对应分类。
              </p>
            </div>
            <KeywordDictionary />
          </div>
        </section>

        <section className="keyword-distinction-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">分类说明</span>
                <h2>写法相似，分类不同</h2>
              </div>
              <p>
                保留字、特殊形式、宏和模块属性由不同机制处理。先看作用，
                再记分类。
              </p>
            </div>

            <div className="keyword-distinction-grid">
              {distinctions.map((item) => (
                <article key={item.number}>
                  <div>
                    <span>{item.number}</span>
                    <small>{item.label}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <pre>
                    <code>{item.example}</code>
                  </pre>
                </article>
              ))}
            </div>

            <aside className="keyword-list-callout">
              <span aria-hidden="true">≠</span>
              <div>
                <strong>关键字列表不是保留字</strong>
                <p>
                  <code>[timeout: 5_000, log: true]</code> 是一种数据结构，
                  中文叫“关键字列表”。它和语言预留的词没有关系。
                </p>
              </div>
              <Link href="/learn/elixir-foundations">
                看看 keyword list 怎样装数据
                <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </section>

        <section className="keyword-sources-section">
          <div className="section-shell">
            <div className="keyword-sources-copy">
              <span className="section-kicker">官方依据</span>
              <h2>看完解释，再查原文</h2>
              <p>
                本页按官方资料整理。Erlang 的 <code>maybe</code> 在 OTP
                25–26 中默认关闭，从 OTP 27 起默认开启。<code>cond</code> 和
                <code>let</code> 虽然被保留，目前还没有实际语法用途。
              </p>
              <Link className="button button--dark" href="/playground">
                去 Playground 试一个词
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="keyword-source-links">
              <a
                href="https://hexdocs.pm/elixir/syntax-reference.html#reserved-words"
                target="_blank"
                rel="noreferrer"
              >
                <span>Elixir</span>
                <strong>Syntax reference</strong>
                <small>严格保留字与语法结构</small>
                <b aria-hidden="true">↗</b>
              </a>
              <a
                href="https://hexdocs.pm/elixir/Kernel.SpecialForms.html"
                target="_blank"
                rel="noreferrer"
              >
                <span>Elixir</span>
                <strong>Kernel.SpecialForms</strong>
                <small>Elixir 内建特殊形式</small>
                <b aria-hidden="true">↗</b>
              </a>
              <a
                href="https://www.erlang.org/doc/system/reference_manual.html"
                target="_blank"
                rel="noreferrer"
              >
                <span>Erlang/OTP</span>
                <strong>Reference manual</strong>
                <small>29 个保留字与版本说明</small>
                <b aria-hidden="true">↗</b>
              </a>
              <a
                href="https://www.erlang.org/doc/system/expressions.html"
                target="_blank"
                rel="noreferrer"
              >
                <span>Erlang/OTP</span>
                <strong>Expressions</strong>
                <small>分支、guard 与运算符</small>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
