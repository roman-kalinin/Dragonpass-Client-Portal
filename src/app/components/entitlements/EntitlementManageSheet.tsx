import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { MOCK_ENTITLEMENTS } from './mockEntitlements';

interface EntitlementManageSheetProps {
  entitlementId: string | null;
  onClose: () => void;
}

export function EntitlementManageSheet({ entitlementId, onClose }: EntitlementManageSheetProps) {
  const entitlement = MOCK_ENTITLEMENTS.find(e => e.id === entitlementId);

  return (
    <Sheet open={entitlementId !== null} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[420px] sm:max-w-[420px] p-0 overflow-auto">
        {entitlement && (
          <>
            <SheetHeader className="p-5 border-b border-[#e5e7eb]">
              <SheetTitle className="font-['Cabin',sans-serif] text-[#0a2333]">
                Manage {entitlement.productName}
              </SheetTitle>
              <SheetDescription className="font-['Cabin',sans-serif]">
                Configure caps, alerts, and view usage for this entitlement.
              </SheetDescription>
            </SheetHeader>

            <div className="p-5 space-y-6">
              {/* Usage Summary */}
              <div>
                <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-3">
                  Usage Summary
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">Allocation</div>
                    <div className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                      {entitlement.allocation.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">Used</div>
                    <div className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                      {entitlement.used.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">Remaining</div>
                    <div className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                      {entitlement.remaining.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cap Configuration */}
              <div>
                <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-3">
                  Cap Configuration
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                      Usage cap
                    </label>
                    <input
                      type="number"
                      defaultValue={entitlement.cap || ''}
                      className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333]"
                    />
                  </div>
                  <div>
                    <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-2">
                      Alert thresholds
                    </label>
                    <div className="space-y-2">
                      {[50, 80, 90, 100].map(threshold => (
                        <label key={threshold} className="flex items-center gap-2 cursor-pointer">
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
                      className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] focus:outline-none focus:border-[#0a2333]"
                    />
                  </div>
                  <button className="w-full h-9 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors">
                    Save Configuration
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-3">
                  Recent Activity
                </h4>
                <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg overflow-hidden">
                  {[
                    { date: '17 Mar 2026', ref: 'PSS-001234', customer: 'J. Harrison', status: 'Used' },
                    { date: '16 Mar 2026', ref: 'PSS-001233', customer: 'S. Mitchell', status: 'Used' },
                    { date: '15 Mar 2026', ref: 'PSS-001232', customer: 'D. Chen', status: 'Used' },
                  ].map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2.5 ${i > 0 ? 'border-t border-[#e5e7eb]' : ''}`}>
                      <div>
                        <div className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333] font-medium">{row.ref}</div>
                        <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">{row.customer} · {row.date}</div>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166534]">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
