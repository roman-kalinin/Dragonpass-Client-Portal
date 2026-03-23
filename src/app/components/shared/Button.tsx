import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'pill-active' | 'pill-inactive' | 'text';
  children: ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = "font-['Cabin',sans-serif] transition-colors cursor-pointer focus:outline-none";

  const variants = {
    primary:      `${base} inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0a2333] text-white font-semibold text-[13px] hover:bg-[#152c3c] disabled:opacity-70 disabled:cursor-not-allowed`,
    ghost:        `${base} inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] text-[#45556c] hover:bg-[#f9fafb] bg-white`,
    'pill-active':   `${base} inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#0a2333] text-white text-[13px] font-medium`,
    'pill-inactive': `${base} inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-[#e5e7eb] text-[#45556c] text-[13px] hover:bg-[#f9fafb]`,
    text:         `${base} inline-flex items-center gap-1.5 text-[13px] text-[#0a2333] hover:text-[#152c3c]`,
  };

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
