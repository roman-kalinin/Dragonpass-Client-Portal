import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, MoreHorizontal, Play, Pause, RotateCcw, Settings, Trash2, TrendingUp } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';
import { Badge } from '../shared/Badge';
import { IconBox } from '../shared/IconBox';
import { useApp } from '../../store';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

function formatGBP(amount: number) {
  return `£${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

interface EntitlementCardProps {
  entitlement: Entitlement;
  onClick: (id: string) => void;
  onTopUp?: (id: string) => void;
}


function StatusActionButton({ status, onAction }: { status: Entitlement['status']; onAction: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAction();
  };

  if (status === 'active') {
    return (
      <button
        onClick={handleClick}
        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[12px] font-medium text-[#45556c] hover:bg-[#f9fafb] hover:border-[#d1d5db] transition-colors shrink-0"
      >
        <Pause size={12} />
        Pause
      </button>
    );
  }
  if (status === 'paused') {
    return (
      <button
        onClick={handleClick}
        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[12px] font-medium text-white hover:bg-[#152c3c] transition-colors shrink-0"
      >
        <Play size={12} />
        Resume
      </button>
    );
  }
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[12px] font-medium text-white hover:bg-[#152c3c] transition-colors shrink-0"
    >
      <RotateCcw size={12} />
      Restart
    </button>
  );
}

function ActionMenu({ onAction }: { onAction: (action: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(v => !v)}
        className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-md text-[#6a7282] hover:bg-[#f3f4f6] hover:text-[#0a2333] transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-1 overflow-hidden">
          <button
            onClick={() => { onAction('topup'); setOpen(false); }}
            className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
          >
            <TrendingUp size={13} className="text-[#6a7282]" />
            Top up
          </button>
          <button
            onClick={() => { onAction('edit'); setOpen(false); }}
            className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
          >
            <Settings size={13} className="text-[#6a7282]" />
            Edit configuration
          </button>
          <div className="border-t border-[#e5e7eb] my-1" />
          <button
            onClick={() => { onAction('delete'); setOpen(false); }}
            className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#dc2626] hover:bg-[#fff1f1] transition-colors"
          >
            <Trash2 size={13} className="text-[#dc2626]" />
            Remove benefit
          </button>
        </div>
      )}
    </div>
  );
}

function UsageBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? '#dc2626' : pct >= 50 ? '#f59e0b' : '#34d399';
  return (
    <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

export function EntitlementCard({ entitlement, onClick, onTopUp }: EntitlementCardProps) {
  const { dispatch } = useApp();
  const [status, setStatus] = useState(entitlement.status);
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const hasCap = entitlement.cap !== null && entitlement.cap !== undefined;
  const pct = hasCap ? Math.min(100, (entitlement.used / entitlement.cap!) * 100) : 0;
  const showWarning = hasCap && pct >= 80;
  const warningLabel = pct >= 100 ? 'Cap reached' : pct >= 90 ? '90%+ used — approaching cap' : '80%+ used';

  const usedGBP = entitlement.used * entitlement.unitCostGBP;
  const remainingGBP = entitlement.remaining * entitlement.unitCostGBP;
  const allocationGBP = entitlement.allocation * entitlement.unitCostGBP;

  function handleStatusAction() {
    if (status === 'active') {
      setStatus('paused');
      dispatch({ type: 'SET_TOAST', payload: { message: `${entitlement.productName} paused`, type: 'success' } });
    } else if (status === 'paused') {
      setStatus('active');
      dispatch({ type: 'SET_TOAST', payload: { message: `${entitlement.productName} resumed`, type: 'success' } });
    } else {
      setStatus('active');
      dispatch({ type: 'SET_TOAST', payload: { message: `${entitlement.productName} restarted`, type: 'success' } });
    }
  }

  function handleMenuAction(action: string) {
    if (action === 'topup' && onTopUp) {
      onTopUp(entitlement.id);
    }
  }

  return (
    <div
      onClick={() => onClick(entitlement.id)}
      className="cursor-pointer bg-white rounded-xl border border-[#e5e7eb] p-6 hover:border-[#0a2333]/20 hover:shadow-sm transition-all flex flex-col gap-5"
    >
      {/* Header: icon + name + badge + menu */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <IconBox>
            <Icon size={18} className="text-[#0a2333]" />
          </IconBox>
          <div>
            <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] leading-tight">
              {entitlement.productName}
            </h3>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5">
              {entitlement.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant={status === 'active' ? 'active' : status === 'paused' ? 'paused' : 'exhausted'}>
            {status === 'active' ? 'Active' : status === 'paused' ? 'Paused' : 'Exhausted'}
          </Badge>
          <ActionMenu onAction={handleMenuAction} />
        </div>
      </div>

      {/* Primary stat: Allocation */}
      <div>
        <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Allocation</div>
        <div className="flex items-baseline justify-between">
          <div className="font-['Cabin',sans-serif] font-bold text-[32px] leading-none text-[#0a2333]">
            {entitlement.allocation.toLocaleString()}
          </div>
          {hasCap && (
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#9ca3af]">
              Cap: {entitlement.cap!.toLocaleString()}
            </div>
          )}
        </div>
        <div className="font-['Cabin',sans-serif] text-[13px] text-[#586e7d] mt-0.5">
          {formatGBP(allocationGBP)}
        </div>
      </div>

      {/* Usage bar */}
      {hasCap ? (
        <div className="space-y-1.5">
          <UsageBar pct={pct} />
          <div className="flex items-center justify-between">
            <span className={`font-['Cabin',sans-serif] text-[11px] font-medium ${pct >= 90 ? 'text-[#dc2626]' : pct >= 80 ? 'text-amber-600' : 'text-[#6a7282]'}`}>
              {pct.toFixed(0)}% used
              {showWarning && (
                <> — {pct >= 100 ? 'cap reached' : 'approaching cap'}</>
              )}
            </span>
            {showWarning && <AlertTriangle size={10} className={pct >= 90 ? 'text-[#dc2626]' : 'text-amber-600'} />}
          </div>
        </div>
      ) : (
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#34d399]" style={{ width: '100%', opacity: 0.3 }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
              {entitlement.used.toLocaleString()} used
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#f1f5f9] text-[#586e7d]">
              ∞
            </span>
          </div>
        </div>
      )}

      {/* Secondary stats + action */}
      <div className="pt-4 border-t border-[#e5e7eb] flex items-end justify-between gap-4">
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div>
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Used</div>
            <div className="font-['Cabin',sans-serif] font-semibold text-[18px] text-[#0a2333]">
              {entitlement.used.toLocaleString()}
            </div>
            <div className="font-['Cabin',sans-serif] text-[13px] text-[#586e7d]">
              {formatGBP(usedGBP)}
            </div>
          </div>
          <div>
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Remaining</div>
            <div className="font-['Cabin',sans-serif] font-semibold text-[18px] text-[#0a2333]">
              {entitlement.remaining.toLocaleString()}
            </div>
            <div className="font-['Cabin',sans-serif] text-[13px] text-[#586e7d]">
              {formatGBP(remainingGBP)}
            </div>
          </div>
        </div>
        <StatusActionButton status={status} onAction={handleStatusAction} />
      </div>
    </div>
  );
}
