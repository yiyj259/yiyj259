
import React from 'react';

interface PixelatedContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PixelatedContainer: React.FC<PixelatedContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 border-4 border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default PixelatedContainer;
