import { useState, useEffect, useRef } from 'react';
import { Plus, Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { TestModeBadge } from '../shared/TestModeBadge';
import { EntitlementCard } from './EntitlementCard';
import { EntitlementsEmptyState } from './EntitlementsEmptyState';
import { EntitlementDetailPage } from './EntitlementDetailPage';
import { EntitlementsSkeleton } from '../shared/Skeleton';
import { MOCK_ENTITLEMENTS } from './mockEntitlements';
import { useEnvironment } from '../../contexts/EnvironmentContext';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'usage', label: 'Usage %' },
  { value: 'remaining', label: 'Remaining' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];

function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = SORT_OPTIONS.find(o => o.value === value)!;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="cursor-pointer flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#e5e7eb] bg-white font-['Cabin',sans-serif] text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
      >
        <SlidersHorizontal size={13} />
        <span>Sort:</span>
        <span className="text-[#0a2333] font-medium">{current.label}</span>
        <ChevronDown size={12} className="text-[#9ca3af]" />
      </button>
      {open && (
        <div className="absolute left-0 top-10 z-20 w-40 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-1 overflow-hidden">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="cursor-pointer w-full flex items-center justify-between px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
            >
              {opt.label}
              {opt.value === value && <Check size={12} className="text-[#0a2333]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface EntitlementsPageProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

export function EntitlementsPage({ activeView, onNavigate }: EntitlementsPageProps) {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'remaining'>('name');
  const { environment } = useEnvironment();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <PageShell activeView={activeView} onNavigate={onNavigate}>
        <EntitlementsSkeleton />
      </PageShell>
    );
  }

  const selectedEntitlement = selectedId ? MOCK_ENTITLEMENTS.find(e => e.id === selectedId) : null;

  if (selectedEntitlement) {
    return (
      <EntitlementDetailPage
        entitlement={selectedEntitlement}
        activeView={activeView}
        onNavigate={onNavigate}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  let entitlements = MOCK_ENTITLEMENTS.filter(e => e.environment === environment);

  if (search.trim()) {
    const q = search.toLowerCase();
    entitlements = entitlements.filter(e =>
      e.productName.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    );
  }

  entitlements = [...entitlements].sort((a, b) => {
    if (sortBy === 'usage') return (b.used / (b.cap || 1)) - (a.used / (a.cap || 1));
    if (sortBy === 'remaining') return a.remaining - b.remaining;
    return a.productName.localeCompare(b.productName);
  });

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="px-8 pt-5 pb-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-0.5">
                <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Benefits</h1>
                <TestModeBadge />
              </div>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
                Manage your product entitlements and service allocations
              </p>
            </div>
            <button className="cursor-pointer inline-flex items-center gap-1.5 bg-[#0a2333] text-white rounded-xl px-4 py-2.5 font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors shrink-0">
              <Plus size={14} />
              Add Benefit
            </button>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-3 mt-4">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search benefits..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] placeholder-[#9ca3af] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
              />
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          {entitlements.length === 0 ? (
            <EntitlementsEmptyState onBrowseCategories={() => onNavigate('settings:categories')} />
          ) : (
            <div className="py-4 grid grid-cols-3 gap-4">
              {entitlements.map(entitlement => (
                <EntitlementCard
                  key={entitlement.id}
                  entitlement={entitlement}
                  onClick={setSelectedId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
