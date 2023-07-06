export type QuestionType = "SBA" | "CBQ" | "ECQ";

export type SBA = {
  question: string;
  options: string[];
  answer: string;
};

export type CBQ = SBA[];

export type ECQ = {
  questions: {
    question: string;
    answer: string;
  }[];
  options: string[];
};

export interface Question<T = SBA> {
  id: string;
  type: QuestionType;
  category: string;
  topic: string;
  content: T;
  explanation: string
}

export type AnswerResponseSBA = boolean;
export type AnswerResponseCBQ = boolean[];
export type AnswerResponseECQ = boolean[];

export type AnswerResponse = AnswerResponseSBA | AnswerResponseCBQ | AnswerResponseECQ;

export type AnswerSBA = string
export type AnswerCBQ = string[]
export type AnswerECQ = string[]

export type Answer = AnswerSBA | AnswerCBQ | AnswerECQ
