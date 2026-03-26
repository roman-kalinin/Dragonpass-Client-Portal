import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { Entitlement } from '../../types/portalTypes';

function formatGBP(amount: number) {
  return `£${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function SegmentedControl({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex bg-[#f1f5f9] rounded-lg p-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`cursor-pointer flex-1 px-3 py-1.5 rounded-md font-['Cabin',sans-serif] text-[13px] font-medium transition-colors ${
            value === opt.value
              ? 'bg-white text-[#0a2333] shadow-sm'
              : 'text-[#6a7282] hover:text-[#0a2333]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface TopUpModalProps {
  entitlement: Entitlement | null;
  onClose: () => void;
  onConfirm?: () => void;
}

export function TopUpModal({ entitlement, onClose, onConfirm }: TopUpModalProps) {
  const [topUpMethod, setTopUpMethod] = useState<'count' | 'amount'>('count');
  const [benefitType, setBenefitType] = useState<'entitlement' | 'discount'>(entitlement?.benefitType || 'entitlement');
  const [quantity, setQuantity] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(entitlement?.discountPercent || 0);
  const [startDate, setStartDate] = useState(entitlement?.startDate || '');
  const [endDate, setEndDate] = useState(entitlement?.endDate || '');

  if (!entitlement) return null;

  const unitCost = entitlement.unitCostGBP;
  const effectiveCount = topUpMethod === 'count' ? quantity : (unitCost > 0 ? Math.floor(quantity / unitCost) : 0);
  const costPerUnit = benefitType === 'discount' ? unitCost * (discountPercent / 100) : unitCost;
  const totalCost = topUpMethod === 'count' ? quantity * costPerUnit : (benefitType === 'discount' ? quantity * (discountPercent / 100) : quantity);

  return (
    <Dialog open={entitlement !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[560px] p-0 bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
            Top Up — {entitlement.productName}
          </DialogTitle>
          <DialogDescription className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
            Add more benefits to your existing allocation.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Top-up method */}
          <div>
            <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-2">
              Top up by
            </label>
            <SegmentedControl
              options={[
                { value: 'count', label: 'Count of benefits' },
                { value: 'amount', label: 'Amount (GBP)' },
              ]}
              value={topUpMethod}
              onChange={v => { setTopUpMethod(v as 'count' | 'amount'); setQuantity(0); }}
            />
          </div>

          {/* Quantity / Amount input */}
          <div>
            <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
              {topUpMethod === 'count' ? 'Number of benefits' : 'Amount (GBP)'}
            </label>
            <input
              type="number"
              min={0}
              value={quantity || ''}
              onChange={e => setQuantity(Number(e.target.value))}
              placeholder={topUpMethod === 'count' ? 'e.g. 500' : 'e.g. 10000'}
              className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] placeholder-[#9ca3af] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
            />
            {topUpMethod === 'amount' && effectiveCount > 0 && (
              <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-1">
                ≈ {effectiveCount.toLocaleString()} benefits at {formatGBP(unitCost)} each
              </div>
            )}
          </div>

          {/* Benefit type */}
          <div>
            <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-2">
              Benefit type
            </label>
            <SegmentedControl
              options={[
                { value: 'entitlement', label: 'Entitlement' },
                { value: 'discount', label: 'Discount %' },
              ]}
              value={benefitType}
              onChange={v => setBenefitType(v as 'entitlement' | 'discount')}
            />
          </div>

          {/* Discount % input (conditional) */}
          {benefitType === 'discount' && (
            <div>
              <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                Discount percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={discountPercent || ''}
                  onChange={e => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                  placeholder="e.g. 25"
                  className="w-full h-9 px-3 pr-8 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] placeholder-[#9ca3af] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">%</span>
              </div>
              <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-1">
                Client pays {formatGBP(costPerUnit)} per benefit ({discountPercent}% of {formatGBP(unitCost)})
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#6a7282]" />
                  Start date
                  <span className="text-[11px] text-[#9ca3af] font-normal">(optional)</span>
                </span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
              />
            </div>
            <div>
              <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#6a7282]" />
                  End date
                  <span className="text-[11px] text-[#9ca3af] font-normal">(optional)</span>
                </span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]"
              />
            </div>
          </div>

          {/* Cost summary */}
          <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4">
            <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">Cost Summary</div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
                  {topUpMethod === 'count' ? `${quantity.toLocaleString()} × ${formatGBP(costPerUnit)}` : `${formatGBP(quantity)} budget`}
                </span>
                <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
                  {benefitType === 'entitlement' ? 'Entitlement' : `${discountPercent}% Discount`}
                </span>
              </div>
              <div className="border-t border-[#e5e7eb] pt-1.5 flex items-center justify-between">
                <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-semibold">Total cost to you</span>
                <span className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                  {formatGBP(totalCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 h-10 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] font-medium text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onConfirm?.(); onClose(); }}
              disabled={quantity <= 0 || (benefitType === 'discount' && discountPercent <= 0)}
              className="cursor-pointer flex-1 h-10 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Top Up — {formatGBP(totalCost)}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
