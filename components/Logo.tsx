import React from 'react';

export const Logo: React.FC<{ className?: string, showText?: boolean }> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
        <img 
          src="logo.png" 
          alt="Do Stuff Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight text-white">Do Stuff</span>
      )}
    </div>
  );
};