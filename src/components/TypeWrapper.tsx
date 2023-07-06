import { useExamContext } from "../context/ExamContext";
import SBAQuestion from "./SBA";
import ECQQuestion from "./ECQ";
import CBQQuestion from "./CBQ";

export default function TypeWrapper() {
  const { currQuestion, loading } = useExamContext();

  if (loading) return <h1>Loading questions... </h1>;

  function switchQuestion() {
    if (!currQuestion) return <h1>Question not found</h1>;

    switch (currQuestion.type) {
      case "SBA":
        return <SBAQuestion question={currQuestion} />;
      case "CBQ":
        return <CBQQuestion question={currQuestion} />;
      case "ECQ":
        return <ECQQuestion question={currQuestion} />;
    }
  }

  return (
    <fieldset>
      <legend>Question bank</legend>
      {switchQuestion()}
    </fieldset>
  );
}
