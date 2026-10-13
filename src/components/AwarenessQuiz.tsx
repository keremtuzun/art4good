"use client";

import { useState } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS } from "@/content/quiz";
import type { Locale } from "@/lib/i18n";

export default function AwarenessQuiz({ locale }: { locale: Locale }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const finished = questionIndex === QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[questionIndex];
  const selected = answers[questionIndex];
  const completedCount = questionIndex + Number(selected !== null && !finished);
  const score = answers.reduce<number>((count, answer, index) => count + Number(answer === QUIZ_QUESTIONS[index].answer), 0);

  function selectAnswer(optionIndex: number) {
    if (selected !== null) return;
    setAnswers((current) => current.map((answer, index) => index === questionIndex ? optionIndex : answer));
  }

  function restart() {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setQuestionIndex(0);
  }

  return (
    <section className="wrap pb-24" aria-label="Art access awareness quiz">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-line bg-paper p-5 shadow-soft sm:p-9">
        {finished ? (
          <div className="py-8 text-center" aria-live="polite">
            <span className="eyebrow">Quiz complete</span>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3rem)]">You got {score} out of {QUIZ_QUESTIONS.length}.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              The biggest takeaway: every child deserves room to create, and honest evidence helps us see where access is missing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn btn-ink" onClick={restart}>Try again</button>
              <Link href={`/${locale}/get-involved`} className="btn btn-accent">Help make art accessible</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 text-sm font-bold text-muted">
              <span>Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round((completedCount / QUIZ_QUESTIONS.length) * 100)}% complete</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-2" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-red transition-[width] duration-300" style={{ width: `${(completedCount / QUIZ_QUESTIONS.length) * 100}%` }} />
            </div>
            <h2 className="mt-8 text-[clamp(1.6rem,3vw,2.15rem)] leading-tight">{question.question}</h2>
            <div className="mt-6 grid gap-3" role="group" aria-label="Answer choices">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.answer;
                const isSelected = optionIndex === selected;
                const revealed = selected !== null;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={revealed}
                    onClick={() => selectAnswer(optionIndex)}
                    aria-label={revealed ? `${isCorrect ? "Correct answer: " : isSelected ? "Your answer: " : ""}${option}` : option}
                    className={`rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-colors disabled:cursor-default ${
                      revealed && isCorrect ? "border-brand-green bg-brand-green/10 text-ink" :
                      revealed && isSelected ? "border-brand-red bg-brand-red/10 text-ink" :
                      "border-line bg-cream/50 text-ink hover:border-brand-blue hover:bg-brand-blue/5"
                    }`}
                  >
                    <span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-full bg-white text-sm" aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="mt-6 rounded-2xl bg-cream p-5" aria-live="polite">
                <p className="font-bold text-ink">{selected === question.answer ? "That's right." : `Correct answer: ${question.options[question.answer]}`}</p>
                <p className="mt-2 text-muted">{question.explanation}</p>
                <a href={question.source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-brand-blue underline underline-offset-4">
                  Read the source: {question.source.label} ↗
                </a>
                <div className="mt-6">
                  <button type="button" className="btn btn-ink" onClick={() => setQuestionIndex((index) => index + 1)}>
                    {questionIndex === QUIZ_QUESTIONS.length - 1 ? "See my result" : "Next question"} →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-sm text-muted">
        Figures about poverty or school access are labelled as such; they are not estimates of how many children lack art education. No answers are collected or stored.
      </p>
    </section>
  );
}
