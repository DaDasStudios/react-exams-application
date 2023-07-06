import { Answer, AnswerECQ, AnswerSBA, SBA, CBQ, Question, QuestionType, ECQ } from "../interfaces/exam";

function validateAnswer(type: QuestionType, answer: Answer) {
  switch (type) {
    case "SBA": {
      if (!(answer as AnswerSBA)) {
        alert("Choose an option");
        return false
      }
      return true
    }
    case "CBQ": 
    case "ECQ": {
      const valid = (answer as AnswerECQ).every((a) => a);
      if (!valid) {
        alert("Choose all the options")
      }
      return valid
    }
  }
}

export function rateAnswer(question: unknown, answer: Answer): boolean | null {
  if (!validateAnswer((question as Question).type, answer)) return null

  switch ((question as Question).type) {
    case "SBA": {
      return (question as Question<SBA>).content.answer === answer
    }
    case "CBQ": {
      const _question = question as Question<CBQ>;
      return _question.content.every((c, i) => c.answer === answer[i])
    }
    case "ECQ": {
      const _question = question as Question<ECQ>;
      return _question.content.questions.every((c, i) => c.answer === answer[i]);

    }

    default: throw new Error("Unknown question type")
  }

}
