import type { ReactNode } from 'react';

interface IconBoxProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export function IconBox({ children, size = 'md', className = '' }: IconBoxProps) {
  const dims = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  return (
    <div className={`${dims} rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0 ${className}`}>
      {children}
    </div>
  );
}
