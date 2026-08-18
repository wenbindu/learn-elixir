import type { LearningGuidance } from "../i18n/learning-guidance";
import type { Locale } from "../i18n/locales";
import { InlineCodeText } from "./InlineCodeText";

const copy = {
  zh: {
    beforeKicker: "先停十秒",
    beforeTitle: "别急着按回车",
    predict: "先猜",
    trace: "再追",
    changeOne: "最后只改一处",
    designKicker: "设计选择",
    designTitle: "为什么这样写",
    choice: "这次选择",
    tradeoff: "代价与边界",
    compareKicker: "换一把尺子",
    compareTitle: "从 Java、Python、JavaScript 看过来",
    familiar: "熟悉的起点",
    difference: "BEAM 在意什么",
    watchFor: "别带错直觉",
  },
  en: {
    beforeKicker: "PAUSE FOR TEN SECONDS",
    beforeTitle: "Before you press Run",
    predict: "Predict",
    trace: "Trace",
    changeOne: "Change one thing",
    designKicker: "DESIGN DECISION",
    designTitle: "Why this shape?",
    choice: "Choice",
    tradeoff: "Cost and boundary",
    compareKicker: "A FAMILIAR POINT OF VIEW",
    compareTitle: "Coming from Java, Python, or JavaScript",
    familiar: "Familiar starting point",
    difference: "What BEAM changes",
    watchFor: "False friend",
  },
} as const;

type GuidanceProps = {
  guidance: LearningGuidance;
  locale: Locale;
};

export function BeforeRunCard({ guidance, locale }: GuidanceProps) {
  const labels = copy[locale];
  const prompts = [
    [labels.predict, guidance.beforeRun.predict],
    [labels.trace, guidance.beforeRun.trace],
    [labels.changeOne, guidance.beforeRun.changeOne],
  ] as const;

  return (
    <aside className="before-run-card" aria-labelledby="before-run-title">
      <div className="before-run-heading">
        <span>{labels.beforeKicker}</span>
        <h3 id="before-run-title">{labels.beforeTitle}</h3>
      </div>
      <ol>
        {prompts.map(([label, text]) => (
          <li key={label}>
            <strong>{label}</strong>
            <p>
              <InlineCodeText text={text} />
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function DesignComparisonPanel({ guidance, locale }: GuidanceProps) {
  const labels = copy[locale];
  if (!guidance.designDecision && !guidance.comparisons?.length) return null;

  return (
    <div className="learning-perspective-stack">
      {guidance.designDecision ? (
        <section className="design-decision-card">
          <div className="section-kicker">{labels.designKicker}</div>
          <h2>{labels.designTitle}</h2>
          <h3>
            <InlineCodeText text={guidance.designDecision.question} />
          </h3>
          <div>
            <article>
              <span>{labels.choice}</span>
              <p>
                <InlineCodeText text={guidance.designDecision.choice} />
              </p>
            </article>
            <article>
              <span>{labels.tradeoff}</span>
              <p>
                <InlineCodeText text={guidance.designDecision.tradeoff} />
              </p>
            </article>
          </div>
        </section>
      ) : null}

      {guidance.comparisons?.length ? (
        <section className="ecosystem-comparison-card">
          <div className="section-kicker">{labels.compareKicker}</div>
          <h2>{labels.compareTitle}</h2>
          <div className="ecosystem-comparison-list">
            {guidance.comparisons.map((comparison) => (
              <article key={comparison.ecosystem}>
                <h3>{comparison.ecosystem}</h3>
                <dl>
                  <div>
                    <dt>{labels.familiar}</dt>
                    <dd>
                      <InlineCodeText text={comparison.familiarModel} />
                    </dd>
                  </div>
                  <div>
                    <dt>{labels.difference}</dt>
                    <dd>
                      <InlineCodeText text={comparison.beamDifference} />
                    </dd>
                  </div>
                  <div>
                    <dt>{labels.watchFor}</dt>
                    <dd>
                      <InlineCodeText text={comparison.watchFor} />
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
