import { useState } from "react";
import { AnswerCBQ, CBQ, Question } from "../interfaces/exam";
import { useExamContext } from "../context/ExamContext";
import NavigationButtons from "./NavigationButtons";

interface Props {
  question: Question<CBQ>;
}

export default function CBQQuestion({ question }: Props) {
  const { finished, page, validatedAnswers, answersRecords } = useExamContext();
  const [answers, setAnswers] = useState<AnswerCBQ>(
    new Array(question.content.length).fill("")
  );
  const [_case, setCase] = useState(0);
  const cases = question.content.length;
  const canAnswer = !answersRecords[page] && !finished;

  function selectOption(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i == Number(e.target.getAttribute("data-case-index"))
          ? e.target.value
          : a
      )
    );
  }

  function handleNavigation(step: number) {
    setCase((p) => {
      const newPage = p + step;
      if (newPage < 0 || newPage > cases - 1) return p;
      return newPage;
    });
  }

  return (
    <>
      <div>
        <h4>
          {question.category} / {question.type} / {question.topic}
        </h4>
        {!canAnswer && (
          <span>
            {answersRecords[page] &&
            answersRecords[page][_case] === question.content.at(_case)?.answer
              ? "✅ "
              : "❌ "}
          </span>
        )}
        {question.content.map((subQuestion, subPage) => (
          <div key={`case:${subPage}-${question.id}`}>
            {_case === subPage && (
              <>
                <p>{subQuestion.question}</p>
                <ol role="list">
                  {subQuestion.options.map((option, optionIndex) => (
                    <li
                      key={`case:${_case}-${question.id}-option:${optionIndex}`}
                      style={{
                        textDecoration:
                          answersRecords[page] &&
                          answersRecords[page][_case] === option
                            ? "underline"
                            : "none",
                      }}
                    >
                      {canAnswer && (
                        <input
                          type="radio"
                          name={`case:${_case}-answer:${question.id}`}
                          value={option}
                          defaultChecked={
                            canAnswer && answers[_case] === option
                          }
                          onChange={selectOption}
                          data-case-index={_case}
                        />
                      )}
                      {option}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        ))}
        {!canAnswer && <article>{question.explanation}</article>}
      </div>
      <div
        className="navigation-buttons"
        style={{
          marginBottom: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => handleNavigation(-1)}
          disabled={_case === 0}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => handleNavigation(1)}
          disabled={_case === cases - 1}
        >
          Next
        </button>
      </div>
      <NavigationButtons answer={answers}></NavigationButtons>
    </>
  );
}
