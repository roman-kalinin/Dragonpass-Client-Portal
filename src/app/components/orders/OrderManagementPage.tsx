import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronRight, Plane, Building2, Car, Sofa, Smartphone, Ticket, Zap, Heart, ChevronDown } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { TestModeBadge } from '../shared/TestModeBadge';
import { OrdersEmptyState } from './OrdersEmptyState';
import { orders } from './orderData';
import { OrderDetailPanel } from './OrderDetailPanel';
import type { Order, OrderType } from './orderData';

interface OrderManagementPageProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

const typeIcons: Record<OrderType, React.ElementType> = {
  'flight': Plane,
  'hotel': Building2,
  'airport-transfer': Car,
  'airport-lounge': Sofa,
  'esim': Smartphone,
  'event-ticket': Ticket,
  'fast-track': Zap,
  'health-wellness': Heart,
};

const typeLabels: Record<OrderType, string> = {
  'flight': 'Flight',
  'hotel': 'Hotel',
  'airport-transfer': 'Airport Transfer',
  'airport-lounge': 'Airport Lounge',
  'esim': 'eSIM',
  'event-ticket': 'Event Ticket',
  'fast-track': 'Fast Track',
  'health-wellness': 'Health & Wellness',
};

function BenefitBadge({ benefit }: { benefit: Order['benefit'] }) {
  if (!benefit) return <span className="text-[#9ca3af] text-[12px] font-['Cabin',sans-serif]">—</span>;
  const styles = benefit === 'ENTITLEMENT'
    ? 'bg-[#d1fae5] text-[#0a2333]'
    : 'bg-[#ccfbf1] text-[#134e4a]';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] ${styles}`}>
      {benefit}
    </span>
  );
}

function StatusBadge({ status }: { status: Order['status'] }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166534]">
      {status}
    </span>
  );
}

function fmt(amount: number | null) {
  if (amount === null) return <span className="text-[#9ca3af]">—</span>;
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const columns = [
  { key: 'orderRef', label: 'ORDER REF', width: 'w-[160px]' },
  { key: 'type', label: 'PRODUCT / TYPE', width: 'w-[160px]' },
  { key: 'serviceDate', label: 'SERVICE DATE', width: 'w-[120px]' },
  { key: 'benefit', label: 'BENEFIT', width: 'w-[120px]' },
  { key: 'total', label: 'TOTAL', width: 'w-[100px]' },
  { key: 'paid', label: 'PAID', width: 'w-[100px]' },
  { key: 'funded', label: 'FUNDED', width: 'w-[100px]' },
  { key: 'status', label: 'STATUS', width: 'w-[110px]' },
  { key: 'action', label: '', width: 'w-[40px]' },
];

export function OrderManagementPage({ activeView, onNavigate }: OrderManagementPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = orders.filter(o => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.orderRef.toLowerCase().includes(q) ||
      o.bookingRef.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      typeLabels[o.type].toLowerCase().includes(q)
    );
  });

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      {/* Page header */}
      <div className="px-8 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Order Management</h1>
          <TestModeBadge />
        </div>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">
          View and manage all customer orders across all product types
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="px-8 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]" />
            <input
              type="text"
              placeholder="Search orders, booking refs, customers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                <X size={12} className="text-[#9ca3af]" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(v => !v)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#e5e7eb] text-[12px] font-['Cabin',sans-serif] text-[#45556c] hover:bg-[#f9fafb] transition-colors bg-white"
          >
            <SlidersHorizontal size={13} />
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>

          <button className="h-9 px-3 text-[12px] font-['Cabin',sans-serif] text-[#6a7282] hover:text-[#0a2333] transition-colors">
            Clear all
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#0a2333] text-white text-[12px] font-['Cabin',sans-serif] font-medium">
              Today
              <span className="bg-white/20 rounded-full px-1.5 text-[11px]">13</span>
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-[#e5e7eb] text-[#45556c] text-[12px] font-['Cabin',sans-serif] hover:bg-[#f9fafb] transition-colors">
              Upcoming 7 days
              <span className="bg-[#e5e7eb] rounded-full px-1.5 text-[11px]">45</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 mt-3">
            {['Status', 'Date Range', 'Product Type', 'Benefit Type'].map(filter => (
              <button
                key={filter}
                className="flex items-center gap-1 h-8 px-3 rounded-lg border border-[#e5e7eb] text-[12px] font-['Cabin',sans-serif] text-[#45556c] hover:bg-[#f9fafb] transition-colors bg-white"
              >
                {filter}
                <ChevronDown size={12} className="text-[#9ca3af]" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table area */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {orders.length === 0 ? (
          <OrdersEmptyState />
        ) : (
          <>
            <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
              <div className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <div className="flex items-center px-4 py-3">
                  {columns.map(col => (
                    <div key={col.key} className={`${col.width} shrink-0`}>
                      <span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">
                        {col.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="px-4 py-12 text-center font-['Cabin',sans-serif] text-[14px] text-[#9ca3af]">
                  No orders match your search.
                </div>
              ) : (
                filtered.map(order => {
                  const TypeIcon = typeIcons[order.type];
                  return (
                    <div
                      key={order.id}
                      className="flex items-center px-4 py-3.5 border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer group"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="w-[160px] shrink-0">
                        <div className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">{order.orderRef}</div>
                        <div className="font-['Cabin',sans-serif] text-[11px] text-[#9ca3af]">{order.bookingRef}</div>
                      </div>
                      <div className="w-[160px] shrink-0 flex items-center gap-2">
                        <TypeIcon size={14} className="text-[#45556c] shrink-0" />
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{typeLabels[order.type]}</span>
                      </div>
                      <div className="w-[120px] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{order.serviceDate}</span>
                      </div>
                      <div className="w-[120px] shrink-0">
                        <BenefitBadge benefit={order.benefit} />
                      </div>
                      <div className="w-[100px] shrink-0">
                        <span className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">{fmt(order.total)}</span>
                      </div>
                      <div className="w-[100px] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{fmt(order.paid)}</span>
                      </div>
                      <div className="w-[100px] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{fmt(order.funded)}</span>
                      </div>
                      <div className="w-[110px] shrink-0">
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="w-[40px] shrink-0 flex justify-end">
                        <ChevronRight size={16} className="text-[#9ca3af] group-hover:text-[#45556c] transition-colors" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-['Cabin',sans-serif] text-[12px] text-[#9ca3af]">
                {filtered.length} order{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </PageShell>
  );
}
