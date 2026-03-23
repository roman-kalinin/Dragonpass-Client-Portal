import { useState } from 'react';
import { ArrowLeft, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, AlertTriangle, Pause, Play, RotateCcw } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';
import { Badge } from '../shared/Badge';
import { IconBox } from '../shared/IconBox';
import { PageShell } from '../shared/PageShell';
import { useApp } from '../../store';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

function getPieColor(pct: number) {
  if (pct >= 90) return '#dc2626';
  if (pct >= 50) return '#f59e0b';
  return '#34d399';
}

function UsageRing({ pct }: { pct: number }) {
  const r = 28;
  const cx = 36;
  const cy = 36;
  const circumference = 2 * Math.PI * r;
  const color = getPieColor(pct);

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy - 3} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0a2333">
        {pct.toFixed(0)}%
      </text>
      <text x={cx} y={cx + 10} textAnchor="middle" fontSize="8" fill="#6a7282">
        used
      </text>
    </svg>
  );
}

function UsageBar({ pct }: { pct: number }) {
  const color = getPieColor(pct);
  return (
    <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

interface EntitlementDetailPageProps {
  entitlement: Entitlement;
  activeView: string;
  onNavigate: (id: string) => void;
  onBack: () => void;
}

export function EntitlementDetailPage({ entitlement, activeView, onNavigate, onBack }: EntitlementDetailPageProps) {
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
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-[1440px] mx-auto">

        {/* Page header */}
        <div className="px-8 pt-5 pb-5 border-b border-[#e5e7eb] shrink-0">
          <button
            onClick={onBack}
            className="cursor-pointer inline-flex items-center gap-1.5 font-['Cabin',sans-serif] text-[12px] text-[#6a7282] hover:text-[#0a2333] transition-colors mb-4"
          >
            <ArrowLeft size={13} />
            Back to Benefits
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IconBox>
                <Icon size={20} className="text-[#0a2333]" />
              </IconBox>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">{entitlement.productName}</h1>
                  <Badge variant={status === 'active' ? 'active' : status === 'paused' ? 'paused' : 'exhausted'}>
                    {status === 'active' ? 'Active' : status === 'paused' ? 'Paused' : 'Exhausted'}
                  </Badge>
                </div>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">{entitlement.description}</p>
              </div>
              {/* Status action */}
              {status === 'active' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] font-medium text-[#45556c] hover:bg-[#f9fafb] transition-colors">
                  <Pause size={13} />
                  Pause benefit
                </button>
              )}
              {status === 'paused' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[13px] font-medium text-white hover:bg-[#152c3c] transition-colors">
                  <Play size={13} />
                  Resume benefit
                </button>
              )}
              {status === 'exhausted' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[13px] font-medium text-white hover:bg-[#152c3c] transition-colors">
                  <RotateCcw size={13} />
                  Restart benefit
                </button>
              )}
            </div>

            {/* Key stats inline */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Allocation</div>
                <div className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333] leading-tight">{entitlement.allocation.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Used</div>
                <div className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333] leading-tight">{entitlement.used.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Remaining</div>
                <div className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333] leading-tight">{entitlement.remaining.toLocaleString()}</div>
              </div>
              <UsageRing pct={pct} />
            </div>
          </div>

          {/* Usage bar */}
          <div className="mt-4 space-y-1.5">
            <UsageBar pct={pct} />
            <div className="flex items-center justify-between">
              <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
                Cap: {entitlement.cap ? entitlement.cap.toLocaleString() : 'Unlimited'}
              </span>
              {showWarning && (
                <div className="flex items-center gap-1">
                  <AlertTriangle size={11} className="text-amber-600" />
                  <span className="font-['Cabin',sans-serif] text-[11px] text-amber-700 font-medium">{warningLabel}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body: 2 col */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="grid grid-cols-2 gap-6 h-full">

            {/* Cap Configuration */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-5">
                Cap Configuration
              </h4>
              <div className="space-y-5">
                <div>
                  <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                    Usage cap
                  </label>
                  <input
                    type="number"
                    defaultValue={entitlement.cap || ''}
                    className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
                  />
                </div>
                <div>
                  <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-2">
                    Alert thresholds
                  </label>
                  <div className="space-y-2.5">
                    {[50, 80, 90, 100].map(threshold => (
                      <label key={threshold} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={entitlement.alertThresholds.thresholds.includes(threshold)}
                          className="rounded border-[#d1d5db] text-[#0a2333] focus:ring-[#0a2333]"
                        />
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
                          {threshold}% usage
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                    Alert recipients
                  </label>
                  <input
                    type="text"
                    defaultValue={entitlement.alertThresholds.recipients.join(', ')}
                    className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
                  />
                </div>
                <button className="cursor-pointer w-full h-9 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-5">
                Recent Activity
              </h4>
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 bg-[#f9fafb] border-b border-[#e5e7eb]">
                  <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Reference</span>
                  <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Customer</span>
                  <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Status</span>
                </div>
                {[
                  { date: '17 Mar 2026', ref: 'PSS-001234', customer: 'J. Harrison' },
                  { date: '16 Mar 2026', ref: 'PSS-001233', customer: 'S. Mitchell' },
                  { date: '15 Mar 2026', ref: 'PSS-001232', customer: 'D. Chen' },
                  { date: '14 Mar 2026', ref: 'PSS-001231', customer: 'A. Patel' },
                  { date: '13 Mar 2026', ref: 'PSS-001230', customer: 'L. Kim' },
                  { date: '12 Mar 2026', ref: 'PSS-001229', customer: 'M. Torres' },
                  { date: '11 Mar 2026', ref: 'PSS-001228', customer: 'R. Singh' },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-[1fr_auto_auto] gap-4 items-center px-4 py-3 hover:bg-[#f9fafb] transition-colors ${i > 0 ? 'border-t border-[#e5e7eb]' : ''}`}>
                    <div>
                      <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium">{row.ref}</div>
                      <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">{row.date}</div>
                    </div>
                    <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.customer}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166634]">
                      Used
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageShell>
  );
}
