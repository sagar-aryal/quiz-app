export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}
export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const endpoints = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoints)).json();
  //console.log(data);
  return data.results.map((arr: Question) => ({
    ...arr,
    answers: [...arr.incorrect_answers, arr.correct_answer].sort(
      () => Math.random() - 0.5
    ),
  }));
};
