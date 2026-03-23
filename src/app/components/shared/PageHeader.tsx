import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  borderBottom?: boolean;
  className?: string;
}

export function PageHeader({ title, description, children, borderBottom = false, className = '' }: PageHeaderProps) {
  return (
    <div className={`px-8 pt-5 pb-4 shrink-0 ${borderBottom ? 'border-b border-[#e5e7eb]' : ''} ${className}`}>
      <div className="flex items-center gap-3 mb-0.5">
        <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">{title}</h1>
        {children}
      </div>
      {description && (
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">{description}</p>
      )}
    </div>
  );
}
