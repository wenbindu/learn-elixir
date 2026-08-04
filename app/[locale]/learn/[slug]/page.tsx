import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeLanguageSwitcher } from "../../../components/CodeLanguageSwitcher";
import { CopyBlock } from "../../../components/CopyBlock";
import { InlineCodeText } from "../../../components/InlineCodeText";
import { LocalizedLink } from "../../../components/LocalizedLink";
import { ProgressButton } from "../../../components/ProgressButton";
import { QuizCard } from "../../../components/QuizCard";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import {
  getAdjacentCourseModules,
  getCourseCatalog,
  getCourseModule,
} from "../../../i18n/catalog";
import { isLocale, locales, type Locale } from "../../../i18n/locales";
import { localeAlternates } from "../../../i18n/metadata";

const lessonPageCopy = {
  zh: {
    courseDirectory: "课程目录",
    mapTitle: "BEAM 探险地图",
    sidebarStats: (prerequisite: number, mainline: number, optional: number) =>
      `${prerequisite} 站前置 · ${mainline} 站主线 · ${optional} 站复习`,
    prerequisite: "前置准备",
    optionalReview: "可选复习",
    sidebarNote: "进度只在这台设备。换设备前，去首页保存。",
    station: (number: string) => `第 ${number} 站`,
    expandMap: "展开探险地图",
    home: "首页",
    mainline: "BEAM 主线",
    syntaxEyebrow: "还没学过语法？",
    syntaxTitle: "如果值、模式、函数或模块还陌生，先从一门语言学起。",
    syntaxText: "Elixir 和 Erlang 任选一条。完成 Foundation，就可以回来走 BEAM 主线。",
    elixirBasics: "Elixir 从零 →",
    erlangBasics: "Erlang 从零 →",
    checkpoints: "小关卡",
    splitSessions: "可以分几次",
    questionKicker: "QUESTION · 本站只追这一问",
    incidentLabel: "先看现场",
    evidenceLabel: "能够观察到",
    whyKicker: "为什么学这一站",
    whyTitle: "它要解决什么",
    storyMark: "故",
    storyKicker: (label: string) => `借一个故事 · ${label}`,
    backToCode: "回到代码",
    metaphorEnds: "比喻到这里",
    outcomesKicker: "走完这一站",
    outcomesTitle: "你会做到",
    beforeStart: "出发前",
    conceptsKicker: "先认词",
    conceptsTitle: "这段代码里的关键词",
    installKicker: "按系统安装",
    installTitle: "只走你电脑这一条路",
    mixIncluded: "Mix 已包含在 Elixir 里",
    twoWaysKicker: "同一件事，两种写法",
    twoWaysTitle: "先看做什么，再看怎么写",
    patternsKicker: "从代码里认出章法",
    patternsTitle: "这里用了哪些设计模式",
    handsOn: "动手",
    labTime: "约 15–25 分钟",
    terminalLabel: "复制到终端，按回车",
    expected: "你会看到",
    breakIt: "故意弄坏",
    canSee: "这次能看清",
    cannotShow: "这次还不能说明",
    yourTurn: "轮到你",
    hint: (number: number) => `提示 ${number}`,
    hintTitles: ["先迈一步", "再缩小一点", "离答案很近了"],
    lastHintTitle: "从终点往回想",
    lastHintText:
      "先挑一条“过关信号”，为它写一个最小测试。如果电脑看不出结果，就把这句话改成一个真正能观察到的现象。",
    acceptance: "过关条件",
    takeawayKicker: "带走",
    takeawayTitle: "记住三句话",
    readMore: "再读一点",
    originalSources: "去看原版资料",
    completionEyebrow: "本站结束",
    completionTitle: "实验做过，答案也想过，就把这一站收好。",
    paginationLabel: "相邻模块",
    previous: "← 上一站",
    nextStep: "下一步 →",
    chooseBasics: "选择一条从零路线",
    next: "下一站 →",
    allComplete: "全部通关 →",
    backToMap: "回到探险地图",
  },
  en: {
    courseDirectory: "Course directory",
    mapTitle: "BEAM Adventure Map",
    sidebarStats: (prerequisite: number, mainline: number, optional: number) =>
      `${prerequisite} setup · ${mainline} mainline · ${optional} reviews`,
    prerequisite: "Setup",
    optionalReview: "Optional review",
    sidebarNote: "Progress stays on this device. Save it from the home page before switching devices.",
    station: (number: string) => `Station ${number}`,
    expandMap: "Open the adventure map",
    home: "Home",
    mainline: "BEAM mainline",
    syntaxEyebrow: "New to the syntax?",
    syntaxTitle: "If values, patterns, functions, or modules are still new, begin with one language.",
    syntaxText: "Choose Elixir or Erlang. Finish Foundation, then come back to the BEAM mainline.",
    elixirBasics: "Elixir from scratch →",
    erlangBasics: "Erlang from scratch →",
    checkpoints: "checkpoints",
    splitSessions: "split it into sessions",
    questionKicker: "QUESTION · ONE PROBLEM FOR THIS STATION",
    incidentLabel: "Start at the scene",
    evidenceLabel: "Evidence you can observe",
    whyKicker: "Why this station matters",
    whyTitle: "The problem it solves",
    storyMark: "S",
    storyKicker: (label: string) => `A story to help · ${label}`,
    backToCode: "Back to the code",
    metaphorEnds: "Where the metaphor ends",
    outcomesKicker: "After this station",
    outcomesTitle: "You will be able to",
    beforeStart: "Before you start",
    conceptsKicker: "Meet the words",
    conceptsTitle: "Key ideas in this code",
    installKicker: "Install for your system",
    installTitle: "Follow only the path for your computer",
    mixIncluded: "Mix is included with Elixir",
    twoWaysKicker: "One job, two ways to write it",
    twoWaysTitle: "See what it does before how it is written",
    patternsKicker: "Name the shape in the code",
    patternsTitle: "Design patterns used here",
    handsOn: "Hands on",
    labTime: "About 15–25 minutes",
    terminalLabel: "Copy into the terminal and press Enter",
    expected: "What you should see",
    breakIt: "Break it on purpose",
    canSee: "What this shows",
    cannotShow: "What this does not show yet",
    yourTurn: "Your turn",
    hint: (number: number) => `Hint ${number}`,
    hintTitles: ["Take the first step", "Make it a little smaller", "You are close"],
    lastHintTitle: "Work backward from the finish",
    lastHintText:
      "Choose one success signal and write the smallest test for it. If the computer cannot show the result, rewrite the signal as something you can truly observe.",
    acceptance: "Ready to move on when",
    takeawayKicker: "Take these with you",
    takeawayTitle: "Remember three things",
    readMore: "Read a little more",
    originalSources: "Visit the original sources",
    completionEyebrow: "Station complete",
    completionTitle: "You ran the experiment and thought through the answer. Save this station.",
    paginationLabel: "Nearby modules",
    previous: "← Previous station",
    nextStep: "Next step →",
    chooseBasics: "Choose a From Scratch path",
    next: "Next station →",
    allComplete: "All stations complete →",
    backToMap: "Return to the adventure map",
  },
} as const satisfies Record<Locale, object>;

type LessonPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCourseCatalog(locale).courseModules.map((courseModule) => ({
      locale,
      slug: courseModule.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const courseModule = getCourseModule(locale, slug);
  if (!courseModule) notFound();

  return {
    title: courseModule.title,
    description: courseModule.summary,
    alternates: localeAlternates(locale, `/learn/${slug}`),
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const courseModule = getCourseModule(locale, slug);
  if (!courseModule) notFound();

  const { courseModules, courseStats, stages } = getCourseCatalog(locale);
  const { previous, next } = getAdjacentCourseModules(
    locale,
    courseModule.slug,
  );
  const copy = lessonPageCopy[locale];

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className="lesson-page">
        <div className="lesson-layout">
          <aside className="lesson-sidebar" aria-label={copy.courseDirectory}>
            <div className="lesson-sidebar-intro">
              <span>BEAM PATH</span>
              <strong>{copy.mapTitle}</strong>
              <small>
                {copy.sidebarStats(
                  courseStats.prerequisiteStations,
                  courseStats.mainlineStations,
                  courseStats.optionalReviewStations,
                )}
              </small>
            </div>

            <nav>
              {stages.map((stage) => (
                <div className="sidebar-stage" key={stage.id}>
                  <span>{stage.title}</span>
                  {courseModules
                    .filter((item) => item.stage === stage.id)
                    .map((item) => (
                      <LocalizedLink
                        href={`/learn/${item.slug}`}
                        locale={locale}
                        className={item.slug === courseModule.slug ? "is-active" : ""}
                        aria-current={
                          item.slug === courseModule.slug ? "page" : undefined
                        }
                        key={item.slug}
                      >
                        <b>{item.number}</b>
                        <span>{item.title}</span>
                        <small>
                          {item.prerequisite
                            ? `${copy.prerequisite} · `
                            : ""}
                          {item.optionalReview
                            ? `${copy.optionalReview} · `
                            : ""}
                          {item.duration}
                        </small>
                      </LocalizedLink>
                    ))}
                </div>
              ))}
            </nav>

            <div className="sidebar-note">
              <span className="live-dot" />
              {copy.sidebarNote}
            </div>
          </aside>

          <article className="lesson-article">
            <details className="lesson-mobile-nav">
              <summary>
                <span>
                  {copy.station(courseModule.number)}
                  {courseModule.optionalReview
                    ? ` · ${copy.optionalReview}`
                    : ""}
                  {courseModule.prerequisite
                    ? ` · ${copy.prerequisite}`
                    : ""}
                </span>
                {copy.expandMap}
              </summary>
              <div>
                {courseModules.map((item) => (
                  <LocalizedLink
                    href={`/learn/${item.slug}`}
                    locale={locale}
                    className={item.slug === courseModule.slug ? "is-active" : ""}
                    key={item.slug}
                  >
                    <span>{item.number}</span>
                    {item.title}
                    {item.optionalReview ? (
                      <small className="lesson-nav-optional">
                        {copy.optionalReview}
                      </small>
                    ) : null}
                    {item.prerequisite ? (
                      <small className="lesson-nav-optional">
                        {copy.prerequisite}
                      </small>
                    ) : null}
                  </LocalizedLink>
                ))}
              </div>
            </details>

            <div className="lesson-breadcrumb">
              <LocalizedLink href="/" locale={locale}>
                {copy.home}
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink href="/#beam-roadmap" locale={locale}>
                {copy.mainline}
              </LocalizedLink>
              <span>/</span>
              <strong>{copy.station(courseModule.number)}</strong>
            </div>

            {courseModule.slug === "start-line" ? (
              <aside className="syntax-path-note">
                <div>
                  <span>{copy.syntaxEyebrow}</span>
                  <strong>{copy.syntaxTitle}</strong>
                  <p>{copy.syntaxText}</p>
                </div>
                <div>
                  <LocalizedLink href="/from-scratch/elixir" locale={locale}>
                    {copy.elixirBasics}
                  </LocalizedLink>
                  <LocalizedLink href="/from-scratch/erlang" locale={locale}>
                    {copy.erlangBasics}
                  </LocalizedLink>
                </div>
              </aside>
            ) : null}

            <header className={`lesson-hero lesson-hero--${courseModule.stage}`}>
              <div className="lesson-hero-top">
                <div className="lesson-number">{courseModule.number}</div>
                <div className="lesson-labels">
                  <span>{courseModule.stageLabel}</span>
                  <span>{courseModule.level}</span>
                  {courseModule.optionalReview ? (
                    <span>{copy.optionalReview}</span>
                  ) : null}
                  {courseModule.prerequisite ? (
                    <span>{copy.prerequisite}</span>
                  ) : null}
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
                  <small>{copy.checkpoints}</small>
                </div>
                <div>
                  <span>{courseModule.duration}</span>
                  <small>{copy.splitSessions}</small>
                </div>
              </div>
            </header>

            <section className="lesson-problem" aria-labelledby="lesson-question">
              <div className="lesson-problem-question">
                <div className="section-kicker">{copy.questionKicker}</div>
                <h2 id="lesson-question">
                  <InlineCodeText text={courseModule.question} />
                </h2>
              </div>
              <div className="lesson-incident">
                <div>
                  <span>{copy.incidentLabel}</span>
                  <h3>{courseModule.incident.title}</h3>
                  <p>
                    <InlineCodeText text={courseModule.incident.description} />
                  </p>
                </div>
                <div className="lesson-incident-evidence">
                  <strong>{copy.evidenceLabel}</strong>
                  <ul>
                    {courseModule.incident.evidence.map((item) => (
                      <li key={item}>
                        <InlineCodeText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="lesson-block lesson-block--why">
              <div className="section-kicker">{copy.whyKicker}</div>
              <h2>{copy.whyTitle}</h2>
              <p>
                <InlineCodeText text={courseModule.why} />
              </p>
            </section>

            <section className="lesson-block">
              <div className="lesson-two-column">
                <div>
                  <div className="section-kicker">{copy.outcomesKicker}</div>
                  <h2>{copy.outcomesTitle}</h2>
                  <ul className="check-list">
                    {courseModule.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <span aria-hidden="true">✓</span>
                        <p>
                          <InlineCodeText text={outcome} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="prerequisite-card">
                  <span>{copy.beforeStart}</span>
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

            {courseModule.installation ? (
              <section
                className="lesson-block installation-block"
                aria-labelledby="installation-guides-title"
              >
                <div className="installation-heading">
                  <div>
                    <div className="section-kicker">{copy.installKicker}</div>
                    <h2 id="installation-guides-title">
                      {copy.installTitle}
                    </h2>
                  </div>
                  <p>
                    <InlineCodeText text={courseModule.installation.intro} />
                  </p>
                </div>

                <aside className="installation-mix-note">
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>{copy.mixIncluded}</strong>
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
                          locale={locale}
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
                  <div className="section-kicker">{copy.twoWaysKicker}</div>
                  <h2>{copy.twoWaysTitle}</h2>
                </div>
                <p>
                  <InlineCodeText text={courseModule.codeCaption} />
                </p>
              </div>
              <div className="lesson-code-switcher">
                <CodeLanguageSwitcher
                  elixirCode={courseModule.elixirCode}
                  erlangCode={courseModule.erlangCode}
                  allowCompare={
                    courseModule.slug === "shared-semantics" ||
                    courseModule.slug === "interoperability"
                  }
                  locale={locale}
                />
              </div>
            </section>

            <section className="lesson-block experiment-block">
              <div className="experiment-heading">
                <div>
                  <span className="experiment-index">LAB</span>
                  <div>
                    <div className="section-kicker">{copy.handsOn}</div>
                    <h2>{courseModule.experiment.title}</h2>
                  </div>
                </div>
                <span className="experiment-time">{copy.labTime}</span>
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
                label={copy.terminalLabel}
                locale={locale}
              />

              <div className="expected-panel">
                <span>{copy.expected}</span>
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
                    <strong>{copy.breakIt}</strong>
                    <p>
                      <InlineCodeText text={courseModule.experiment.breakIt} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="evidence-grid">
                <div>
                  <span>{copy.canSee}</span>
                  <p>
                    <InlineCodeText text={courseModule.experiment.canProve} />
                  </p>
                </div>
                <div>
                  <span>{copy.cannotShow}</span>
                  <p>
                    <InlineCodeText
                      text={courseModule.experiment.cannotProve}
                    />
                  </p>
                </div>
              </div>
            </section>

            <section className="lesson-block">
              <div className="section-kicker">{copy.conceptsKicker}</div>
              <h2>{copy.conceptsTitle}</h2>
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

            <section className="lesson-block pattern-block">
              <div className="section-kicker">{copy.patternsKicker}</div>
              <h2>{copy.patternsTitle}</h2>
              <div className="pattern-grid">
                {courseModule.patterns.map((pattern, index) => (
                  <article key={pattern.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{pattern.name}</h3>
                      <p>
                        <InlineCodeText text={pattern.purpose} />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="lesson-story-bridge">
              <div className="lesson-story-mark" aria-hidden="true">
                {copy.storyMark}
              </div>
              <div className="lesson-story-copy">
                <div className="section-kicker">
                  {copy.storyKicker(courseModule.storyBridge.label)}
                </div>
                <h2>{courseModule.storyBridge.title}</h2>
                <p>
                  <InlineCodeText text={courseModule.storyBridge.story} />
                </p>
                <div className="lesson-story-notes">
                  <div>
                    <strong>{copy.backToCode}</strong>
                    <p>
                      <InlineCodeText
                        text={courseModule.storyBridge.connection}
                      />
                    </p>
                  </div>
                  <div>
                    <strong>{copy.metaphorEnds}</strong>
                    <p>
                      <InlineCodeText text={courseModule.storyBridge.boundary} />
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <QuizCard
              question={courseModule.quiz.question}
              options={courseModule.quiz.options}
              answer={courseModule.quiz.answer}
              explanation={courseModule.quiz.explanation}
              locale={locale}
            />

            <section className="lesson-block challenge-block">
              <div className="section-kicker">{copy.yourTurn}</div>
              <h2>{courseModule.challenge.title}</h2>
              <p className="challenge-brief">
                <InlineCodeText text={courseModule.challenge.brief} />
              </p>

              <div className="hint-stack">
                {courseModule.challenge.hints.map((hint, index) => (
                  <details key={hint}>
                    <summary>
                      <span>{copy.hint(index + 1)}</span>
                      {copy.hintTitles[index]}
                    </summary>
                    <p>
                      <InlineCodeText text={hint} />
                    </p>
                  </details>
                ))}
                <details>
                  <summary>
                    <span>{copy.hint(4)}</span>
                    {copy.lastHintTitle}
                  </summary>
                  <p>{copy.lastHintText}</p>
                </details>
              </div>

              <div className="acceptance-card">
                <span>{copy.acceptance}</span>
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
                <div className="section-kicker">{copy.takeawayKicker}</div>
                <h2>{copy.takeawayTitle}</h2>
              </div>
              <ol>
                {courseModule.takeaways.map((takeaway, index) => (
                  <li key={takeaway}>
                    <span>{index + 1}</span>
                    <p>
                      <InlineCodeText text={takeaway} />
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="lesson-block references-block">
              <div className="section-kicker">{copy.readMore}</div>
              <h2>{copy.originalSources}</h2>
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
                <span>{copy.completionEyebrow}</span>
                <strong>{copy.completionTitle}</strong>
              </div>
              <ProgressButton slug={courseModule.slug} locale={locale} />
            </section>

            <nav
              className="lesson-pagination"
              aria-label={copy.paginationLabel}
            >
              {previous ? (
                <LocalizedLink
                  href={`/learn/${previous.slug}`}
                  locale={locale}
                >
                  <span>{copy.previous}</span>
                  <strong>
                    {previous.number} · {previous.title}
                  </strong>
                </LocalizedLink>
              ) : (
                <span />
              )}
              {courseModule.slug === "install-toolchain" ? (
                <LocalizedLink href="/from-scratch" locale={locale}>
                  <span>{copy.nextStep}</span>
                  <strong>{copy.chooseBasics}</strong>
                </LocalizedLink>
              ) : next ? (
                <LocalizedLink href={`/learn/${next.slug}`} locale={locale}>
                  <span>{copy.next}</span>
                  <strong>
                    {next.number} · {next.title}
                  </strong>
                </LocalizedLink>
              ) : (
                <LocalizedLink href="/#beam-roadmap" locale={locale}>
                  <span>{copy.allComplete}</span>
                  <strong>{copy.backToMap}</strong>
                </LocalizedLink>
              )}
            </nav>
          </article>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
