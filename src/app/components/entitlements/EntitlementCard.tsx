import { useState, useRef, useEffect } from 'react';
import { Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, MoreHorizontal, Play, Pause, RotateCcw, Settings, Trash2, TrendingUp } from 'lucide-react';
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

function DonutArc({ pct, size = 48, unlimited = false }: { pct: number; size?: number; unlimited?: boolean }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = Math.min(pct / 100, 1) * circumference;
  const isComplete = pct >= 100;
  const isWarning = pct >= 80 && pct < 100;
  const color = isComplete ? '#34d399' : isWarning ? '#f59e0b' : '#34d399';

  if (unlimited) {
    return (
      <div className="shrink-0 relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="22" height="14" viewBox="-1 -1 26 14" fill="none">
            {/* dim base path */}
            <path
              d="M12 6C12 6 9.5 1 5.5 1C2.46 1 0 3.24 0 6C0 8.76 2.46 11 5.5 11C9.5 11 12 6 12 6ZM12 6C12 6 14.5 11 18.5 11C21.54 11 24 8.76 24 6C24 3.24 21.54 1 18.5 1C14.5 1 12 6 12 6Z"
              stroke="#e5e7eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* animated snake */}
            <path
              d="M12 6C12 6 9.5 1 5.5 1C2.46 1 0 3.24 0 6C0 8.76 2.46 11 5.5 11C9.5 11 12 6 12 6ZM12 6C12 6 14.5 11 18.5 11C21.54 11 24 8.76 24 6C24 3.24 21.54 1 18.5 1C14.5 1 12 6 12 6Z"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                strokeDasharray: '20 46',
                strokeDashoffset: 0,
                animation: 'infinitySnake 2s linear infinite',
              }}
            />
            <style>{`
              @keyframes infinitySnake {
                from { stroke-dashoffset: 0; }
                to   { stroke-dashoffset: -66; }
              }
            `}</style>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {isComplete ? (
        <>
          <circle cx={cx} cy={cy} r={r - 4} fill="#34d399" />
          <path
            d={`M${cx - 7} ${cy} l5 5 l9 -9`}
            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
        </>
      ) : (
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6a7282" fontFamily="Cabin, sans-serif">
          {pct.toFixed(0)}%
        </text>
      )}
    </svg>
  );
}

export function EntitlementCard({ entitlement, onClick, onTopUp }: EntitlementCardProps) {
  const { dispatch } = useApp();
  const [status, setStatus] = useState(entitlement.status);
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const hasCap = entitlement.cap !== null && entitlement.cap !== undefined;
  const pct = hasCap ? Math.min(100, (entitlement.used / entitlement.cap!) * 100) : 0;

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
      className="group cursor-pointer bg-white rounded-xl border border-[#e5e7eb] p-6 hover:border-[#0a2333]/20 hover:shadow-sm transition-all flex flex-col justify-between"
    >
      {/* Header: icon + name/badge + action button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <IconBox>
            <Icon size={18} className="text-[#0a2333]" />
          </IconBox>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] leading-tight truncate">
                {entitlement.productName}
              </h3>
              <Badge variant={status === 'active' ? 'active' : status === 'paused' ? 'paused' : 'exhausted'}>
                {status === 'active' ? 'Active' : status === 'paused' ? 'Paused' : 'Completed'}
              </Badge>
            </div>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5 truncate">
              {entitlement.description}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <ActionMenu onAction={handleMenuAction} />
        </div>
      </div>

      {/* Hero: donut + fraction */}
      <div className="flex items-center gap-4 py-8">
        {hasCap ? (
          <DonutArc pct={pct} />
        ) : (
          <DonutArc pct={0} unlimited />
        )}
        <div className="flex items-center gap-2">
          <div className="font-['Cabin',sans-serif] font-bold text-[32px] leading-none text-[#0a2333] tracking-tight">
            {entitlement.used.toLocaleString()}
          </div>
          {hasCap ? (
            <div className="font-['Cabin',sans-serif] text-[14px] text-[#9ca3af] leading-none">
              / {entitlement.allocation.toLocaleString()} used
            </div>
          ) : (
            <div className="font-['Cabin',sans-serif] text-[14px] text-[#9ca3af] leading-none">
              of unlimited
            </div>
          )}
        </div>
      </div>

      {/* Footer: divider + money + action */}
      <div className="-mx-6 -mb-6 px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <div className="font-['Cabin',sans-serif] font-semibold text-[12px] text-[#0a2333]">
            {formatGBP(usedGBP)}
          </div>
          {hasCap && (
            <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
              / {formatGBP(allocationGBP)}
            </div>
          )}
          <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
            · {formatGBP(remainingGBP)} left
          </div>
        </div>
        <StatusActionButton status={status} onAction={handleStatusAction} />
      </div>
    </div>
  );
}
