import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBlock } from "../../components/CopyBlock";
import { InlineCodeText } from "../../components/InlineCodeText";
import { ProgressButton } from "../../components/ProgressButton";
import { QuizCard } from "../../components/QuizCard";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  courseModules,
  courseStats,
  getAdjacentModules,
  getModule,
  stages,
} from "../../course-data";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseModules.map((courseModule) => ({ slug: courseModule.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const courseModule = getModule(slug);
  if (!courseModule) return {};

  return {
    title: courseModule.title,
    description: courseModule.summary,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const courseModule = getModule(slug);
  if (!courseModule) notFound();

  const { previous, next } = getAdjacentModules(courseModule.slug);

  return (
    <>
      <SiteHeader compact />
      <main className="lesson-page">
        <div className="lesson-layout">
          <aside className="lesson-sidebar" aria-label="课程目录">
            <div className="lesson-sidebar-intro">
              <span>BEAM PATH</span>
              <strong>BEAM 探险地图</strong>
              <small>
                {courseStats.mainlineStations} 站主线 ·{" "}
                {courseStats.optionalReviewStations} 站可选复习
              </small>
            </div>

            <nav>
              {stages.map((stage) => (
                <div className="sidebar-stage" key={stage.id}>
                  <span>{stage.title}</span>
                  {courseModules
                    .filter((item) => item.stage === stage.id)
                    .map((item) => (
                      <Link
                        href={`/learn/${item.slug}`}
                        className={item.slug === courseModule.slug ? "is-active" : ""}
                        aria-current={
                          item.slug === courseModule.slug ? "page" : undefined
                        }
                        key={item.slug}
                      >
                        <b>{item.number}</b>
                        <span>{item.title}</span>
                        <small>
                          {item.optionalReview ? "可选复习 · " : ""}
                          {item.duration}
                        </small>
                      </Link>
                    ))}
                </div>
              ))}
            </nav>

            <div className="sidebar-note">
              <span className="live-dot" />
              进度只在这台设备。换设备前，去首页保存。
            </div>
          </aside>

          <article className="lesson-article">
            <details className="lesson-mobile-nav">
              <summary>
                <span>
                  第 {courseModule.number} 站
                  {courseModule.optionalReview ? " · 可选复习" : ""}
                </span>
                展开探险地图
              </summary>
              <div>
                {courseModules.map((item) => (
                  <Link
                    href={`/learn/${item.slug}`}
                    className={item.slug === courseModule.slug ? "is-active" : ""}
                    key={item.slug}
                  >
                    <span>{item.number}</span>
                    {item.title}
                    {item.optionalReview ? (
                      <small className="lesson-nav-optional">可选复习</small>
                    ) : null}
                  </Link>
                ))}
              </div>
            </details>

            <div className="lesson-breadcrumb">
              <Link href="/">首页</Link>
              <span>/</span>
              <Link href="/#beam-roadmap">BEAM 主线</Link>
              <span>/</span>
              <strong>第 {courseModule.number} 站</strong>
            </div>

            {courseModule.slug === "start-line" ? (
              <aside className="syntax-path-note">
                <div>
                  <span>还没学过语法？</span>
                  <strong>
                    如果值、模式、函数或模块还陌生，先从一门语言学起。
                  </strong>
                  <p>
                    Elixir 和 Erlang 任选一条。学完任意一条，再回来走 BEAM
                    主线。
                  </p>
                </div>
                <div>
                  <Link href="/from-scratch/elixir">Elixir 从零 →</Link>
                  <Link href="/from-scratch/erlang">Erlang 从零 →</Link>
                </div>
              </aside>
            ) : null}

            <header className={`lesson-hero lesson-hero--${courseModule.stage}`}>
              <div className="lesson-hero-top">
                <div className="lesson-number">{courseModule.number}</div>
                <div className="lesson-labels">
                  <span>{courseModule.stageLabel}</span>
                  <span>{courseModule.level}</span>
                  {courseModule.optionalReview ? <span>可选复习</span> : null}
                  {courseModule.languages.map((language) => (
                    <span key={language}>{language}</span>
                  ))}
                </div>
              </div>
              <h1>{courseModule.title}</h1>
              <p>{courseModule.subtitle}</p>
              <div className="lesson-hero-bottom">
                <div>
                  <span>{courseModule.lessons}</span>
                  <small>小关卡</small>
                </div>
                <div>
                  <span>{courseModule.duration}</span>
                  <small>可以分几次</small>
                </div>
              </div>
            </header>

            <section className="lesson-block lesson-block--why">
              <div className="section-kicker">为什么学这一站</div>
              <h2>它要解决什么</h2>
              <p>
                <InlineCodeText text={courseModule.why} />
              </p>
            </section>

            <aside className="lesson-story-bridge">
              <div className="lesson-story-mark" aria-hidden="true">
                故
              </div>
              <div className="lesson-story-copy">
                <div className="section-kicker">
                  借一个故事 · {courseModule.storyBridge.label}
                </div>
                <h2>{courseModule.storyBridge.title}</h2>
                <p>
                  <InlineCodeText text={courseModule.storyBridge.story} />
                </p>
                <div className="lesson-story-notes">
                  <div>
                    <strong>回到代码</strong>
                    <p>
                      <InlineCodeText
                        text={courseModule.storyBridge.connection}
                      />
                    </p>
                  </div>
                  <div>
                    <strong>比喻到这里</strong>
                    <p>
                      <InlineCodeText text={courseModule.storyBridge.boundary} />
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="lesson-block">
              <div className="lesson-two-column">
                <div>
                  <div className="section-kicker">走完这一站</div>
                  <h2>你会做到</h2>
                  <ul className="check-list">
                    {courseModule.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <span aria-hidden="true">✓</span>
                        <InlineCodeText text={outcome} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="prerequisite-card">
                  <span>出发前</span>
                  <ul>
                    {courseModule.prerequisites.map((prerequisite) => (
                      <li key={prerequisite}>
                        <InlineCodeText text={prerequisite} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="lesson-block">
              <div className="section-kicker">先认词</div>
              <h2>三个关键词</h2>
              <div className="concept-grid">
                {courseModule.concepts.map((concept, index) => (
                  <article key={concept.term}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{concept.term}</h3>
                    <p>
                      <InlineCodeText text={concept.definition} />
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {courseModule.installation ? (
              <section
                className="lesson-block installation-block"
                aria-labelledby="installation-guides-title"
              >
                <div className="installation-heading">
                  <div>
                    <div className="section-kicker">按系统安装</div>
                    <h2 id="installation-guides-title">只走你电脑这一条路</h2>
                  </div>
                  <p>
                    <InlineCodeText text={courseModule.installation.intro} />
                  </p>
                </div>

                <aside className="installation-mix-note">
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>Mix 已包含在 Elixir 里</strong>
                    <p>
                      <InlineCodeText
                        text={courseModule.installation.mixNote}
                      />
                    </p>
                  </div>
                </aside>

                <div className="installation-guide-list">
                  {courseModule.installation.guides.map((guide) => (
                    <article
                      className={`installation-guide-card installation-guide-card--${guide.id}`}
                      key={guide.id}
                    >
                      <div className="installation-guide-copy">
                        <span>{guide.label}</span>
                        <h3>{guide.title}</h3>
                        <p>
                          <InlineCodeText text={guide.description} />
                        </p>
                        <ol>
                          {guide.steps.map((step) => (
                            <li key={step}>
                              <InlineCodeText text={step} />
                            </li>
                          ))}
                        </ol>
                        <div className="installation-guide-links">
                          {guide.links.map((link) => (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              key={link.href}
                            >
                              {link.label}
                              <span aria-hidden="true">↗</span>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="installation-guide-command">
                        <CopyBlock
                          code={guide.command}
                          language="shell"
                          label={guide.commandLabel}
                        />
                        <p>
                          <InlineCodeText text={guide.note} />
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="lesson-block">
              <div className="section-heading-inline">
                <div>
                  <div className="section-kicker">同一件事，两种写法</div>
                  <h2>先看做什么，再看怎么写</h2>
                </div>
                <p>
                  <InlineCodeText text={courseModule.codeCaption} />
                </p>
              </div>
              <div className="code-pair">
                <CopyBlock
                  code={courseModule.elixirCode}
                  language="elixir"
                  label="Elixir"
                />
                <CopyBlock
                  code={courseModule.erlangCode}
                  language="erlang"
                  label="Erlang"
                />
              </div>
            </section>

            <section className="lesson-block experiment-block">
              <div className="experiment-heading">
                <div>
                  <span className="experiment-index">LAB</span>
                  <div>
                    <div className="section-kicker">动手</div>
                    <h2>{courseModule.experiment.title}</h2>
                  </div>
                </div>
                <span className="experiment-time">约 15–25 分钟</span>
              </div>
              <p className="experiment-intro">
                <InlineCodeText text={courseModule.experiment.intro} />
              </p>

              <ol className="experiment-steps">
                {courseModule.experiment.steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>
                      <InlineCodeText text={step} />
                    </p>
                  </li>
                ))}
              </ol>

              <CopyBlock
                code={courseModule.experiment.command}
                language="shell"
                label="复制到终端，按回车"
              />

              <div className="expected-panel">
                <span>你会看到</span>
                <ul>
                  {courseModule.experiment.expected.map((item) => (
                    <li key={item}>
                      <InlineCodeText text={item} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="break-panel">
                <div>
                  <span className="break-icon" aria-hidden="true">
                    !
                  </span>
                  <div>
                    <strong>故意弄坏</strong>
                    <p>
                      <InlineCodeText text={courseModule.experiment.breakIt} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="evidence-grid">
                <div>
                  <span>这次能看清</span>
                  <p>
                    <InlineCodeText text={courseModule.experiment.canProve} />
                  </p>
                </div>
                <div>
                  <span>这次还不能说明</span>
                  <p>
                    <InlineCodeText
                      text={courseModule.experiment.cannotProve}
                    />
                  </p>
                </div>
              </div>
            </section>

            <QuizCard
              question={courseModule.quiz.question}
              options={courseModule.quiz.options}
              answer={courseModule.quiz.answer}
              explanation={courseModule.quiz.explanation}
            />

            <section className="lesson-block challenge-block">
              <div className="section-kicker">轮到你</div>
              <h2>{courseModule.challenge.title}</h2>
              <p className="challenge-brief">
                <InlineCodeText text={courseModule.challenge.brief} />
              </p>

              <div className="hint-stack">
                {courseModule.challenge.hints.map((hint, index) => (
                  <details key={hint}>
                    <summary>
                      <span>提示 {index + 1}</span>
                      {index === 0
                        ? "先迈一步"
                        : index === 1
                          ? "再缩小一点"
                          : "离答案很近了"}
                    </summary>
                    <p>
                      <InlineCodeText text={hint} />
                    </p>
                  </details>
                ))}
                <details>
                  <summary>
                    <span>提示 4</span>
                    从终点往回想
                  </summary>
                  <p>
                    先挑一条“过关信号”，为它写一个最小测试。如果电脑看不出结果，就把这句话改成一个真正能观察到的现象。
                  </p>
                </details>
              </div>

              <div className="acceptance-card">
                <span>过关条件</span>
                <ul>
                  {courseModule.challenge.acceptance.map((item, index) => (
                    <li key={item}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>
                        <InlineCodeText text={item} />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="lesson-block takeaway-block">
              <div>
                <div className="section-kicker">带走</div>
                <h2>记住三句话</h2>
              </div>
              <ol>
                {courseModule.takeaways.map((takeaway, index) => (
                  <li key={takeaway}>
                    <span>{index + 1}</span>
                    <InlineCodeText text={takeaway} />
                  </li>
                ))}
              </ol>
            </section>

            <section className="lesson-block references-block">
              <div className="section-kicker">再读一点</div>
              <h2>去看原版资料</h2>
              <div>
                {courseModule.references.map((reference) => (
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    key={reference.href}
                  >
                    <span>{reference.label}</span>
                    <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
            </section>

            <section className="lesson-completion">
              <div>
                <span>本站结束</span>
                <strong>实验做过，答案也想过，就把这一站收好。</strong>
              </div>
              <ProgressButton slug={courseModule.slug} />
            </section>

            <nav className="lesson-pagination" aria-label="相邻模块">
              {previous ? (
                <Link href={`/learn/${previous.slug}`}>
                  <span>← 上一站</span>
                  <strong>
                    {previous.number} · {previous.title}
                  </strong>
                </Link>
              ) : (
                <span />
              )}
              {courseModule.slug === "install-toolchain" ? (
                <Link href="/from-scratch">
                  <span>下一步 →</span>
                  <strong>选择一条从零路线</strong>
                </Link>
              ) : next ? (
                <Link href={`/learn/${next.slug}`}>
                  <span>下一站 →</span>
                  <strong>
                    {next.number} · {next.title}
                  </strong>
                </Link>
              ) : (
                <Link href="/#beam-roadmap">
                  <span>全部通关 →</span>
                  <strong>回到探险地图</strong>
                </Link>
              )}
            </nav>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
