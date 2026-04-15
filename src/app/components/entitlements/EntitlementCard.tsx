import { Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';
import { Badge } from '../shared/Badge';
import { IconBox } from '../shared/IconBox';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

interface EntitlementCardProps {
  entitlement: Entitlement;
  onClick: (id: string) => void;
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
            <path
              d="M12 6C12 6 9.5 1 5.5 1C2.46 1 0 3.24 0 6C0 8.76 2.46 11 5.5 11C9.5 11 12 6 12 6ZM12 6C12 6 14.5 11 18.5 11C21.54 11 24 8.76 24 6C24 3.24 21.54 1 18.5 1C14.5 1 12 6 12 6Z"
              stroke="#e5e7eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
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

export function EntitlementCard({ entitlement, onClick }: EntitlementCardProps) {
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const hasCap = entitlement.cap !== null && entitlement.cap !== undefined;
  const pct = hasCap ? Math.min(100, (entitlement.used / entitlement.cap!) * 100) : 0;
  const status = entitlement.status;

  return (
    <div
      onClick={() => onClick(entitlement.id)}
      className="group cursor-pointer bg-white rounded-xl border border-[#e5e7eb] p-6 hover:border-[#0a2333]/20 hover:shadow-sm transition-all flex flex-col justify-between"
    >
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
      </div>

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

      <div className="-mx-6 -mb-6 px-6 py-4 border-t border-[#e5e7eb] flex items-baseline gap-1.5">
        <div className="font-['Cabin',sans-serif] font-semibold text-[12px] text-[#0a2333]">
          {entitlement.remaining.toLocaleString()} remaining
        </div>
        {hasCap && (
          <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
            of {entitlement.allocation.toLocaleString()} total
          </div>
        )}
      </div>
    </div>
  );
}
