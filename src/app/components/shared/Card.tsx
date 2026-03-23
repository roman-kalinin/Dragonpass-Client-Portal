import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const pad = padding === 'sm' ? 'p-4' : 'p-5';
  return (
    <div className={`bg-white rounded-xl border border-[#e5e7eb] ${pad} ${className}`}>
      {children}
    </div>
  );
}
