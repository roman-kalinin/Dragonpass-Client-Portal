import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  divider?: boolean;
  className?: string;
}

export function SectionHeading({ children, divider = true, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">
        {children}
      </h3>
      {divider && <div className="h-px bg-[#e5e7eb] mb-4" />}
    </div>
  );
}
