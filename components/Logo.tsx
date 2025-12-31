import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string, showText?: boolean }> = ({ className = "", showText = true }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    console.error('Logo image failed to load');
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('Logo image loaded successfully');
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
        {!imageError ? (
          <img 
            src="/logo.png" 
            alt="Do Stuff Logo" 
            className="w-full h-full object-contain"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Logo
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight text-white">Do Stuff</span>
      )}
    </div>
  );
};