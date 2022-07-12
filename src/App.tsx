// Imported Components
import React, { useState } from "react";
import { Difficulty, fetchQuestions, QuestionState } from "./api";
import QuestionCards from "./components/QuestionCards";
import { GlobalStyle, Wrapper } from "./App.styles";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setloading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.easy));

  const startQuestion = async () => {
    setloading(true);
    setGameOver(false);

    const newQuestion = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.easy);
    try {
      setQuestions(newQuestion);
    } catch (err: any) {
      console.log(err.message);
    }

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setloading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;

      // check answer if its correct or not and add score
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((pre) => pre + 1);

      const answerObj: any = {
        question: questions[number].question,
        answer,
        correct,
        corrctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  // next question
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    setNumber(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>QUIZ APP</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuestion}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p>Score:{score}</p> : null}
        {loading && <p>Loading Question...</p>}
        {!loading && !gameOver && (
          <QuestionCards
            question={questions[number].question}
            answers={questions[number].answers}
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
