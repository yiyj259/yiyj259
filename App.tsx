import React, { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion, IncorrectAnswer } from './types';
import { GameState } from './types';
import { TOTAL_QUESTIONS } from './constants';
import { generateQuizQuestions } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import QuizCard from './components/QuizCard';
import ScoreScreen from './components/ScoreScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
  
  const fetchQuestions = useCallback(async () => {
    setGameState(GameState.LOADING);
    try {
      const newQuestions = await generateQuizQuestions();
      setQuestions(newQuestions);
      setGameState(GameState.READY);
    } catch (error) {
      console.error(error);
      setGameState(GameState.ERROR);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
    fetchQuestions();
  };

  const handleAnswerSelect = (answer: string) => {
    if (gameState !== GameState.READY) return;

    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => [...prev, { question: currentQuestion, userAnswer: answer }]);
    }
    setGameState(GameState.ANSWERED);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setGameState(GameState.READY);
    } else {
      setGameState(GameState.FINISHED);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING:
        return <LoadingSpinner />;
      case GameState.ERROR:
        return (
          <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg">
            <p className="font-bold text-xl">오류가 발생했습니다.</p>
            <p className="mt-2">퀴즈를 불러오는 데 실패했습니다. API 키를 확인하거나 나중에 다시 시도해 주세요.</p>
            <button
              onClick={handleRestart}
              className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              다시 시도
            </button>
          </div>
        );
      case GameState.FINISHED:
        return (
          <ScoreScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            onRestart={handleRestart}
            incorrectAnswers={incorrectAnswers}
          />
        );
      case GameState.READY:
      case GameState.ANSWERED:
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.answer;
        return (
          <div className="w-full flex flex-col items-center">
             <div className="w-full max-w-2xl mb-4">
              <div className="flex justify-between items-center text-slate-600 font-medium mb-2">
                <span>진행도: {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}</span>
                <span>점수: {score}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <QuizCard
              question={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
              selectedAnswer={selectedAnswer}
              gameState={gameState}
            />

            {gameState === GameState.ANSWERED && (
              <div className="mt-8 text-center w-full max-w-2xl animate-fade-in">
                <p className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '정답입니다!' : '오답입니다!'}
                </p>
                
                <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl text-left shadow-sm">
                    <h3 className="text-lg font-bold text-blue-800 mb-2">해설</h3>
                    <p className="text-slate-800 font-semibold mb-2">
                        정답: <span className="font-bold">{currentQuestion.answer}</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        {currentQuestion.explanation}
                    </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="mt-6 bg-slate-800 text-white font-bold py-3 px-10 rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-400 transition-transform transform hover:scale-105"
                >
                  {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? '결과 보기' : '다음 문제'}
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          TEPS 빈출 어휘 퀴즈
        </h1>
        <p className="text-slate-500 mt-2">문맥 속에서 가장 적절한 어휘를 선택하세요.</p>
      </header>
      <main className="w-full flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;