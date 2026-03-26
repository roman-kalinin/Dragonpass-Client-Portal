import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { MOCK_ENTITLEMENTS } from './mockEntitlements';

function formatGBP(amount: number) {
  return `£${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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

interface EntitlementManageSheetProps {
  entitlementId: string | null;
  onClose: () => void;
  onTopUp?: (id: string) => void;
}

export function EntitlementManageSheet({ entitlementId, onClose, onTopUp }: EntitlementManageSheetProps) {
  const entitlement = MOCK_ENTITLEMENTS.find(e => e.id === entitlementId);
  const [capEnabled, setCapEnabled] = useState(entitlement?.cap !== null && entitlement?.cap !== undefined);
  const [alert80, setAlert80] = useState(entitlement?.alertThresholds.thresholds.includes(80) ?? false);
  const [alert90, setAlert90] = useState(entitlement?.alertThresholds.thresholds.includes(90) ?? false);

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
              {/* Top Up button */}
              {onTopUp && (
                <button
                  onClick={() => onTopUp(entitlement.id)}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
                >
                  <TrendingUp size={14} />
                  Top Up Benefit
                </button>
              )}

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
                    <div className="font-['Cabin',sans-serif] text-[12px] text-[#586e7d]">
                      {formatGBP(entitlement.allocation * entitlement.unitCostGBP)}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">Used</div>
                    <div className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                      {entitlement.used.toLocaleString()}
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[12px] text-[#586e7d]">
                      {formatGBP(entitlement.used * entitlement.unitCostGBP)}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <div className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">Remaining</div>
                    <div className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
                      {entitlement.remaining.toLocaleString()}
                    </div>
                    <div className="font-['Cabin',sans-serif] text-[12px] text-[#586e7d]">
                      {formatGBP(entitlement.remaining * entitlement.unitCostGBP)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cap Configuration */}
              <div>
                <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-3">
                  Cap Configuration
                </h4>
                <div className="space-y-4">
                  {/* Cap toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium">Enable usage cap</div>
                      <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5">
                        {capEnabled ? 'Limit usage to a fixed number' : 'No usage cap — unlimited usage'}
                      </div>
                    </div>
                    <ToggleSwitch checked={capEnabled} onChange={setCapEnabled} />
                  </div>

                  {capEnabled && (
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
                  )}

                  {/* Alert thresholds */}
                  <div>
                    <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-3">
                      Usage alerts
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">Alert at 80%</div>
                          <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">Get notified before approaching your limit</div>
                        </div>
                        <ToggleSwitch checked={alert80} onChange={setAlert80} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">Alert at 90%</div>
                          <div className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">Final warning before hitting your cap</div>
                        </div>
                        <ToggleSwitch checked={alert90} onChange={setAlert90} />
                      </div>
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
