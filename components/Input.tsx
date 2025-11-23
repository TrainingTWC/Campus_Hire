import React from 'react';
import { InputProps } from '../types';
import { AlertCircle } from 'lucide-react';

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  id,
  className = '',
  ...props 
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label 
        htmlFor={inputId} 
        className="text-sm font-medium text-slate-700 ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          {icon}
        </div>
        <input
          id={inputId}
          className={`
            w-full rounded-lg border px-4 py-2.5 pl-10 text-slate-900 placeholder-slate-400 
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50' 
              : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100 hover:border-slate-300'
            }
            disabled:bg-slate-100 disabled:text-slate-500
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500 animate-in fade-in zoom-in duration-200">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600 ml-1 animate-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};