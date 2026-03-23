import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronRight, Plane, Building2, Car, Sofa, Smartphone, Ticket, Zap, Heart, ChevronDown } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { TestModeBadge } from '../shared/TestModeBadge';
import { PageHeader } from '../shared/PageHeader';
import { Badge } from '../shared/Badge';
import { Button } from '../shared/Button';
import { SearchInput } from '../shared/SearchInput';
import { OrdersEmptyState } from './OrdersEmptyState';
import { orders } from './orderData';
import { OrderDetailPanel } from './OrderDetailPanel';
import { OrdersSkeleton } from '../shared/Skeleton';
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
  return <Badge variant={benefit === 'ENTITLEMENT' ? 'entitlement' : 'discount'}>{benefit}</Badge>;
}

function StatusBadge({ status }: { status: Order['status'] }) {
  return <Badge variant="confirmed">{status}</Badge>;
}

function fmt(amount: number | null) {
  if (amount === null) return <span className="text-[#9ca3af]">—</span>;
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const columns = [
  { key: 'orderRef', label: 'ORDER REF', width: 'w-[14%]' },
  { key: 'type', label: 'PRODUCT / TYPE', width: 'w-[16%]' },
  { key: 'serviceDate', label: 'SERVICE DATE', width: 'w-[13%]' },
  { key: 'benefit', label: 'BENEFIT', width: 'w-[13%]' },
  { key: 'total', label: 'TOTAL', width: 'w-[10%]' },
  { key: 'paid', label: 'PAID', width: 'w-[10%]' },
  { key: 'funded', label: 'FUNDED', width: 'w-[10%]' },
  { key: 'status', label: 'STATUS', width: 'flex-1' },
  { key: 'action', label: '', width: 'w-[48px]' },
];

export function OrderManagementPage({ activeView, onNavigate }: OrderManagementPageProps) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <PageShell activeView={activeView} onNavigate={onNavigate}>
        <OrdersSkeleton />
      </PageShell>
    );
  }

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
      <PageHeader title="Order Management" description="View and manage all customer orders across all product types">
        <TestModeBadge />
      </PageHeader>

      {/* Search + filter bar */}
      <div className="px-8 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search orders, booking refs, customers..."
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
            <Button variant="pill-active">
              Today
              <span className="bg-white/20 rounded-full px-1.5 text-[11px]">13</span>
            </Button>
            <Button variant="pill-inactive">
              Upcoming 7 days
              <span className="bg-[#e5e7eb] rounded-full px-1.5 text-[11px]">45</span>
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 mt-3">
            {['Status', 'Date Range', 'Product Type', 'Benefit Type'].map(filter => (
              <Button key={filter} variant="ghost" className="h-8 gap-1">
                {filter}
                <ChevronDown size={12} className="text-[#9ca3af]" />
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Table area */}
      <div className="flex-1 overflow-auto px-8 pb-6">
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
                      <div className="w-[14%] shrink-0">
                        <div className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">{order.orderRef}</div>
                        <div className="font-['Cabin',sans-serif] text-[11px] text-[#9ca3af]">{order.bookingRef}</div>
                      </div>
                      <div className="w-[16%] shrink-0 flex items-center gap-2">
                        <TypeIcon size={14} className="text-[#45556c] shrink-0" />
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{typeLabels[order.type]}</span>
                      </div>
                      <div className="w-[13%] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{order.serviceDate}</span>
                      </div>
                      <div className="w-[13%] shrink-0">
                        <BenefitBadge benefit={order.benefit} />
                      </div>
                      <div className="w-[10%] shrink-0">
                        <span className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">{fmt(order.total)}</span>
                      </div>
                      <div className="w-[10%] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{fmt(order.paid)}</span>
                      </div>
                      <div className="w-[10%] shrink-0">
                        <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{fmt(order.funded)}</span>
                      </div>
                      <div className="flex-1 shrink-0">
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="w-[48px] shrink-0 flex justify-end">
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
