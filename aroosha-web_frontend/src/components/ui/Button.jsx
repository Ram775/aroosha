// src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  icon: Icon, 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-medium rounded-lg
    border
    transition-all duration-150 
    focus:outline-none 
    disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `;
  
  const variants = {
    primary: `
      bg-[var(--color-bg-card)] text-[var(--color-primary)] 
      border-[var(--color-primary)]
      hover:bg-[var(--color-primary-pale)] hover:shadow-sm
    `,
    success: `
      bg-[var(--color-bg-card)] text-emerald-600 
      border-emerald-600
      hover:bg-emerald-50 hover:shadow-sm
    `,
    danger: `
      bg-[var(--color-bg-card)] text-red-600 
      border-red-600
      hover:bg-red-50 hover:shadow-sm
    `,
    warning: `
      bg-[var(--color-bg-card)] text-amber-600 
      border-amber-600
      hover:bg-amber-50 hover:shadow-sm
    `,
    outline: `
      bg-[var(--color-bg-card)] text-[var(--color-text-heading)] 
      border-[var(--color-border)]
      hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-sm
    `,
    ghost: `
      bg-transparent text-[var(--color-text-heading)] 
      border-transparent
      hover:bg-[var(--color-bg-muted)]
    `,
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-[10px]',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {!loading && Icon && <Icon size={14} />}
      {children}
    </button>
  );
};

export default Button;