import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { KeywordDictionary } from "./KeywordDictionary";

export const metadata: Metadata = {
  title: "Elixir + Erlang 关键字字典",
  description:
    "可搜索的中文 Elixir 与 Erlang 关键字字典：完整保留字清单、准确分类、用途解释、最小示例和版本提示。",
};

const distinctions = [
  {
    number: "01",
    title: "严格保留字",
    label: "lexer level",
    description:
      "编译器在词法阶段就赋予特殊含义，不能随意拿来当普通变量或函数名。本页默认先展示这一层。",
    example: "Elixir: when · fn · do\nErlang: case · receive · fun",
  },
  {
    number: "02",
    title: "特殊形式",
    label: "language building block",
    description:
      "Elixir 的语言基本构造，无法被开发者覆盖；但除 fn 外，它们大多不在严格保留字清单里。",
    example: "case · with · receive\nalias · quote · unquote",
  },
  {
    number: "03",
    title: "宏、属性与指令",
    label: "common syntax",
    description:
      "写起来很像关键字，却属于 Kernel 宏、Erlang 模块属性或预处理器。理解这点，元编程就不再神秘。",
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
                  别猜它是不是关键字，
                  <span>查清它是什么。</span>
                </h1>
                <p>
                  两门语言的严格保留字完整收录，并把特殊形式、宏、模块属性和
                  预处理指令分开解释。搜英文，也可以直接搜“短路”“模式匹配”
                  “异常”这样的中文概念。
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
                  个词法保留字
                  <small>逐项按官方语言参考核对</small>
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
                <h2 id="keyword-dictionary-title">从词法边界开始查</h2>
              </div>
              <p>
                默认只看严格保留字。需要找 <code>defmodule</code>、
                <code>with</code> 或 <code>-module</code> 时，切换到对应补充分类。
              </p>
            </div>
            <KeywordDictionary />
          </div>
        </section>

        <section className="keyword-distinction-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">先分层，再记忆</span>
                <h2>“看起来像关键字”不等于保留字</h2>
              </div>
              <p>
                Elixir 语法高度宏化，同样一段自然语言般的代码，可能横跨词法、
                特殊形式和普通宏三个层级。
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
                <strong>Elixir 的 keyword list 是另一件事</strong>
                <p>
                  <code>[timeout: 5_000, log: true]</code> 是由二元组组成的数据结构，
                  中文通常叫“关键字列表”；这里的 keyword 与语言“保留字”不是同一概念。
                </p>
              </div>
              <Link href="/learn/elixir-foundations">
                去基础课看数据结构
                <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </section>

        <section className="keyword-sources-section">
          <div className="section-shell">
            <div className="keyword-sources-copy">
              <span className="section-kicker">官方依据</span>
              <h2>字典给解释，官方文档给完整语义</h2>
              <p>
                清单以当前官方语言参考为准。Erlang 的 <code>maybe</code> 在 OTP
                25–26 默认关闭，自 OTP 27 起默认开启；<code>cond</code> 与
                <code>let</code> 目前仍是“已保留但未使用”。
              </p>
              <Link className="button button--dark" href="/playground">
                带一个词去 Playground 试
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
                <small>无法覆盖的语言基本构造</small>
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
                <small>控制流、guard 与运算符语义</small>
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
