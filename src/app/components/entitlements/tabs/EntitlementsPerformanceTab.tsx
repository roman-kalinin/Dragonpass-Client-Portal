import { BarChart3 } from 'lucide-react';

export function EntitlementsPerformanceTab() {
  return (
    <div className="py-6">
      <div className="bg-[#f9fafb] border border-[#e5e7eb] border-dashed rounded-xl p-12 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 size={28} className="text-[#9ca3af] mx-auto mb-3" />
          <h3 className="font-['Cabin',sans-serif] font-semibold text-[16px] text-[#0a2333] mb-1">
            Performance Analytics
          </h3>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
            Entitlement performance metrics and trends will appear here as data flows in.
          </p>
        </div>
      </div>
    </div>
  );
}
