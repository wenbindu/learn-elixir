"use client";

import { useState } from "react";
import type { Locale } from "../i18n/locales";
import { InlineCodeText } from "./InlineCodeText";

type QuizCardProps = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  locale: Locale;
};

export function QuizCard({
  question,
  options,
  answer,
  explanation,
  locale,
}: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = selected === answer;

  function reset() {
    setSelected(null);
    setChecked(false);
  }

  return (
    <section className="quiz-card" aria-labelledby="quick-check-title">
      <div className="section-kicker">{locale === "zh" ? "想一想" : "Think it through"}</div>
      <h2 id="quick-check-title">
        <InlineCodeText text={question} />
      </h2>
      <div className="quiz-options">
        {options.map((option, index) => {
          const optionState = checked
            ? index === answer
              ? " is-correct"
              : selected === index
                ? " is-wrong"
                : ""
            : selected === index
              ? " is-selected"
              : "";

          return (
            <button
              type="button"
              className={`quiz-option${optionState}`}
              onClick={() => {
                if (!checked) setSelected(index);
              }}
              aria-pressed={selected === index}
              key={option}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <InlineCodeText text={option} />
            </button>
          );
        })}
      </div>

      {checked ? (
        <div
          className={`quiz-feedback${isCorrect ? " is-correct" : " is-wrong"}`}
          role="status"
        >
          <strong>
            {isCorrect
              ? locale === "zh"
                ? "答对了。看看解释，确认原因。"
                : "That is right. Read the explanation and check why."
              : locale === "zh"
                ? "这次没选对。看看解释，再试一次。"
                : "Not this time. Read the explanation, then try again."}
          </strong>
          <p>
            <InlineCodeText text={explanation} />
          </p>
          <button type="button" onClick={reset}>
            {locale === "zh" ? "再答一次" : "Try again"}
          </button>
        </div>
      ) : (
        <button
          className="button button--dark quiz-submit"
          type="button"
          disabled={selected === null}
          onClick={() => setChecked(true)}
        >
          {locale === "zh" ? "检查答案" : "Check answer"}
        </button>
      )}
    </section>
  );
}
