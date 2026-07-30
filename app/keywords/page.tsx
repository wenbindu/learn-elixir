import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { KeywordDictionary } from "./KeywordDictionary";

export const metadata: Metadata = {
  title: "Elixir + Erlang 关键字字典",
  description:
    "遇到陌生词时，可以在这里查它做什么、怎样写，以及哪些 Erlang 或 Elixir 版本支持它。",
};

const distinctions = [
  {
    number: "01",
    title: "有固定座位的词",
    label: "严格保留字",
    description:
      "它们像象棋里的“将”和“帅”，名字一出现就带着固定规则，不能随便拿去给变量或函数起名。",
    example: "Elixir: when · fn · do\nErlang: case · receive · fun",
  },
  {
    number: "02",
    title: "搭起语言的梁柱",
    label: "特殊形式",
    description:
      "这些写法是 Elixir 搭建代码结构时用的基本零件，不能被换成别的含义。它们很像保留字，却不完全属于同一类。",
    example: "case · with · receive\nalias · quote · unquote",
  },
  {
    number: "03",
    title: "工具箱里的常用工具",
    label: "宏、属性与指令",
    description:
      "它们看起来也像关键字，其实有的是宏，有的是模块标记，还有的是预处理命令。先记住用途，再慢慢认识分类。",
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
                  遇到不认识的词，
                  <span>就像查字典一样来这里。</span>
                </h1>
                <p>
                  这里收好了 Elixir 和 Erlang 中那些“有固定任务的词”。
                  你可以搜英文，也可以搜“模式匹配”“异常”“短路”这样的中文问题。
                  每个词都会告诉你：它是谁、做什么、怎么用。
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
                  <small>每一项都查过官方资料</small>
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
                <h2 id="keyword-dictionary-title">先认识那些不能随便拿来起名的词</h2>
              </div>
              <p>
                打开页面时，先看到严格保留字。想找 <code>defmodule</code>、
                <code>with</code> 或 <code>-module</code>，点一下上面的其他分类就能找到。
              </p>
            </div>
            <KeywordDictionary />
          </div>
        </section>

        <section className="keyword-distinction-section">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">长得很像，身份却不同</span>
                <h2>“看起来像关键字”，不一定就是保留字</h2>
              </div>
              <p>
                这些词写在代码里时很像，但在编译器眼中有不同身份。
                就像同样穿古装的人，可能是将军、信使或掌柜：先看他做什么，再看他属于哪一类。
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
                <strong>小心：keyword list 不是这页说的“保留字”</strong>
                <p>
                  <code>[timeout: 5_000, log: true]</code> 是一种装数据的列表，
                  中文叫“关键字列表”。这里的 keyword 只是数据结构的名字，
                  和语言预留的词不是一回事。
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
              <h2>这里帮你听懂，官方文档帮你查全</h2>
              <p>
                本页按官方资料整理。Erlang 的 <code>maybe</code> 在 OTP
                25–26 中默认关闭，从 OTP 27 起默认开启。<code>cond</code> 和
                <code>let</code> 虽然被保留，目前还没有实际语法用途。
              </p>
              <Link className="button button--dark" href="/playground">
                挑一个词，去 Playground 试试看
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
                <small>控制流、guard 与运算符用法</small>
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
