
import React from 'react';
import PixelatedButton from './PixelatedButton';
import PixelatedContainer from './PixelatedContainer';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <PixelatedContainer className="text-center">
      <h1 className="text-3xl sm:text-5xl text-yellow-400 mb-4 tracking-wider">8-BIT MBTI QUEST</h1>
      <p className="text-lg text-gray-300 mb-8">당신의 진짜 성격을 찾아 떠나는 픽셀 모험!</p>
      <PixelatedButton onClick={onStart} variant="primary">
        시작하기
      </PixelatedButton>
    </PixelatedContainer>
  );
};

export default StartScreen;
