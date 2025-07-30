
import React from 'react';
import type { Question, AnswerOption } from '../types';
import { QUESTIONS } from '../constants';
import PixelatedButton from './PixelatedButton';
import PixelatedContainer from './PixelatedContainer';
import ProgressBar from './ProgressBar';

interface QuestionScreenProps {
  question: Question;
  currentQuestionIndex: number;
  onAnswer: (option: AnswerOption) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, currentQuestionIndex, onAnswer }) => {
  return (
    <PixelatedContainer className="w-full max-w-2xl">
      <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
      <h2 className="text-xl sm:text-2xl text-center text-yellow-300 my-8 min-h-[6rem] flex items-center justify-center">{question.question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <PixelatedButton onClick={() => onAnswer(question.options[0])} variant="secondary">
          {question.options[0].text}
        </PixelatedButton>
        <PixelatedButton onClick={() => onAnswer(question.options[1])} variant="secondary">
          {question.options[1].text}
        </PixelatedButton>
      </div>
    </PixelatedContainer>
  );
};

export default QuestionScreen;
