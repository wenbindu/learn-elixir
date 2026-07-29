import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBlock } from "../../components/CopyBlock";
import { ProgressButton } from "../../components/ProgressButton";
import { QuizCard } from "../../components/QuizCard";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  courseModules,
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
              <strong>完整课程</strong>
              <small>12 模块 · 46 检查点</small>
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
                        <span>{item.title.replace(/^[^：]+：/, "")}</span>
                        <small>{item.duration}</small>
                      </Link>
                    ))}
                </div>
              ))}
            </nav>

            <div className="sidebar-note">
              <span className="live-dot" />
              进度保存在当前浏览器，可在首页导出。
            </div>
          </aside>

          <article className="lesson-article">
            <details className="lesson-mobile-nav">
              <summary>
                <span>模块 {courseModule.number}</span>
                查看课程目录
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
                  </Link>
                ))}
              </div>
            </details>

            <div className="lesson-breadcrumb">
              <Link href="/">首页</Link>
              <span>/</span>
              <Link href="/#roadmap">学习路径</Link>
              <span>/</span>
              <strong>模块 {courseModule.number}</strong>
            </div>

            <header className={`lesson-hero lesson-hero--${courseModule.stage}`}>
              <div className="lesson-hero-top">
                <div className="lesson-number">{courseModule.number}</div>
                <div className="lesson-labels">
                  <span>{courseModule.stageLabel}</span>
                  <span>{courseModule.level}</span>
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
                  <small>检查点</small>
                </div>
                <div>
                  <span>{courseModule.duration}</span>
                  <small>预计完成</small>
                </div>
                <ProgressButton slug={courseModule.slug} />
              </div>
            </header>

            <section className="lesson-block lesson-block--why">
              <div className="section-kicker">为什么先学这个</div>
              <h2>先修正心智模型，再增加 API</h2>
              <p>{courseModule.why}</p>
            </section>

            <section className="lesson-block">
              <div className="lesson-two-column">
                <div>
                  <div className="section-kicker">学完你能做到</div>
                  <h2>可验证的学习目标</h2>
                  <ul className="check-list">
                    {courseModule.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <span aria-hidden="true">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="prerequisite-card">
                  <span>前置知识</span>
                  <ul>
                    {courseModule.prerequisites.map((prerequisite) => (
                      <li key={prerequisite}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="lesson-block">
              <div className="section-kicker">最小心智模型</div>
              <h2>先抓住三个词</h2>
              <div className="concept-grid">
                {courseModule.concepts.map((concept, index) => (
                  <article key={concept.term}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{concept.term}</h3>
                    <p>{concept.definition}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lesson-block">
              <div className="section-heading-inline">
                <div>
                  <div className="section-kicker">双语代码桥</div>
                  <h2>先对齐协议，再看标点</h2>
                </div>
                <p>{courseModule.codeCaption}</p>
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
                    <div className="section-kicker">可运行实验</div>
                    <h2>{courseModule.experiment.title}</h2>
                  </div>
                </div>
                <span className="experiment-time">约 15–25 分钟</span>
              </div>
              <p className="experiment-intro">{courseModule.experiment.intro}</p>

              <ol className="experiment-steps">
                {courseModule.experiment.steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>

              <CopyBlock
                code={courseModule.experiment.command}
                language="shell"
                label="在终端 / shell 中运行"
              />

              <div className="expected-panel">
                <span>预期观察</span>
                <ul>
                  {courseModule.experiment.expected.map((item) => (
                    <li key={item}>{item}</li>
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
                    <p>{courseModule.experiment.breakIt}</p>
                  </div>
                </div>
              </div>

              <div className="evidence-grid">
                <div>
                  <span>这个实验能证明</span>
                  <p>{courseModule.experiment.canProve}</p>
                </div>
                <div>
                  <span>这个实验不能证明</span>
                  <p>{courseModule.experiment.cannotProve}</p>
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
              <div className="section-kicker">本章挑战</div>
              <h2>{courseModule.challenge.title}</h2>
              <p className="challenge-brief">{courseModule.challenge.brief}</p>

              <div className="hint-stack">
                {courseModule.challenge.hints.map((hint, index) => (
                  <details key={hint}>
                    <summary>
                      <span>提示 {index + 1}</span>
                      {index === 0
                        ? "轻推一下"
                        : index === 1
                          ? "缩小问题"
                          : "接近实现"}
                    </summary>
                    <p>{hint}</p>
                  </details>
                ))}
                <details>
                  <summary>
                    <span>提示 4</span>
                    用验收标准反推
                  </summary>
                  <p>
                    从下面每一条验收标准倒推一个最小测试。若某条无法写成测试，先把表述改成可观察结果。
                  </p>
                </details>
              </div>

              <div className="acceptance-card">
                <span>完成标准</span>
                <ul>
                  {courseModule.challenge.acceptance.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="lesson-block takeaway-block">
              <div>
                <div className="section-kicker">带走这三句话</div>
                <h2>复习卡</h2>
              </div>
              <ol>
                {courseModule.takeaways.map((takeaway, index) => (
                  <li key={takeaway}>
                    <span>{index + 1}</span>
                    {takeaway}
                  </li>
                ))}
              </ol>
            </section>

            <section className="lesson-block references-block">
              <div className="section-kicker">继续核对</div>
              <h2>本章一手资料</h2>
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

            <nav className="lesson-pagination" aria-label="相邻模块">
              {previous ? (
                <Link href={`/learn/${previous.slug}`}>
                  <span>← 上一模块</span>
                  <strong>
                    {previous.number} · {previous.title}
                  </strong>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/learn/${next.slug}`}>
                  <span>下一模块 →</span>
                  <strong>
                    {next.number} · {next.title}
                  </strong>
                </Link>
              ) : (
                <Link href="/#roadmap">
                  <span>完成路径 →</span>
                  <strong>回到课程全览</strong>
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
