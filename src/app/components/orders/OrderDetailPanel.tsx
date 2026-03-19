import { X, Plane, Building2, Car, Sofa, Smartphone, Ticket, Zap, Heart, Info, Calendar, User, CreditCard, MapPin } from 'lucide-react';
import type { Order, OrderType } from './orderData';

interface OrderDetailPanelProps {
  order: Order;
  onClose: () => void;
}

const typeLabels: Record<OrderType, string> = {
  'flight': 'Flight Order',
  'hotel': 'Hotel Booking',
  'airport-transfer': 'Airport Transfer',
  'airport-lounge': 'Airport Lounge',
  'esim': 'eSIM',
  'event-ticket': 'Event Ticket',
  'fast-track': 'Fast Track',
  'health-wellness': 'Health & Wellness',
};

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

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={14} className="text-[#45556c]" />
      <span className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#45556c] uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-1.5">
      <span className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] min-w-[120px]">{label}</span>
      <span className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333] text-right font-medium">{value}</span>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-t border-[#e5e7eb]">
      {children}
    </div>
  );
}

export function OrderDetailPanel({ order, onClose }: OrderDetailPanelProps) {
  const TypeIcon = typeIcons[order.type];
  const typeLabel = typeLabels[order.type];

  const fmt = (amount: number | null) =>
    amount === null ? '—' : `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="w-[380px] bg-white h-full flex flex-col shadow-2xl border-l border-[#e5e7eb]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e5e7eb] shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TypeIcon size={16} className="text-[#0a2333]" />
              <span className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333]">
                {typeLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166534]">
                {order.status}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
              >
                <X size={15} className="text-[#45556c]" />
              </button>
            </div>
          </div>

          {/* Sub-header */}
          {order.serviceDescription && (
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#45556c] mb-3">
              {order.serviceDescription}
            </p>
          )}

          {/* Price summary */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Total Price</div>
              <div className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">{fmt(order.total)}</div>
            </div>
            <div className="text-right">
              <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider">Customer Purchase</div>
              <div className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">{fmt(order.paid)}</div>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* General */}
          <Section>
            <SectionHeader icon={Info} title="General" />
            <DetailRow label="Order ID" value={order.orderRef} />
            <DetailRow label="Type" value={typeLabel} />
            <DetailRow label="Status" value={
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166534]">
                {order.status}
              </span>
            } />
            <DetailRow label="Service Date" value={order.serviceDate} />
            <DetailRow label="Total Price" value={fmt(order.total)} />
            {order.paid !== null && order.paid > 0 && (
              <DetailRow label="Customer Purchase" value={fmt(order.paid)} />
            )}
          </Section>

          {/* Booking Information */}
          <Section>
            <SectionHeader icon={Calendar} title="Booking Information" />
            <DetailRow label="Booking ID" value={order.bookingId} />
            <DetailRow label="Booking Ref" value={order.bookingRef} />
            <DetailRow label="Booking Date" value={order.bookingDate} />
            {order.hotelBookingRef && (
              <DetailRow label="Hotel Booking Ref" value={order.hotelBookingRef} />
            )}
            {order.chainName && (
              <DetailRow label="Chain Name" value={order.chainName} />
            )}
            {order.propertyType && (
              <DetailRow label="Property Type" value={order.propertyType} />
            )}
            {order.trafficType && (
              <DetailRow label="Traffic Type" value={order.trafficType} />
            )}
            {order.telecomProvider && (
              <DetailRow label="Telecom Provider" value={order.telecomProvider} />
            )}
          </Section>

          {/* Itinerary — Flights */}
          {order.type === 'flight' && (order.outboundSegment || order.inboundSegment) && (
            <Section>
              <SectionHeader icon={MapPin} title="Itinerary" />
              {order.outboundSegment && (
                <div className="mb-4">
                  <div className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#0a2333] uppercase mb-2">Outbound</div>
                  <div className="bg-[#f9fafb] rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-['Cabin',sans-serif] font-bold text-[13px] text-[#0a2333]">
                        {order.outboundSegment.fromCode} → {order.outboundSegment.toCode}
                      </span>
                      <span className="font-['Cabin',sans-serif] text-[11px] text-[#45556c]">{order.outboundSegment.duration}</span>
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#45556c]">
                      {order.outboundSegment.airline} · {order.outboundSegment.flightNumber}
                    </div>
                    <div className="flex justify-between font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">
                      <span>{order.outboundSegment.departure}</span>
                      <span>{order.outboundSegment.arrival}</span>
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
                      Class: {order.outboundSegment.class}
                    </div>
                  </div>
                </div>
              )}
              {order.inboundSegment && (
                <div>
                  <div className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#0a2333] uppercase mb-2">Inbound</div>
                  <div className="bg-[#f9fafb] rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-['Cabin',sans-serif] font-bold text-[13px] text-[#0a2333]">
                        {order.inboundSegment.fromCode} → {order.inboundSegment.toCode}
                      </span>
                      <span className="font-['Cabin',sans-serif] text-[11px] text-[#45556c]">{order.inboundSegment.duration}</span>
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#45556c]">
                      {order.inboundSegment.airline} · {order.inboundSegment.flightNumber}
                    </div>
                    <div className="flex justify-between font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">
                      <span>{order.inboundSegment.departure}</span>
                      <span>{order.inboundSegment.arrival}</span>
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
                      Class: {order.inboundSegment.class}
                    </div>
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Customer Information */}
          <Section>
            <SectionHeader icon={User} title="Customer Information" />
            <DetailRow label="Name" value={order.customerName} />
            <DetailRow label="Email" value={order.customerEmail} />
            <DetailRow label="Phone" value={order.customerPhone} />
          </Section>

          {/* Payment Information */}
          <Section>
            <SectionHeader icon={CreditCard} title={order.type === 'flight' || order.type === 'esim' ? 'Payment Breakdown' : 'Payment Information'} />
            <DetailRow label="Base Price" value={fmt(order.basePrice)} />
            <DetailRow label="Taxes & Fees" value={fmt(order.taxesFees)} />
            <DetailRow label="Payment Method" value={order.paymentMethod} />
          </Section>

        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#e5e7eb] bg-[#f9fafb] px-5 py-3 flex items-center justify-between">
          <div>
            <div className="font-['Cabin',sans-serif] text-[10px] text-[#6a7282] uppercase tracking-wider">Benefit Funded</div>
            <div className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">{fmt(order.funded)}</div>
          </div>
          <div className="text-right">
            <div className="font-['Cabin',sans-serif] text-[10px] text-[#6a7282] uppercase tracking-wider">Customer Pays</div>
            <div className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">{fmt(order.paid)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
