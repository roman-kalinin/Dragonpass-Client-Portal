import { AlertTriangle, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, ChevronRight } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

interface EntitlementCardProps {
  entitlement: Entitlement;
  onManage: (id: string) => void;
}

function getThresholdInfo(pct: number) {
  if (pct >= 100) return { color: 'bg-red-600', label: 'Cap reached', showWarning: true };
  if (pct >= 90) return { color: 'bg-red-600', label: '90%+ used — approaching cap', showWarning: true };
  if (pct >= 80) return { color: 'bg-amber-500', label: '80%+ used', showWarning: true };
  if (pct >= 50) return { color: 'bg-amber-500', label: null, showWarning: false };
  return { color: 'bg-green-600', label: null, showWarning: false };
}

export function EntitlementCard({ entitlement, onManage }: EntitlementCardProps) {
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const pct = entitlement.cap ? Math.min(100, (entitlement.used / entitlement.cap) * 100) : 0;
  const { color, label, showWarning } = getThresholdInfo(pct);

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
            <Icon size={18} className="text-[#0a2333]" />
          </div>
          <div>
            <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333]">
              {entitlement.productName}
            </h3>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
              {entitlement.description}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] ${
          entitlement.status === 'active' ? 'bg-[#dcfce7] text-[#166534]' :
          entitlement.status === 'paused' ? 'bg-[#FEF3C7] text-[#92400E]' :
          'bg-[#fee2e2] text-[#991b1b]'
        }`}>
          {entitlement.status === 'active' ? 'Active' : entitlement.status === 'paused' ? 'Paused' : 'Exhausted'}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Allocation</div>
          <div className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">
            {entitlement.allocation.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Used</div>
          <div className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">
            {entitlement.used.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Remaining</div>
          <div className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">
            {entitlement.remaining.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${color}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
            {pct.toFixed(1)}%
          </span>
          {showWarning && label && (
            <div className="flex items-center gap-1">
              <AlertTriangle size={11} className="text-amber-600" />
              <span className="font-['Cabin',sans-serif] text-[11px] text-amber-700 font-medium">
                {label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
        <span className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
          Cap: {entitlement.cap ? entitlement.cap.toLocaleString() : 'Unlimited'}
        </span>
        <button
          onClick={() => onManage(entitlement.id)}
          className="inline-flex items-center gap-1 font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:text-[#152c3c] transition-colors"
        >
          Manage
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
