import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: `bg-white text-black hover:bg-gray-100 ${glow ? 'shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''}`,
    secondary: `bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 ${glow ? 'shadow-[0_0_15px_rgba(139,92,246,0.5)]' : ''}`,
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};