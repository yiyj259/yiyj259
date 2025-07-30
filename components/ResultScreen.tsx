
import React from 'react';
import type { MbtiType } from '../types';
import PixelatedButton from './PixelatedButton';
import PixelatedContainer from './PixelatedContainer';

interface ResultScreenProps {
  mbtiType: MbtiType;
  analysis: string;
  onRestart: () => void;
}

const formatAnalysis = (text: string) => {
    // Basic markdown-to-HTML conversion for the 8-bit style
    return text
        .replace(/### (.*?)\n/g, '<h3 class="text-2xl text-yellow-400 mt-6 mb-3">$1</h3>')
        .replace(/\*\*([^*]+?)\*\*/g, '<strong class="text-green-400">$1</strong>')
        .replace(/-\s(.*?)\n/g, '<li class="ml-5 mb-2 list-disc">$1</li>')
        .replace(/(\n){2,}/g, '\n') // Remove extra newlines
        .trim();
}

const ResultScreen: React.FC<ResultScreenProps> = ({ mbtiType, analysis, onRestart }) => {
  const formattedAnalysis = formatAnalysis(analysis);
  return (
    <PixelatedContainer className="w-full max-w-3xl">
      <h2 className="text-2xl text-center text-gray-300 mb-2">분석 완료! 당신의 타입은...</h2>
      <p className="text-5xl text-center font-bold text-yellow-400 mb-6">{mbtiType}</p>
      <div className="bg-gray-900 border-2 border-gray-600 p-4 text-left text-base leading-relaxed h-96 overflow-y-auto">
         <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />
      </div>
      <div className="text-center mt-8">
        <PixelatedButton onClick={onRestart} variant="primary">
          다시하기
        </PixelatedButton>
      </div>
    </PixelatedContainer>
  );
};

export default ResultScreen;
