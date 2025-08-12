import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-slate-600 text-lg font-medium">퀴즈를 생성하고 있습니다...</p>
      <p className="text-slate-500 text-sm">잠시만 기다려 주세요.</p>
    </div>
  );
};

export default LoadingSpinner;
