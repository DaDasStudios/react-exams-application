import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
} from "react";
import { Question, AnswerResponse, Answer } from "../interfaces/exam";
import { questions as q } from "../data/questions";
import { sleep } from "../utils/index";
import { rateAnswer } from "../api/validation";

interface IExamContext {
  currQuestion?: Question<any>;
  amount: number;
  page: number;
  lastPage: number
  answersRecords: Answer[];
  validatedAnswers: AnswerResponse[];
  finished: boolean;
  loading: boolean;
  submitting: boolean;
  cancelled: boolean;
  handleNavigation(step: number): void;
  submitAnswer(answer: Answer): void;
  cancelExam(): void;
}

const ExamContext = createContext({} as IExamContext);

export const useExamContext = () => useContext(ExamContext);

export const ExamProvider = ({ children }: PropsWithChildren) => {
  const amount = q.length;
  const [currQuestion, setCurrQuestion] = useState<Question>();
  const [page, setPage] = useState(0);
  const [validatedAnswers, setValidatedAnswers] = useState<AnswerResponse[]>(
    []
  );
  const [answersRecords, setAnswersRecords] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const lastPage = useRef(0)

  useEffect(() => {
    (async function fetchQuestion() {
      setLoading(true);
      await sleep(Math.random() * 800);
      setCurrQuestion(q[page]);
      setLoading(false);
    })();
  }, [page]);

  return (
    <ExamContext.Provider
      value={{
        amount,
        finished,
        loading,
        submitting,
        cancelled,
        page,
        lastPage: lastPage.current,
        currQuestion,
        answersRecords,
        validatedAnswers,
        handleNavigation(step) {
          setPage((p) => {
            const newPage = p + step;

            if (newPage < 0 || newPage > amount - 1) return p;

            if (cancelled && newPage > lastPage.current) return p

            return newPage;
          });
        },
        async submitAnswer(answer) {
          setSubmitting(true);
          await sleep(1000);
          const rating = rateAnswer(currQuestion, answer);
          if (rating !== null) {
            setValidatedAnswers((prev) => [...prev, rating]);
            setAnswersRecords((prev) => [...prev, answer]);

            if (page === amount - 1) {
              setFinished(true);
            }
          }

          setSubmitting(false);
        },
        cancelExam() {
          if (window.confirm("Are you sure you want to cancel this exam?")) {
            setCancelled(true);
            lastPage.current = page
          }
        },
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};
