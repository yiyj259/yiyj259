import React from 'react';
import type { IncorrectAnswer } from '../types';

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  incorrectAnswers: IncorrectAnswer[];
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, totalQuestions, onRestart, incorrectAnswers }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = "";
  if (percentage === 100) {
    message = "완벽해요! TEPS 고수시네요!";
  } else if (percentage >= 80) {
    message = "훌륭합니다! 조금만 더 힘내세요!";
  } else if (percentage >= 50) {
    message = "잘하셨어요! 복습은 필수!";
  } else {
    message = "아쉽네요. 다시 도전해보세요!";
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">퀴즈 완료!</h2>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="relative w-40 h-40 mb-6">
          <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                  className="text-slate-200"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
              />
              <path
                  className="text-blue-500"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${percentage}, 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
              />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">{score}</span>
              <span className="text-lg text-slate-500">/ {totalQuestions}</span>
          </div>
        </div>
        <p className="text-lg font-medium text-slate-700 mb-8">정답률: {percentage}%</p>
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
        >
          새로운 퀴즈 시작하기
        </button>
      </div>

      {incorrectAnswers.length > 0 && (
        <div className="mt-12 w-full text-left animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">틀린 문제 다시보기</h3>
          <div className="space-y-6">
            {incorrectAnswers.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-md">
                <p className="font-semibold text-slate-700 mb-3 text-base leading-relaxed">
                  <span className="font-bold text-slate-500 mr-2">{index + 1}.</span> 
                  {item.question.sentence.replace('______', ' ______ ')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                    <div className="bg-red-50 border border-red-200 p-2 rounded-md">
                      <span className="font-normal text-slate-500">내 오답: </span> 
                      <span className="font-bold text-red-600">{item.userAnswer}</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-2 rounded-md">
                      <span className="font-normal text-slate-500">정답: </span> 
                      <span className="font-bold text-green-700">{item.question.answer}</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">해설</h4>
                    <p className="text-sm text-slate-600 leading-snug">{item.question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreScreen;