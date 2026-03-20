import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
}

export function Button({ children, className = "", variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 font-mono text-xs uppercase border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  const variants = {
    primary: "bg-neon-green text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-400",
    outline: "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
