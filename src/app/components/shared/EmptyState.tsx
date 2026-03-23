import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, children, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className="text-center max-w-[400px]">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-2">{title}</h2>
        <p className="font-['Cabin',sans-serif] text-[14px] text-[#6a7282] mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
}
