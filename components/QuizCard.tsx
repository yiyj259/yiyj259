import React from 'react';
import type { QuizQuestion } from '../types';
import { GameState } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  gameState: GameState;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswerSelect, selectedAnswer, gameState }) => {
  
  const getButtonClass = (option: string) => {
    if (gameState !== GameState.ANSWERED) {
      return `bg-white hover:bg-slate-200 focus:ring-blue-400`;
    }
    
    const isCorrectAnswer = option === question.answer;
    const isSelectedAnswer = option === selectedAnswer;

    if (isCorrectAnswer) {
      return 'bg-green-500 text-white border-green-600 transform scale-105';
    }
    if (isSelectedAnswer) { // and it's incorrect
      return 'bg-red-500 text-white border-red-600';
    }
    return 'bg-white opacity-60 cursor-not-allowed';
  };

  return (
    <div className="w-full max-w-2xl">
      <p className="text-center text-xl md:text-2xl font-semibold text-slate-700 leading-relaxed mb-8">
        {question.sentence.replace('______', ' ______ ')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            disabled={gameState === GameState.ANSWERED}
            className={`w-full p-4 rounded-lg shadow-md border-2 border-slate-200 text-slate-800 text-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
