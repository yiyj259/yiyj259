
import React from 'react';

interface PixelatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-6 py-3 text-lg text-white border-4 border-black uppercase transform transition-transform duration-150 ease-in-out';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-[4px_4px_0px_0px_#000]',
    secondary: 'bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-[4px_4px_0px_0px_#000]',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;
