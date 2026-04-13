import { useState } from 'react';
import { ArrowLeft, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, AlertTriangle, Pause, Play, RotateCcw, TrendingUp, Trash2, ChevronRight, SlidersHorizontal, ChevronDown, Check, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Entitlement } from '../../types/portalTypes';
import { Badge } from '../shared/Badge';
import { IconBox } from '../shared/IconBox';
import { PageShell } from '../shared/PageShell';
import { SearchInput } from '../shared/SearchInput';
import { Button } from '../shared/Button';
import { OrderDetailPanel } from '../orders/OrderDetailPanel';
import type { Order } from '../orders/orderData';
import { SimpleBarChart, CHART_COLORS } from '../charts/ChartPrimitives';
import { useApp } from '../../store';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
};

function formatGBP(amount: number) {
  return `£${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

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

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${checked ? 'bg-[#0a2333]' : 'bg-[#d1d5db]'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
    </button>
  );
}

function DeleteConfirmModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl border border-[#e5e7eb] shadow-xl p-6 w-full max-w-sm">
        <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-2">Delete benefit</h3>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-5">
          Are you sure you want to remove <span className="font-medium text-[#0a2333]">{name}</span>? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="cursor-pointer h-9 px-4 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] font-medium text-[#45556c] hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer h-9 px-4 rounded-lg bg-[#dc2626] text-white font-['Cabin',sans-serif] text-[13px] font-medium hover:bg-[#b91c1c] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const ACTIVITY_ROWS = [
  { date: '17 Mar 2026', ref: 'PSS-001234', customer: 'J. Harrison', orderRef: 'ORD-2026-0047' },
  { date: '16 Mar 2026', ref: 'PSS-001233', customer: 'S. Mitchell', orderRef: 'ORD-2026-0046' },
  { date: '15 Mar 2026', ref: 'PSS-001232', customer: 'D. Chen', orderRef: 'ORD-2026-0045' },
  { date: '14 Mar 2026', ref: 'PSS-001231', customer: 'A. Patel', orderRef: 'ORD-2026-0044' },
  { date: '13 Mar 2026', ref: 'PSS-001230', customer: 'L. Kim', orderRef: 'ORD-2026-0043' },
  { date: '12 Mar 2026', ref: 'PSS-001229', customer: 'M. Torres', orderRef: 'ORD-2026-0042' },
  { date: '11 Mar 2026', ref: 'PSS-001228', customer: 'R. Singh', orderRef: 'ORD-2026-0041' },
];

function makeOrder(row: typeof ACTIVITY_ROWS[number], productName: string): Order {
  return {
    id: row.ref,
    orderRef: row.orderRef,
    bookingRef: row.ref,
    type: 'airport-lounge',
    serviceDate: row.date,
    benefit: 'ENTITLEMENT',
    total: 18,
    paid: 0,
    funded: 18,
    status: 'CONFIRMED',
    bookingId: row.orderRef,
    bookingDate: row.date,
    customerName: row.customer,
    customerEmail: `${row.customer.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
    customerPhone: '+44 7700 900000',
    basePrice: 15,
    taxesFees: 3,
    paymentMethod: 'Entitlement',
    serviceDescription: productName,
  };
}

interface EntitlementDetailPageProps {
  entitlement: Entitlement;
  activeView: string;
  onNavigate: (id: string) => void;
  onBack: () => void;
  onTopUp?: (id: string) => void;
}

export function EntitlementDetailPage({ entitlement, activeView, onNavigate, onBack, onTopUp }: EntitlementDetailPageProps) {
  const { dispatch } = useApp();
  const [status, setStatus] = useState(entitlement.status);
  const [capEnabled, setCapEnabled] = useState(entitlement.cap !== null);
  const [capValue, setCapValue] = useState(entitlement.cap || 0);
  const [alert80, setAlert80] = useState(entitlement.alertThresholds.thresholds.includes(80));
  const [alert90, setAlert90] = useState(entitlement.alertThresholds.thresholds.includes(90));
  const [activitySearch, setActivitySearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [activePeriod, setActivePeriod] = useState<'today' | 'last7' | 'range'>('today');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const Icon = iconMap[entitlement.productIcon] || Smartphone;
  const pct = capEnabled && capValue > 0 ? Math.min(100, (entitlement.used / capValue) * 100) : 0;
  const hasCap = capEnabled && capValue > 0;
  const showWarning = hasCap && pct >= 80;
  const warningLabel = pct >= 100 ? 'Cap reached' : pct >= 90 ? '90%+ used — approaching cap' : '80%+ used';

  const usedGBP = entitlement.used * entitlement.unitCostGBP;
  const remainingGBP = entitlement.remaining * entitlement.unitCostGBP;
  const allocationGBP = entitlement.allocation * entitlement.unitCostGBP;

  const filtered = activitySearch
    ? ACTIVITY_ROWS.filter(r => {
        const q = activitySearch.toLowerCase();
        return r.ref.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q) || r.orderRef.toLowerCase().includes(q);
      })
    : ACTIVITY_ROWS;

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

  function handleDelete() {
    setDeleteConfirmOpen(false);
    dispatch({ type: 'SET_TOAST', payload: { message: `${entitlement.productName} removed`, type: 'success' } });
    onBack();
  }

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-[1440px] mx-auto">

        {/* Fixed header */}
        <div className="px-8 pt-5 pb-4 border-b border-[#e5e7eb] shrink-0">
          <button
            onClick={onBack}
            className="cursor-pointer inline-flex items-center gap-1.5 font-['Cabin',sans-serif] text-[12px] text-[#6a7282] hover:text-[#0a2333] transition-colors mb-3"
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
              {hasCap && <UsageRing pct={pct} />}
            </div>

            {/* Action buttons — right side */}
            <div className="flex items-center gap-2 shrink-0">
              {status === 'active' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] font-medium text-[#45556c] hover:bg-[#f9fafb] transition-colors">
                  <Pause size={13} />
                  Pause
                </button>
              )}
              {status === 'paused' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[13px] font-medium text-white hover:bg-[#152c3c] transition-colors">
                  <Play size={13} />
                  Resume
                </button>
              )}
              {status === 'exhausted' && (
                <button onClick={handleStatusAction} className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] text-[13px] font-medium text-white hover:bg-[#152c3c] transition-colors">
                  <RotateCcw size={13} />
                  Restart
                </button>
              )}
              {onTopUp && (
                <button
                  onClick={() => onTopUp(entitlement.id)}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] font-medium text-[#45556c] hover:bg-[#f9fafb] transition-colors"
                >
                  <TrendingUp size={13} />
                  Top Up
                </button>
              )}
              <button
                onClick={() => setDeleteConfirmOpen(true)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] font-medium text-[#dc2626] hover:bg-[#fff1f1] hover:border-[#fecaca] transition-colors"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto">

          {/* KPI Cards */}
          <div className="px-8 py-5">
            <div className="grid grid-cols-4 gap-4">
              {/* Allocation */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#62748e]" />
                  <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Allocation</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] leading-tight">{entitlement.allocation.toLocaleString()}</span>
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{formatGBP(allocationGBP)}</p>
                <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
                  <path d="M0 20 C30 18, 50 12, 80 14 S130 6, 160 10 S180 4, 200 2" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Used */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#62748e]" />
                  <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Used</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] leading-tight">{entitlement.used.toLocaleString()}</span>
                  <span className="flex items-center gap-0.5 font-['Cabin',sans-serif] text-[12px] text-[#d4183d]">
                    <ArrowUpRight size={12} />
                    12%
                  </span>
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{formatGBP(usedGBP)}</p>
                <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
                  <path d="M0 22 C40 20, 60 16, 90 12 S140 8, 170 4 S190 2, 200 2" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Remaining */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <ArrowDownRight size={16} className="text-[#62748e]" />
                  <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Remaining</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] leading-tight">{entitlement.remaining.toLocaleString()}</span>
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{formatGBP(remainingGBP)}</p>
                <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
                  <path d="M0 2 C30 4, 50 8, 80 10 S130 16, 160 18 S180 20, 200 22" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Cap / Usage */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-[#62748e]" />
                  <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Usage</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] leading-tight">
                    {hasCap ? `${pct.toFixed(0)}%` : '∞'}
                  </span>
                  {hasCap && showWarning && (
                    <span className={`flex items-center gap-0.5 font-['Cabin',sans-serif] text-[12px] ${pct >= 90 ? 'text-[#d4183d]' : 'text-amber-600'}`}>
                      <AlertTriangle size={12} />
                      {pct >= 100 ? 'Cap reached' : 'Approaching'}
                    </span>
                  )}
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">
                  {hasCap ? `Cap: ${capValue.toLocaleString()}` : 'No cap set'}
                </p>
                <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
                  <path d="M0 20 C30 18, 50 14, 80 12 S130 8, 160 6 S180 4, 200 2" stroke="#CAD5E2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cap Configuration + Usage Chart side by side */}
          <div className="px-8 py-2">
            <div className="grid grid-cols-2 gap-6">
              {/* Cap Configuration */}
              <div>
                <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-3">Cap configuration</h3>
                <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium">Enable usage cap</div>
                        <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5">
                          {capEnabled ? 'Limit usage to a fixed number' : 'No usage cap — unlimited usage'}
                        </div>
                      </div>
                      <ToggleSwitch checked={capEnabled} onChange={(v) => {
                        setCapEnabled(v);
                        dispatch({ type: 'SET_TOAST', payload: { message: v ? 'Usage cap enabled' : 'Usage cap disabled', type: 'success' } });
                      }} />
                    </div>

                    {capEnabled && (
                      <div className="flex items-center gap-3">
                        <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium shrink-0">Usage cap</label>
                        <input
                          type="number"
                          value={capValue}
                          onChange={e => setCapValue(Number(e.target.value))}
                          className="flex-1 h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">Alert at 80%</div>
                        <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">Get notified before approaching your limit</div>
                      </div>
                      <ToggleSwitch checked={alert80} onChange={(v) => {
                        setAlert80(v);
                        dispatch({ type: 'SET_TOAST', payload: { message: v ? '80% alert enabled' : '80% alert disabled', type: 'success' } });
                      }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">Alert at 90%</div>
                        <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">Final warning before hitting your cap</div>
                      </div>
                      <ToggleSwitch checked={alert90} onChange={(v) => {
                        setAlert90(v);
                        dispatch({ type: 'SET_TOAST', payload: { message: v ? '90% alert enabled' : '90% alert disabled', type: 'success' } });
                      }} />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium shrink-0">Alert recipients</label>
                      <input
                        type="text"
                        defaultValue={entitlement.alertThresholds.recipients.join(', ')}
                        className="flex-1 h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
                      />
                      <button
                        onClick={() => dispatch({ type: 'SET_TOAST', payload: { message: 'Configuration saved', type: 'success' } })}
                        className="cursor-pointer h-9 px-4 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors shrink-0"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Usage Chart */}
              <div>
                <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-3">Daily usage</h3>
                <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 h-[calc(100%-36px)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">Last 14 days</span>
                    <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">Avg: 42/day</span>
                  </div>
                  <SimpleBarChart
                    data={[
                      { day: 'Mon', usage: 35 }, { day: 'Tue', usage: 48 },
                      { day: 'Wed', usage: 52 }, { day: 'Thu', usage: 38 },
                      { day: 'Fri', usage: 60 }, { day: 'Sat', usage: 45 },
                      { day: 'Sun', usage: 55 }, { day: 'Mon', usage: 42 },
                      { day: 'Tue', usage: 68 }, { day: 'Wed', usage: 50 },
                      { day: 'Thu', usage: 58 }, { day: 'Fri', usage: 72 },
                      { day: 'Sat', usage: 40 }, { day: 'Sun', usage: 46 },
                    ]}
                    xKey="day"
                    bars={[{ dataKey: 'usage', name: 'Usage', fill: CHART_COLORS.teal }]}
                    height={230}
                    barSize={16}
                    showLegend={false}
                  />
                </div>
              </div>  {/* close chart column */}
            </div>  {/* close grid */}
          </div>  {/* close px-8 py-2 */}

          {/* Recent Activity */}
          <div className="px-8 pt-5 pb-3">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-3">Recent activity</h3>
            <div className="flex items-center gap-3">
              <SearchInput
                value={activitySearch}
                onChange={setActivitySearch}
                placeholder="Search references, customers..."
                className="flex-1 max-w-[400px]"
              />
              <Button variant="ghost" onClick={() => setShowFilters(v => !v)}>
                <SlidersHorizontal size={13} />
                {showFilters ? 'Hide filters' : 'Show filters'}
              </Button>
              <Button variant="text" className="h-9 px-3 text-[12px]">
                Clear all
              </Button>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <Button variant={activePeriod === 'today' ? 'pill-active' : 'pill-inactive'} onClick={() => setActivePeriod('today')}>
                  Today
                  <span className={`rounded-full px-1.5 text-[11px] ${activePeriod === 'today' ? 'bg-white/20' : 'bg-[#e5e7eb]'}`}>3</span>
                </Button>
                <Button variant={activePeriod === 'last7' ? 'pill-active' : 'pill-inactive'} onClick={() => setActivePeriod('last7')}>
                  Last 7 days
                  <span className={`rounded-full px-1.5 text-[11px] ${activePeriod === 'last7' ? 'bg-white/20' : 'bg-[#e5e7eb]'}`}>7</span>
                </Button>
                {activePeriod === 'range' ? (
                  <div className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#0a2333] bg-[#0a2333] font-['Cabin',sans-serif] text-[12px] font-medium text-white">
                    <input
                      type="date"
                      value={filterFrom}
                      onChange={e => setFilterFrom(e.target.value)}
                      className="bg-transparent text-white text-[12px] font-['Cabin',sans-serif] outline-none w-[90px] [color-scheme:dark]"
                    />
                    <span className="text-white/60">–</span>
                    <input
                      type="date"
                      value={filterTo}
                      onChange={e => setFilterTo(e.target.value)}
                      className="bg-transparent text-white text-[12px] font-['Cabin',sans-serif] outline-none w-[90px] [color-scheme:dark]"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => { setActivePeriod('range'); setFilterFrom(''); setFilterTo(''); }}
                    className="cursor-pointer h-8 px-3 rounded-full border border-[#e5e7eb] font-['Cabin',sans-serif] text-[12px] font-medium text-[#45556c] hover:bg-[#f9fafb] transition-colors"
                  >
                    Select range
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="flex items-center gap-2 mt-3">
                <Button variant="ghost" className="h-8 gap-1">
                  Status
                  <ChevronDown size={12} className="text-[#9ca3af]" />
                </Button>
                <Button variant="ghost" className="h-8 gap-1">
                  Customer
                  <ChevronDown size={12} className="text-[#9ca3af]" />
                </Button>
              </div>
            )}
          </div>

          <div className="px-8 pb-6">
            <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
              <div className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <div className="flex items-center px-4 py-3">
                  <div className="w-[20%] shrink-0"><span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">Reference</span></div>
                  <div className="w-[20%] shrink-0"><span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">Date</span></div>
                  <div className="w-[25%] shrink-0"><span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">Customer</span></div>
                  <div className="w-[15%] shrink-0"><span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">Order</span></div>
                  <div className="flex-1"><span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">Status</span></div>
                  <div className="w-[48px] shrink-0" />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="px-4 py-12 text-center font-['Cabin',sans-serif] text-[14px] text-[#9ca3af]">
                  No activity matches your search.
                </div>
              ) : (
                filtered.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center px-4 py-3.5 border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer group"
                    onClick={() => setSelectedOrder(makeOrder(row, entitlement.productName))}
                  >
                    <div className="w-[20%] shrink-0">
                      <div className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">{row.ref}</div>
                    </div>
                    <div className="w-[20%] shrink-0">
                      <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.date}</span>
                    </div>
                    <div className="w-[25%] shrink-0">
                      <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.customer}</span>
                    </div>
                    <div className="w-[15%] shrink-0">
                      <span className="font-['Cabin',sans-serif] text-[13px] text-[#586e7d]">{row.orderRef}</span>
                    </div>
                    <div className="flex-1">
                      <Badge variant="confirmed">Used</Badge>
                    </div>
                    <div className="w-[48px] shrink-0 flex justify-end">
                      <ChevronRight size={16} className="text-[#9ca3af] group-hover:text-[#45556c] transition-colors" />
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3">
              <span className="font-['Cabin',sans-serif] text-[12px] text-[#9ca3af]">
                {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

        </div>
      </div>

      {deleteConfirmOpen && (
        <DeleteConfirmModal
          name={entitlement.productName}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirmOpen(false)}
        />
      )}

      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </PageShell>
  );
}
