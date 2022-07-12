import React from "react";

import { Wrapper, ButtonWrapper } from "./QuestionCards.style";

type Props = {
  question: string;
  answers: string[];
  questionNum: number;
  totalQuestions: number;
  userAnswer: any;
  callback: any;
};

const QuestionCards: React.FC<Props> = ({
  question,
  answers,
  questionNum,
  totalQuestions,
  userAnswer,
  callback,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCards;
