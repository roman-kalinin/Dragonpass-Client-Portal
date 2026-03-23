import type { ReactNode } from 'react';

interface ComingSoonProps {
  icon: ReactNode;
  message: string;
  className?: string;
}

export function ComingSoon({ icon, message, className = '' }: ComingSoonProps) {
  return (
    <div className={`bg-[#f9fafb] border border-[#e5e7eb] border-dashed rounded-xl p-12 flex items-center justify-center ${className}`}>
      <div className="text-center">
        {icon}
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#9ca3af]">{message}</p>
      </div>
    </div>
  );
}
