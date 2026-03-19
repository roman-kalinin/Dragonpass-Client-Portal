import { AlertTriangle, X } from 'lucide-react';
import { useEnvironment } from '../../contexts/EnvironmentContext';

export function TestModeBanner() {
  const { isTestMode, bannerDismissed, dismissBanner } = useEnvironment();

  if (!isTestMode || bannerDismissed) return null;

  return (
    <div className="bg-[#FEF3C7] border-b border-[#F59E0B] px-6 py-2.5 flex items-center justify-between shrink-0 z-10">
      <div className="flex items-center gap-2">
        <AlertTriangle size={14} className="text-[#D97706]" />
        <span className="font-['Cabin',sans-serif] text-[13px] text-[#92400E] font-medium">
          You are viewing test data
        </span>
      </div>
      <button
        onClick={dismissBanner}
        className="flex items-center gap-1 font-['Cabin',sans-serif] text-[12px] text-[#92400E] hover:text-[#78350F] transition-colors"
      >
        Dismiss
        <X size={12} />
      </button>
    </div>
  );
}
