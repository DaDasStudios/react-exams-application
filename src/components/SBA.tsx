import { useState } from "react";
import { AnswerSBA, Question, SBA } from "../interfaces/exam";
import { useExamContext } from "../context/ExamContext";
import NavigationButtons from "./NavigationButtons";

interface Props {
  question: Question<SBA>;
}

export default function SBAQuestion({ question }: Props) {
  const { finished, page, validatedAnswers, answersRecords } =
    useExamContext();
  const [answer, setAnswer] = useState<AnswerSBA>("");
  const canAnswer = !answersRecords[page] && !finished;

  function selectOption(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value)
  }

  return (
    <>
      <div>
        <h4>
          {question.category} / {question.type} / {question.topic}
        </h4>
        <p>
          {!canAnswer && <span>{validatedAnswers[page] ? "✅ " : "❌ "}</span>}
          {question.content.question}
        </p>
        <ol role="list">
          {question.content.options.map((option, optionIndex) => (
            <li
              key={`${question.id}-option:${optionIndex}`}
              style={{
                textDecoration:
                  !canAnswer && answersRecords[page] === option
                    ? "underline"
                    : "none",
              }}
            >
              {canAnswer && (
                <input
                  type="radio"
                  name={`answer:${question.id}`}
                  value={option}
                  defaultChecked={answersRecords[page] === option}
                  onChange={selectOption}
                />
              )}
              {option}
            </li>
          ))}
        </ol>
        {!canAnswer && <article>{question.explanation}</article>}
      </div>
      <NavigationButtons answer={answer}></NavigationButtons>
    </>
  );
}
