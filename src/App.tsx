import CancelButton from "./components/CancelButton";
import TypeWrapper from "./components/TypeWrapper";
import { ExamProvider } from "./context/ExamContext";

function App() {
  return (
    <ExamProvider>
      <TypeWrapper></TypeWrapper>
      <CancelButton></CancelButton>
    </ExamProvider>
  );
}

export default App;
