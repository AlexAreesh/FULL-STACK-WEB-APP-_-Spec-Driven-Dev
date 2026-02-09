'use client';

import { Heart, Star, ThumbsUp } from 'lucide-react';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
  className?: string;
}

export default function InteractiveButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = ''
}: InteractiveButtonProps) {
  // Define variant classes
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-400 text-white',
    secondary: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800',
    success: 'bg-success-500 hover:bg-success-400 text-white',
    danger: 'bg-danger-500 hover:bg-danger-400 text-white',
    warning: 'bg-warning-500 hover:bg-warning-400 text-white',
  };

  // Define size classes
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-all
        duration-200
        ease-in-out
        transform
        hover:scale-105
        opacity-90
        hover:opacity-100
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-500
        ${className}
      `}
    >
      <div className="flex items-center justify-center">
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </div>
    </button>
  );
}

// Example component to demonstrate micro-interactions
export function CheckboxWithBounce({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <div 
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${checked 
            ? 'bg-success-500 border-success-500' 
            : 'border-neutral-300 group-hover:border-primary-400'}
          transition-all duration-300 ease-out
          transform
          ${checked ? 'scale-110' : ''}
          checkbox-bounce
        `}
        onClick={(e) => {
          e.preventDefault();
          onChange();
        }}
      >
        {checked && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>}
      </div>
      <span className={`ml-2 ${checked ? 'text-neutral-500 line-through' : 'text-neutral-700'}`}>{label}</span>
    </label>
  );
}