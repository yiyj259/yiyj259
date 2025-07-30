
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-700 border-2 border-gray-500 h-8 p-1 my-4">
      <div
        className="bg-yellow-400 h-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
       <span className="absolute w-full text-center -mt-7 text-white mix-blend-difference text-sm">
         {current} / {total}
       </span>
    </div>
  );
};

export default ProgressBar;
