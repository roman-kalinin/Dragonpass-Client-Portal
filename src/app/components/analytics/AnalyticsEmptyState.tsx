import { BarChart3, ExternalLink } from 'lucide-react';

export function AnalyticsEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-[400px]">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
          <BarChart3 size={28} className="text-[#6a7282]" />
        </div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-2">
          Analytics will populate as data flows in
        </h2>
        <p className="font-['Cabin',sans-serif] text-[14px] text-[#6a7282] mb-6">
          Make some test API calls to start seeing your metrics and trends here.
        </p>
        <button
          onClick={() => window.open('https://docs.dragonpass.com', '_blank')}
          className="inline-flex items-center gap-2 bg-[#0a2333] text-white rounded-lg px-4 py-2.5 font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
        >
          View API Documentation
          <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}
