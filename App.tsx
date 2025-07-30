import React, { useState, useCallback } from 'react';
import { QUESTIONS } from './constants';
import { getMbtiAnalysis } from './services/geminiService';
import type { GameState, MbtiScores, MbtiType, AnswerOption } from './types';
import { MbtiDimension } from './types';

import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import PixelatedContainer from './components/PixelatedContainer';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<MbtiScores>({
    [MbtiDimension.IE]: 0,
    [MbtiDimension.SN]: 0,
    [MbtiDimension.TF]: 0,
    [MbtiDimension.JP]: 0,
  });
  const [mbtiResult, setMbtiResult] = useState<MbtiType | null>(null);
  const [analysis, setAnalysis] = useState<string>('');

  const handleStart = () => {
    setGameState('playing');
  };
  
  const handleRestart = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScores({ IE: 0, SN: 0, TF: 0, JP: 0 });
    setMbtiResult(null);
    setAnalysis('');
  };

  const calculateResult = useCallback(async () => {
    setGameState('loading');
    let result = '';
    result += scores.IE > 0 ? 'E' : 'I';
    result += scores.SN > 0 ? 'S' : 'N';
    result += scores.TF > 0 ? 'T' : 'F';
    result += scores.JP > 0 ? 'J' : 'P';
    
    setMbtiResult(result);

    const aiAnalysis = await getMbtiAnalysis(result);
    setAnalysis(aiAnalysis);
    setGameState('result');
  }, [scores]);

  const handleAnswer = useCallback((option: AnswerOption) => {
    const { dimension, score } = option.value;
    setScores(prevScores => ({
      ...prevScores,
      [dimension]: prevScores[dimension] + score,
    }));

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      calculateResult();
    }
  }, [currentQuestionIndex, calculateResult]);
  
  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'playing':
        return (
          <QuestionScreen
            question={QUESTIONS[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
          />
        );
      case 'loading':
        return (
          <PixelatedContainer className="text-center">
            <h2 className="text-3xl text-yellow-400 animate-pulse">분석 중...</h2>
            <p className="mt-4 text-gray-300">당신의 성격 유형을 우주에서 가져오는 중!</p>
          </PixelatedContainer>
        );
      case 'result':
        if (mbtiResult && analysis) {
          return <ResultScreen mbtiType={mbtiResult} analysis={analysis} onRestart={handleRestart} />;
        }
        return null; // Should not happen
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <main className="flex-grow w-full flex items-center justify-center">
        {renderContent()}
      </main>
      <footer className="text-center text-gray-400 text-xs py-2">
        &copy; 2025 이영주
      </footer>
    </div>
  );
};

export default App;
