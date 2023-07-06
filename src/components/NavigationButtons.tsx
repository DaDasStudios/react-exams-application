import { useExamContext } from "../context/ExamContext";
import { Answer } from "../interfaces/exam";

interface Props {
  answer: Answer;
}

export default function NavigationButtons({ answer }: Props) {
  const { amount, page, lastPage, finished, submitting, cancelled, answersRecords, handleNavigation, submitAnswer } =
    useExamContext();
  const hasAnswered = Boolean(answersRecords[page]);

  return (
    <div className="navigation-buttons">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => handleNavigation(-1)}
      >
        Previous
      </button>
      {hasAnswered ? (
        <button
          type="button"
          disabled={page === amount - 1 || (cancelled && lastPage === page)}
          onClick={() => handleNavigation(1)}
        >
          Continue
        </button>
      ) : (
        !finished && (
          <button
            type="button"
            onClick={() => submitAnswer(answer)}
            disabled={submitting}
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        )
      )}
      {page === amount - 1 && finished && (
        <button
          type="button"
          onClick={() => {
            alert("Exam finished");
            location.reload();
          }}
        >
          Finish
        </button>
      )}
    </div>
  );
}
