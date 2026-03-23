import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, MoreHorizontal, Play, Pause, RotateCcw, Settings, Trash2 } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';
import { Badge } from '../shared/Badge';
import { IconBox } from '../shared/IconBox';
import { useApp } from '../../store';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

interface EntitlementCardProps {
  entitlement: Entitlement;
  onClick: (id: string) => void;
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

function ActionMenu({ entitlement, onAction }: { entitlement: Entitlement; onAction: (action: string) => void }) {
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

export function EntitlementCard({ entitlement, onClick }: EntitlementCardProps) {
  const { dispatch } = useApp();
  const [status, setStatus] = useState(entitlement.status);
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const pct = entitlement.cap ? Math.min(100, (entitlement.used / entitlement.cap) * 100) : 0;
  const showWarning = pct >= 80;
  const warningLabel = pct >= 100 ? 'Cap reached' : pct >= 90 ? '90%+ used — approaching cap' : '80%+ used';

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
          <ActionMenu entitlement={entitlement} onAction={() => {}} />
        </div>
      </div>

      {/* Primary stat: Allocation */}
      <div>
        <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Allocation</div>
        <div className="font-['Cabin',sans-serif] font-bold text-[32px] leading-none text-[#0a2333]">
          {entitlement.allocation.toLocaleString()}
        </div>
        <div className="font-['Cabin',sans-serif] text-[11px] text-[#9ca3af] mt-1">
          Cap: {entitlement.cap ? entitlement.cap.toLocaleString() : 'Unlimited'}
        </div>
      </div>

      {/* Usage bar */}
      <div className="space-y-1.5">
        <UsageBar pct={pct} />
        <div className="flex items-center justify-between">
          <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
            {pct.toFixed(0)}% used
          </span>
          {showWarning && (
            <div className="flex items-center gap-1">
              <AlertTriangle size={10} className="text-amber-600" />
              <span className="font-['Cabin',sans-serif] text-[11px] text-amber-700 font-medium">{warningLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Secondary stats + action */}
      <div className="pt-4 border-t border-[#e5e7eb] flex items-end justify-between gap-4">
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div>
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Used</div>
            <div className="font-['Cabin',sans-serif] font-semibold text-[18px] text-[#0a2333]">
              {entitlement.used.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-1">Remaining</div>
            <div className="font-['Cabin',sans-serif] font-semibold text-[18px] text-[#0a2333]">
              {entitlement.remaining.toLocaleString()}
            </div>
          </div>
        </div>
        <StatusActionButton status={status} onAction={handleStatusAction} />
      </div>
    </div>
  );
}
