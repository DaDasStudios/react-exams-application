import { useExamContext } from "../context/ExamContext";

export default function CancelButton() {
  const { cancelExam, cancelled } = useExamContext()
  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <button type="button" onClick={cancelExam} disabled={cancelled}>{cancelled ? "Cancelled" : "Cancel Exam"}</button>
    </div>
  );
}
