import { useState } from "react";
import { useExamContext } from "../context/ExamContext";
import { Question, ECQ, AnswerECQ } from "../interfaces/exam";
import NavigationButtons from "./NavigationButtons";

interface Props {
  question: Question<ECQ>;
}

export default function ECQQuestion({ question }: Props) {
  const { finished, page, validatedAnswers, answersRecords } = useExamContext();
  const defaultValue = question.content.options.at(0);

  const [answers, setAnswers] = useState<AnswerECQ>(
    new Array(question.content.questions.length).fill(defaultValue)
  );

  const canAnswer = !answersRecords[page] && !finished;

  function selectOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i == Number(e.target.getAttribute("data-question-index"))
          ? e.target.value
          : a
      )
    );
  }

  return (
    <>
      <div>
        <h4>
          {question.category} / {question.type} / {question.topic}
        </h4>
        <p>
          {!canAnswer && (
            <span>
              {validatedAnswers[page]
                ? "✅ All questions correct"
                : "❌ Questions incorrect"}
            </span>
          )}
        </p>
        <ol role="list">
          {question.content.questions.map((subQuestion, index) => (
            <li
              key={`${question.id}-subQuestion:${index}`}
              style={{
                textDecoration:
                  !canAnswer && answersRecords[page] === answers[index]
                    ? "underline"
                    : "none",
              }}
            >
              <p>{subQuestion.question}</p>
              {canAnswer && (
                <select
                  onChange={selectOption}
                  defaultValue={defaultValue}
                  data-question-index={index}
                >
                  {question.content.options.map((option, optionIndex) => (
                    <option
                      key={`${question.id}-subQuestion:${index}-option:${optionIndex}`}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ol>
        {!canAnswer && <article>{question.explanation}</article>}
      </div>
      <NavigationButtons answer={answers}></NavigationButtons>
    </>
  );
}
