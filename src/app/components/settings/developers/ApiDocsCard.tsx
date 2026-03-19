import { FileText, ExternalLink } from 'lucide-react';

export function ApiDocsCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
          <FileText size={18} className="text-[#0a2333]" />
        </div>
        <div>
          <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333]">
            API Documentation
          </h3>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">
            Complete reference for the Dragonpass API including endpoints, authentication, and code examples.
          </p>
        </div>
      </div>
      <button
        onClick={() => window.open('https://docs.dragonpass.com', '_blank')}
        className="inline-flex items-center gap-1.5 shrink-0 font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:text-[#152c3c] transition-colors"
      >
        View Documentation
        <ExternalLink size={13} />
      </button>
    </div>
  );
}
