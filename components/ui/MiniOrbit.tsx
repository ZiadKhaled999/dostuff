import React from 'react';

export const MiniOrbit: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-12 h-12 flex items-center justify-center ${className}`}>
      {/* Core */}
      <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />
      
      {/* Ring 1 */}
      <div className="absolute inset-0 rounded-full border border-brand-purple/60 border-t-white/80 animate-[spin_3s_linear_infinite]" 
           style={{ transform: 'rotateX(70deg) rotateY(10deg)' }} />
           
      {/* Ring 2 */}
      <div className="absolute inset-0 rounded-full border border-brand-glow/40 border-b-white/50 animate-[spin_4s_linear_infinite_reverse]" 
           style={{ transform: 'rotateX(70deg) rotateY(-50deg)' }} />
           
      {/* Ring 3 */}
       <div className="absolute inset-2 rounded-full border border-indigo-500/30 animate-[spin_5s_linear_infinite]" />
    </div>
  );
};