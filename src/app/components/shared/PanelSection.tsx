import type { ReactNode } from 'react';

interface PanelSectionProps {
  icon: React.ElementType;
  title: string;
  children: ReactNode;
}

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export function PanelSectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={14} className="text-[#45556c]" />
      <span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#45556c] uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between items-start py-1.5">
      <span className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] min-w-[120px]">{label}</span>
      <span className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333] text-right font-medium">{value}</span>
    </div>
  );
}

export function PanelSection({ icon, title, children }: PanelSectionProps) {
  return (
    <div className="px-5 py-4 border-t border-[#e5e7eb]">
      <PanelSectionHeader icon={icon} title={title} />
      {children}
    </div>
  );
}
