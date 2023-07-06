import { CBQ, ECQ, Question, SBA } from "../interfaces/exam";

const salt = crypto.randomUUID();
const options = new Array(4)
  .fill(null)
  .map((_, count) => `Option ${count + 1}`);
const explanation = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus augue libero, feugiat at nisi in, egestas ultricies felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur, nulla ut faucibus vehicula, massa lectus luctus magna, nec egestas leo enim vel erat. Aenean placerat ipsum sit amet enim venenatis, eu.
  `;

export const categories: string[] = ["Medicine", "Cardiology", "Respiratory"];

const SBAQuestions: Question<SBA>[] = Array.from("123", (v) => {
  const answer = options.at(
    Math.floor(Math.random() * options.length)
  ) as string;
  return {
    id: salt + v,
    type: "SBA",
    category: categories.at(
      Math.floor(Math.random() * categories.length)
    ) as string,
    topic: "Diagnostic",
    content: {
      question: `Question ${v} - Answer is ${answer}`,
      answer,
      options,
    },
    explanation
  };
});

const ECQQuestions: Question<ECQ>[] = Array.from("456", (v) => {
  const questions: {
    question: string;
    answer: string;
  }[] = [];

  for (let i = 0; i < 3; i++) {
    const answer = options.at(
      Math.floor(Math.random() * options.length)
    ) as string;

    questions.push({
      answer,
      question: `Question ${i} - Answer is ${answer}`,
    });
  }

  return {
    id: salt + v,
    type: "ECQ",
    category: categories.at(
      Math.floor(Math.random() * categories.length)
    ) as string,
    topic: "Diagnostic",
    content: {
      questions,
      options,
    },
    explanation,
  };
});

const CBQQuestions: Question<CBQ>[] = Array.from("789", (v) => {
  const questions: SBA[] = [];

  for (let i = 0; i < 3; i++) {
    const answer = options.at(
      Math.floor(Math.random() * options.length)
    ) as string;

    questions.push({
      answer,
      options,
      question: `Case ${i}... Question - Answer is ${answer}`,
    });
  }

  return {
    id: salt + v,
    type: "CBQ",
    category: categories.at(
      Math.floor(Math.random() * categories.length)
    ) as string,
    topic: "Diagnostic",
    content: questions,
    explanation,
  };
});

export const questions: Question<any>[] = [
  ...CBQQuestions,
  ...SBAQuestions,
  ...ECQQuestions,
].sort((a, b) => 0.5 - Math.random());
