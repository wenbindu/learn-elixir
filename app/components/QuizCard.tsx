"use client";

import { useState } from "react";
import { InlineCodeText } from "./InlineCodeText";

type QuizCardProps = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function QuizCard({
  question,
  options,
  answer,
  explanation,
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
      <div className="section-kicker">猜一猜</div>
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
          <strong>{isCorrect ? "答对啦，你找到了关键线索。" : "差一点，看看下面这条线索。"}</strong>
          <p>
            <InlineCodeText text={explanation} />
          </p>
          <button type="button" onClick={reset}>
            再答一次
          </button>
        </div>
      ) : (
        <button
          className="button button--dark quiz-submit"
          type="button"
          disabled={selected === null}
          onClick={() => setChecked(true)}
        >
          看看答案
        </button>
      )}
    </section>
  );
}
